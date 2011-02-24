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

            $.each(message.to, function(i, address) {
                that.process(address, 1);
            });

            $.each(message.cc, function(i, address) {
                that.process(address, 2);
            });

            $.each(message.bcc, function(i, address) {
                that.process(address, 3);
            });

            var profile = this.process(message.from, 0);

            message.profile_id = profile.id;
            message.person_id = profile.person_id;

            this.save_message();
        },
        process: function(address, relation) {

            var profile = find_profile_by_address(address.address);

            if (profile != null)
                return profile;

            logger.log('Profile for address {0} was not found'.format(address));

            var name = j_name_parser(address.displayname);

            var contact = {
                service_id: '',
                displayname: address.displayname,
                first_name: name.first_name(),
                last_name: name.last_name(),
                address: address.address,
                source: message.source,
                channel_id: message.channel_id,
                avatar: '',
                url: '',
                is_soft: true
            };

            var matcher = j_contactMatcher(persons, profiles, contact);
            matcher.match();

            return matcher.profile();
        },
        save_message: function() {
            LocalDatabase.executeSql('insert into messages (' +
                'channel_id, service_id, source, person_id, profile_id, subject, preview, ' +
                '[from], [to], cc, bcc, is_unread, folder, attachments, sort_date, created_at) ' +
                'values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?); ' +
                    'select last_insert_rowid();',
                [ String(message.channel_id), String(message.service_id), message.source, message.person_id,
                    message.profile_id, message.subject, message.preview, message.from.toString(),
                    j_sourceAddressListString(message.to), j_sourceAddressListString(message.cc),
                    j_sourceAddressListString(message.bcc), message.is_unread, message.folder,
                    message.attachments, String(message.sort_date), new Date().to_unixtime()
                  ], function(rs) {

                    LocalDatabase.executeSql('select last_insert_rowid();', function(rs) {
                        message.id = rs[0];
                    });
            });
        }
    }
};