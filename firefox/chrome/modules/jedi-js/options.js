var options = function() {
    function channel_exists(source, service_id, callback) {
        LocalDatabase.executeSql('select count(*) from channels where source = ? and service_id = ?',
                [ source, service_id ], callback)
    }

    function add_channel(source, service_id, username, auth_token) {
        LocalDatabase.executeSql('insert into channels (source, service_id, username, auth_token, type) values (?, ?, ?, ?, ?)',
                [ source, service_id, username, auth_token, 5 ])
    }

    return {
        init: function() {
            j_all_social_channels(function(channels) {
                var data = {
                    available: ['Facebook', 'Twitter', 'LinkedIn'],
                    configured: channels
                };

                gslayer.ui.appendHtml($.tmpl(options_popup_tpl, data));
                gslayer.ui.addOverlayTrigger('#show-options');

                $('.configure-link').click(function() {
                    mailjedi.configure($(this).attr('rel'));
                });
            });

            logger.log('Options initialized');
        },
        refresh: function() {
            j_all_social_channels(function(channels) {
                var data = {
                    available: ['Facebook', 'Twitter', 'LinkedIn'],
                    configured: channels
                };

                var template = $.tmpl(options_popup_channels_tpl, data);

                $('#options-popup')
                    .find('.channels-root')
                    .replaceWith(template);
            });
        },
        process_configure_response: function(response, win) {
            var channel = j_channelFactory.build({ source: response.provider, token: response.token });

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