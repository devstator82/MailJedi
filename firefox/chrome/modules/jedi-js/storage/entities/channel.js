var j_channel = function() {
    return {
        id: null,
        service_id: null,
        source: null,
        username: null,
        auth_token: null,
        lastmessage_at: null,
        lastsync_at: null,
        created_at: null
    }
};

function j_all_gmail_channels(callback) {
    LocalDatabase.executeSql('select * from channels where type = 0', function(rs) {
        j_all_channels_process_response(rs, callback);
    });
}

function j_all_social_channels(callback) {
    LocalDatabase.executeSql('select * from channels where type = 5', function(rs) {
        j_all_channels_process_response(rs, callback);
    });
}

function j_all_channels(callback) {
    LocalDatabase.executeSql('select * from channels', function(rs) {
        j_all_channels_process_response(rs, callback);
    });
}

function j_all_channels_process_response(rs, callback) {
    var channels = [];

    $.each(rs, function(i, data) {
        var channel = j_channel();

        channel.id = data.id;
        channel.service_id = data.service_id;
        channel.source = data.source;
        channel.username = data.username;
        channel.auth_token = data.auth_token;
        channel.lastmessage_at = data.lastmessage_at;
        channel.lastsync_at = data.lastsync_at;
        channel.created_at = data.created_at;

        channels.push(channel)
    });

    callback(channels);
}

var j_ensure_gmail_channel = function() {
    var email = gslayer.state.emailAddress();
    var isAppsUser = gslayer.state.isAppsUser();
    var baseUrl = gslayer.state.getBaseUrl();

    LocalDatabase.executeSql('select count(*) from channels where service_id = ? and type = ?', [ email, 1 ], function(rs) {
        if (rs[0] == 0) {
            var insert_query = 'insert into channels (service_id, source, username, url, type, created_at) values (?, ?, ?, ?, ?, ?)';

            LocalDatabase.executeSql(insert_query, [ email, 'gmail', email, baseUrl, 1, new Date().to_unixtime() ]);
        }
    });
};