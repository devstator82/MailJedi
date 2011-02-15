var sync = function(channel_id, channel_instance) {
    var id = channel_id;
    var channel = channel_instance;

    return {
        run: function() {
            channel.friends(function(friends) {
                // Retrieve all profiles for this channel
                LocalDatabase.executeSql('select * from profiles where channel_id = ?', [ id ], function(profiles) {

                    logger.log('Receive finished. Channel = {0}, Profiles = {1}'.format(id, friends.length));

                    // Remove all elements from the friends array that are
                    // already available in the local database. 
                    $.grep(friends, function(friend) {
                        for (var i =0; i < profiles.length; i++) {
                            if (profiles[i].service_id == friend.service_id)
                                return true;
                        }

                        // friends will concatenate to all elements that are not found
                        return false;
                    }, true);

                    LocalDatabase.beginTransaction();

                    try {
                        // Save all found friends
                        $.each(friends, function(i, friend) {                            
                            LocalDatabase.executeSql('insert into profiles (' +
                                    'service_id, source, channel_id, displayname, ' +
                                    'first_name, last_name, avatar, url, created_at) ' +
                                    'values (?, ?, ?, ?, ?, ?, ?, ?, ?)',
                                    [ friend.service_id, channel_instance.source(), id, friend.displayname,
                                        friend.first_name, friend.last_name, friend.avatar, friend.url,
                                            new Date().to_unixtime() ]);
                        });
                    }
                    finally {
                        LocalDatabase.endTransaction();
                    }

                    logger.log('Sync finished. Channel = {0}, Profiles = {1}'.format(id, friends.length));

                    LocalDatabase.executeSql('update channels set lastsync_at = ? where id = ?',
                        [ new Date().to_unixtime(), id ])
                });
            });
        }
    }
};