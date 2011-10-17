var j_profile_matcher = function(persons, profiles, message) {

    function find_profile_by_address(address) {
        for (var i = 0; i < profiles.length; i++) {
            if (profiles[i].address == address)
                return profiles[i];
        }

        return null;
    }

    return {
        match: function() {
            var that = this;
            var profile = this.process(message.from);

            message.profile_id = profile.id;
            message.person_id = profile.person_id;

            this.save_message(function() {
                that.save_relation(message, profile, 0);

                for (var i = 0; i < message.to.length; i++) {
                    profile = that.process(message.to[i]);
                    that.save_relation(message, profile, 10);
                }

                for (var i = 0; i < message.cc.length; i++) {
                    profile = that.process(message.cc[i]);
                    that.save_relation(message, profile, 20);
                }

                for (var i = 0; i < message.bcc.length; i++) {
                    profile = that.process(message.bcc[i]);
                    that.save_relation(message, profile, 30);
                }
            });
        },
        process: function(address) {

            var profile = find_profile_by_address(address.address);

            if (profile != null)
                return profile;

            logger.log('Profile for address {0} was not found'.format(address));

            var name = j_name_parser(address.displayname);

            var contact = {
                service_id: null,
                displayname: address.displayname,
                first_name: name.first_name(),
                last_name: name.last_name(),
                address: address.address,
                source: message.source,
                channel_id: message.channel_id,
                avatar: null,
                url: null,
                is_soft: true
            };

            var matcher = j_contactMatcher(persons, profiles, contact);
            matcher.match();

            return matcher.profile();
        },
        save_message: function(callback) {
            LocalDatabase.executeSql('insert into messages (' +
                'channel_id, service_id, source, person_id, profile_id, subject, preview, ' +
                '[from], [to], cc, bcc, is_unread, folder, attachments, sort_date, created_at) ' +
                'values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [ String(message.channel_id), String(message.service_id), message.source, message.person_id,
                    message.profile_id, message.subject, message.preview, message.from.toString(),
                    j_sourceAddressListString(message.to), j_sourceAddressListString(message.cc),
                    j_sourceAddressListString(message.bcc), message.is_unread, message.folder,
                    message.attachments, message.sort_date, new Date().to_unixtime()
                  ], function(rs) {

                    LocalDatabase.executeSql('select last_insert_rowid();', function(rs) {
                        message.id = rs[0];

                        callback();
                    });
            });
        },
        save_relation: function(message, profile, rel) {
            LocalDatabase.executeSql('insert into person_messages (' +
                'channel_id, person_id, message_id, relation, sort_date, created_at) ' +
                'values (?, ?, ?, ?, ?, ?)',
                [ message.channel_id, profile.person_id, message.id, rel, message.sort_date,
                    new Date().to_unixtime() ]);
        }
    }
};