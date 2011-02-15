var options = function() {
    function channel_exists(source, service_id, callback) {
        LocalDatabase.executeSql('SELECT COUNT(*) FROM channels WHERE source = ? AND service_id = ?',
                [ source, service_id ], callback)
    }

    function add_channel(source, service_id, username, auth_token) {
        LocalDatabase.executeSql('INSERT INTO channels (source, service_id, username, auth_token) VALUES (?, ?, ?, ?)',
                [ source, service_id, username, auth_token ])
    }

    return {
        init: function() {
            LocalDatabase.executeSql('SELECT * FROM channels', function(rs) {
                var data = {
                    available: ['Google', 'Facebook', 'Twitter', 'LinkedIn'],
                    configured: rs
                };

                gslayer.ui.appendHtml($.tmpl(options_popup_tpl, data));
                gslayer.ui.addOverlayTrigger('#show-options');

                $('.configure-link').click(function() {
                    mailjedi.configure($(this).attr('rel'));
                });
            });
        },
        refresh: function() {
            LocalDatabase.executeSql('SELECT * FROM channels', function(rs) {
                var data = {
                    available: ['Google', 'Facebook', 'Twitter', 'LinkedIn'],
                    configured: rs
                };

                var template = $.tmpl(options_popup_channels_tpl, data);

                $('#options-popup')
                    .find('.channels-root')
                    .replaceWith(template);
            });
        },
        process_configure_response: function(response, win) {
            var channel = channelFactory.build(response.provider, response.token);

            channel.me(function(user) {
                win.close();

                if (user == null) {
                    the_force.alert(i18n.error_occured);
                }
                else {
                    // Check if we already have this user in database
                    channel_exists(response.provider, user.service_id, function(data) {
                        if (data[0] == 0) {
                            add_channel(response.provider, user.service_id, user.displayname, response.token);

                            options.refresh();
                        }
                        else {
                            the_force.alert(i18n.error_channel_alread_added);
                        }
                    });
                }
            });
        }
    }
}();