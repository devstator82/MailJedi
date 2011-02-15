var j_channel = function() {
    return {
        id: null,
        service_id: null,
        source: null,
        username: null,
        auth_token: null,
        lastsync_at: null,
        created_at: null
    }
};

function j_channels(callback) {
    LocalDatabase.executeSql('SELECT * FROM channels', function(rs) {
        var channels = [];

        $.each(rs, function(i, data) {
            var channel = j_channel();

            channel.id = data.id;
            channel.service_id = data.service_id;
            channel.source = data.source;
            channel.username = data.username;
            channel.auth_token = data.auth_token;
            channel.lastsync_at = data.lastsync_at;
            channel.created_at = data.created_at;

            channels.push(channel)
        });

        callback(channels);
    });
}