var gmail_channel = function(token) {
    return {
        source: function() {
            return 'gmail';
        },
        me: function(callback) {
            // Not implemented
        },
        friends: function(service_id, callback) {
            gslayer.db.contacts(function(data) {

                var profiles = [];

                $.each(data, function(i, elem) {
                    var profile = j_profile();
                    var name = j_name_parser(elem.Name);

                    profile.service_id = elem.ServerId;
                    profile.displayname = name.toString();
                    profile.first_name = name.first_name();
                    profile.last_name = name.last_name();
                    profile.address = elem.PrimaryEmail;
                    profile.avatar = null;
                    profile.url = null;
                    profile.is_soft = false;

                    if ($.trim(profile.displayname) == '') {
                        profile.displayname = profile.address;
                        profile.is_soft = true;
                    }

                    if ($.trim(profile.address) != '')
                        profiles.push(profile);
                });

                callback(profiles);
            });
        }
    }
};