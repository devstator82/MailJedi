var facebook_channel = function(token) {
    var graphUrl = 'https://graph.facebook.com/';
    var access_token = token;

    return {
        me: function(callback) {
            $.getJSON(graphUrl + 'me?access_token=' + access_token + '&callback=?', function(data) {
                var user = service_user();

                user.service_id = data.id;
                user.token = access_token;
                user.displayname = data.name;

                callback(user);
            });
        }
    }
};