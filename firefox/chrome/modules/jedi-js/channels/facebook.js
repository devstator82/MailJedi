var facebook_channel = function(token) {
    var graphUrl = 'https://graph.facebook.com/';
    var apiUrl = 'https://api.facebook.com/method/';
    var access_token = token;

    return {
        source: function() {
            return 'Facebook';
        },
        me: function(callback) {
            $.getJSON('{0}me?access_token={1}&callback=?'.format(graphUrl, access_token), function(data) {
                var profile = j_profile();

                profile.service_id = data.id;
                profile.auth_token = access_token;
                profile.displayname = data.name;

                callback(profile);
            });
        },
        friends: function(callback) {
            var query = 'SELECT uid, name, first_name, last_name, pic_square, profile_url FROM user WHERE uid IN (SELECT uid2 FROM friend WHERE uid1=1279498012)';

            $.getJSON('{0}fql.query?access_token={1}&query={2}&format=json&callback=?'.format(apiUrl, access_token, query), function(data) {
                var profiles = [];

                $.each(data, function(i, elem) {
                    var profile = j_profile();

                    profile.service_id = elem.uid;
                    profile.displayname = elem.name;
                    profile.first_name = elem.first_name;
                    profile.last_name = elem.last_name;
                    profile.avatar = elem.pic_square;
                    profile.url = elem.profile_url;

                    profiles.push(profile);
                });

                callback(profiles);
            });
        }
    }
};