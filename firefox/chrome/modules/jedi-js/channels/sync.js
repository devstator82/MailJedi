var sync = function(config) {
    var channel = j_channelFactory.build(config.source, config.auth_token);

    function syncProfiles() {
        logger.log('Starting contact sync. Channels = {0}'.format(config.id));

        channel.friends(config.service_id, function(friends) {
            // Retrieve all profiles for this channel
            LocalDatabase.executeSql('select * from profiles where channel_id = ?', [ config.id ], function(profiles) {

                // Build an hashtable of all found profiles
                var service_ids = [];
                for (var i =0; i < profiles.length; i++) {
                    service_ids.push(String(profiles[i].service_id));
                }

                LocalDatabase.beginTransaction();

                try {
                    // Save all found friends
                    $.each(friends, function(i, friend) {
                        if ($.inArray(String(friend.service_id), service_ids) == -1) {
                            LocalDatabase.executeSql('insert into profiles (' +
                                    'service_id, source, channel_id, displayname, first_name, ' +
                                    'last_name, address, avatar, url, is_soft, created_at) ' +
                                    'values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                                    [ String(friend.service_id), channel.source(), config.id, friend.displayname,
                                        friend.first_name, friend.last_name, friend.address.toLowerCase(), friend.avatar, friend.url,
                                            friend.is_soft, new Date().to_unixtime() ]);
                        }
                    });
                }
                finally {
                    LocalDatabase.endTransaction();
                }

                logger.log('SyncProfiles finished. Channel = {0}, Profiles = {1}'.format(config.id, friends.length));

                LocalDatabase.executeSql('update channels set lastsync_at = ? where id = ?',
                    [ new Date().to_unixtime(), config.id ])
            });
        });
    }

    function syncPersons() {
        LocalDatabase.executeSql('select * from profiles where channel_id = null', function(profiles) {
            if (profiles.length > 0) {
                LocalDatabase.executeSql('select * from persons', function(persons) {

                    LocalDatabase.beginTransaction();

                    try {
                        $.each(profiles, function(i, profile) {
                            // Find match for this profile
                        });
                    }
                    finally {
                        LocalDatabase.endTransaction();
                    }

                    logger.log('SyncPersons finished. Channel = {0}, Profiles = {1}'.format(config.id, profiles.length));
                });
            }
        });
    }

    return {
        run: function() {
            syncProfiles();
            syncPersons();
        }
    }
};