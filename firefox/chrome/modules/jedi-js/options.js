var options = {
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
    add_channel: function(source, username, auth_token) {
        LocalDatabase.executeSql('INSERT INTO channels (source, username, auth_token) VALUES (?, ?, ?)',
                [ source, username, auth_token ])
    }
};