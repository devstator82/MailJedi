var sync = function(config) {
    var channel = channelFactory.build(config.source, config.auth_token);

    return {
        run: function() {
            channel.friends(config.service_id, function(friends) {
                // Retrieve all profiles for this channel
                LocalDatabase.executeSql('select * from profiles where channel_id = ?', [ config.id ], function(profiles) {

                    // Build an hashtable of all found profiles
                    var service_ids = [];
                    for (var i =0; i < profiles.length; i++) {
                        service_ids.push(profiles[i].service_id);
                    }
                    
                    LocalDatabase.beginTransaction();

                    try {
                        // Save all found friends
                        $.each(friends, function(i, friend) {
                            logger.log(friend.service_id);
                            if ($.inArray(friend.service_id, service_ids) == -1) {
                                LocalDatabase.executeSql('insert into profiles (' +
                                        'service_id, source, channel_id, displayname, ' +
                                        'first_name, last_name, avatar, url, created_at) ' +
                                        'values (?, ?, ?, ?, ?, ?, ?, ?, ?)',
                                        [ friend.service_id.toString(), channel.source(), config.id, friend.displayname,
                                            friend.first_name, friend.last_name, friend.avatar, friend.url,
                                                new Date().to_unixtime() ]);
                            }
                        });
                    }
                    finally {
                        LocalDatabase.endTransaction();
                    }

                    logger.log('Sync finished. Channel = {0}, Profiles = {1}'.format(config.id, friends.length));

                    LocalDatabase.executeSql('update channels set lastsync_at = ? where id = ?',
                        [ new Date().to_unixtime(), config.id ])
                });
            });
        }
    }
};