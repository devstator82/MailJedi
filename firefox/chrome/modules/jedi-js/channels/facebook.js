var facebook_channel = function(config) {
    var graphUrl = 'https://graph.facebook.com/';
    var apiUrl = 'https://api.facebook.com/method/';

    return {
        source: function() {
            return 'facebook';
        },
        me: function(callback) {
            $.getJSON('{0}me?access_token={1}&callback=?'.format(graphUrl, config.token), function(data) {
                var profile = j_profile();

                profile.service_id = data.id;
                profile.auth_token = config.token;
                profile.displayname = data.name;

                callback(profile);
            });
        },
        friends: function(callback) {
            var query = 'SELECT uid, name, first_name, last_name, pic_square, profile_url FROM user WHERE uid IN (SELECT uid2 FROM friend WHERE uid1={0})'
                    .format(config.service_id);
            
            $.getJSON('{0}fql.query?access_token={1}&query={2}&format=json&callback=?'.format(apiUrl, config.auth_token, query), function(data) {
                var profiles = [];

                $.each(data, function(i, elem) {
                    var profile = j_profile();

                    profile.service_id = String(elem.uid);
                    profile.source = 'facebook';
                    profile.channel_id = config.id;
                    profile.displayname = elem.name;
                    profile.first_name = elem.first_name;
                    profile.last_name = elem.last_name;
                    profile.address = String(elem.uid);
                    profile.avatar = elem.pic_square;
                    profile.url = elem.profile_url;
                    profile.is_soft = false;

                    profiles.push(profile);
                });

                callback(profiles);
            });
        },
        messages: function(callback) {

        }
    }
};