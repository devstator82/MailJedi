var j_contactMatcher = function(persons, profiles, friend){

    var person = null;
    var profile = null;

    function find_person_by_name(name) {
        var target_name = name.toLowerCase();

        for (var i = 0; i < persons.length; i++) {
            var source_name = persons[i].displayname.toLowerCase();

            if (source_name == target_name ||
                source_name.replace(' ', '').indexOf(target_name) > -1) {

                return persons[i];
            }
        }

        return null;
    }

    function find_person_by_id(id) {
        for (var i = 0; i < persons.length; i++) {
            if (persons[i].id == id)
                return persons[i];
        }

        return null;
    }

    function find_profile_by_service_id(id) {
        for (var i = 0; i < profiles.length; i++) {
            if (profiles[i].service_id == id)
                return profiles[i];
        }

        return null;
    }

    function find_profile_by_address(address) {
        for (var i = 0; i < profiles.length; i++) {
            if (profiles[i].address == address)
                return profiles[i];
        }

        return null;
    }

    function delete_profile_by_id(id) {
        for (var i = 0; i < profiles.length; i++) {
            if (profiles[i].id == id) {
                profiles.splice(i, 1);
            }
        }

        return null;
    }

    return {
        person: function() {
            return person;
        },
        profile: function() {
            return profile;
        },
        match: function() {
            person = find_person_by_name(friend.displayname);

            if (person != null && person.redirect_id != null) {
                person = find_person_by_id(person.redirect_id);
            }

            if (person != null) {

                // Match found, check if profile needs updating
                profile = find_profile_by_service_id(friend.service_id);

                if (profile == null) {
                    var matchOnAddress = find_profile_by_address(friend.address.toLowerCase());

                    if (matchOnAddress != null) {
                        logger.log('Found soft profile {0} for for person {1} with address {2}, removing and recreating'
                            .format(matchOnAddress.id, person.displayname, friend.address));

                        // We have a soft profile on the same address that we are now receiving a hard profile for,
                        // remove the soft profile so that the matcher will create a new hard profile.
                        delete_profile_by_id(friend.id);

                        LocalDatabase.executeSql('delete from profiles where id = ?', [ matchOnAddress.id ]);
                    }

                    logger.log('Found new profile {0} for person {1}'.format(friend.service_id, person.displayname));

                    // Append new profile to person
                    this.save_profile();
                    this.update_person();

                    return this.result.matchedOnPerson;
                }
                else {

                    // Make sure profile and person are not soft
                    this.update_person();
                    this.update_profile();

                    return this.result.matchedOnServiceId;
                }
            }
            else {
                // Match not found, try to match to profile address                
                profile = find_profile_by_address(friend.address.toLowerCase());

                if (profile != null) {
                    this.update_profile();

                    person = find_person_by_id(profile.person_id);

                    this.update_person();

                    return this.result.matchedOnProfile;
                }

                this.save_friend();
                return this.result.noMatch;
            }
        },
        save_friend: function() {
            person = j_person();
            person.displayname = friend.displayname;
            person.first_name = $.trim(friend.first_name);
            person.last_name = $.trim(friend.last_name);
            person.avatar = friend.avatar;
            person.is_soft = friend.is_soft;
            person.created_at = new Date().to_unixtime();

            LocalDatabase.executeSql('insert into persons (' +
                'displayname, first_name, last_name, avatar, is_soft, created_at) ' +
                'values (?, ?, ?, ?, ?, ?); ' +
                    'select last_insert_rowid();',
                [ person.displayname, person.first_name, person.last_name,
                    person.avatar, person.is_soft, person.created_at], function(rs) {

                    person.id = rs[0];
            });

            // Add profile to our profiles array
            persons.push(person);

            this.save_profile();
        },
        save_profile: function() {            
            profile = j_profile();
            profile.service_id = friend.service_id;
            profile.person_id = person.id;
            profile.source = friend.source;
            profile.channel_id = friend.channel_id;
            profile.displayname = $.trim(friend.displayname);
            profile.first_name = $.trim(friend.first_name);
            profile.last_name = $.trim(friend.last_name);
            profile.address = $.trim(friend.address).toLowerCase();
            profile.avatar = friend.avatar;
            profile.url = friend.url;
            profile.is_soft = friend.is_soft;
            profile.created_at = new Date().to_unixtime();

            LocalDatabase.executeSql('insert into profiles (' +
                'service_id, person_id, source, channel_id, displayname, first_name, ' +
                'last_name, address, avatar, url, is_soft, created_at) ' +
                'values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?); ' +
                    'select last_insert_rowid();',
                [ String(profile.service_id), profile.person_id, profile.source, profile.channel_id,
                    profile.displayname, profile.first_name, profile.last_name, profile.address, profile.avatar,
                    profile.url, profile.is_soft, profile.created_at ], function(rs) {

                    profile.id = rs[0];
            });

            // Add profile to our profiles array
            profiles.push(profile);
        },
        update_person: function() {
            if (!friend.is_soft) {
                if (person.is_soft) {
                    person.is_soft = false;

                    LocalDatabase.executeSql('update persons set is_soft = ? where id = ?', [ false, person.id ]);
                }
            }
        },
        update_profile: function() {            
            if (!friend.is_soft) {
                if (profile.is_soft) {
                    profile.is_soft = false;

                    LocalDatabase.executeSql('update profiles set is_soft = ? where id = ?', [ false, profile.id ]);
                }
            }
        },
        result: {
            noMatch: 'no match',
		    matchedOnPerson: 'matched on person',
		    matchedOnProfile: 'matched on profile',
		    matchedOnServiceId: 'matched on service_id'
        }
    };
};