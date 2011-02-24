var sync = function(config) {
    var channel = j_channelFactory.build(config);

    function syncProfiles(persons, profiles) {
        logger.log('Starting contact sync. Channel = {0}'.format(config.id));

        // Build an hashtable of all found profile service_id's
        var service_ids = profiles.popArray('service_id');

        channel.friends(function(unmatched_profiles) {

            LocalDatabase.beginTransaction();

            // Save all found friends
            $.each(unmatched_profiles, function(i, profile) {
                if ($.inArray(profile.service_id, service_ids) == -1) {
                    // Find match for this profile
                    j_contactMatcher(persons, profiles, profile).match();
                }
            });

            LocalDatabase.endTransaction();

            logger.log('SyncProfiles finished. Channel = {0}, Profiles = {1}'
                .format(config.id, unmatched_profiles.length));
        });
    }

    function syncMessages(persons, profiles) {
        logger.log('Starting messages sync. Channel = {0}'.format(config.id));

        LocalDatabase.executeSql('select id, service_id from messages', function(messages) {
            var service_ids = messages.popArray('service_id');

            channel.messages(function(unmatched_messages) {
                LocalDatabase.beginTransaction();

                // Save all found messages
                $.each(unmatched_messages, function(i, message) {
                    if ($.inArray(String(message.service_id), service_ids) == -1) {
                        j_profile_matcher(persons, profiles, message).match();
                    }
                });

                LocalDatabase.endTransaction();

                logger.log('SyncMessages finished. Channel = {0}, Profiles = {1}'
                    .format(config.id, unmatched_messages.length));
            });
        });
    }

    return {
        run: function() {
            LocalDatabase.executeSql('select * from persons', function(persons) {
                LocalDatabase.executeSql('select * from profiles', function(profiles) {
                    syncProfiles(persons, profiles);
                    syncMessages(persons, profiles);

                    LocalDatabase.executeSql('update channels set lastsync_at = ? where id = ?',
                        [ new Date().to_unixtime(), config.id ]);
                });
            });
        }
    }
};