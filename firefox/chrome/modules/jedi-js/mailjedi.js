var mailjedi = function() {
    var receiveTimer = null;

    function workerHeartBeat() {
        j_all_channels(function(channels) {
            $.each(channels, function(i, channel) {

                function shouldSync() {
                    if (the_force.use)
                        return true;

                    if (channel.lastsync_at == null || channel.lastsync_at == 0) {
                        logger.log('Channel {0} did not have a lastsync date, forcing sync'.format(channel.id));

                        return true;
                    }

                    var date = channel.lastsync_at.to_date();
                    var diff = (new Date().getTime() - date.getTime()) / 1000;

                    return diff > 120
                }

                if (shouldSync()) {
                    // Last sync was more then 2 minutes ago, run sync
                    sync(channel).run();
                }

                // Reset to idle state
                receiveTimer = setTimeout(workerHeartBeat, 1000 * 60 * 2);
            });
        });
    }

    return {
        win: null,
        
        loaded: function(e) {
            $('head').append(
                $('<link>').attr({
                    type: 'text/css',
                    rel: 'stylesheet',
                    href: browser.resolveContent('jedi-js/stylesheets/master.css')
                }),
				$('<link>').attr({
                    type: 'text/css',
                    rel: 'stylesheet',
                    href: browser.resolveContent('jedi-js/stylesheets/skins/classic.css')
                })
            );

            var iconUrl = browser.resolveContent('jedi-js/images/icon11.png');
            var sink = "<span><img border='0' src='" + iconUrl + "' /> " +
                    "<a id='show-options' rel='#options-popup' href='javascript:;'>MailJedi</a></span>";

            // Add navigation item
            gslayer.ui.prependNavigationItem(sink);

            // Add options popup to html
            var isFirefox = (window.navigator.userAgent.indexOf("Firefox") > -1);

            $LAB.script(browser.resolveContent('jedi-js/the_force.js'))
                .script(browser.resolveContent('jedi-js/lang/en-US.js'))
                .script(browser.resolveContent('jedi-js/storage/schema.js'))
                .script(browser.resolveContent('jedi-js/storage/' + (isFirefox ? 'gears.js' : 'html5.js')))
                .script(browser.resolveContent('jedi-js/storage/entities/channel.js'))
                .script(browser.resolveContent('jedi-js/storage/entities/profile.js'))
                .script(browser.resolveContent('jedi-js/storage/entities/person.js'))
                .script(browser.resolveContent('jedi-js/storage/entities/message.js'))
                .script(browser.resolveContent('jedi-js/storage/entities/document.js'))
                .script(browser.resolveContent('jedi-js/channels/gmail.js'))
                .script(browser.resolveContent('jedi-js/channels/facebook.js'))
                .script(browser.resolveContent('jedi-js/channels/twitter.js'))
                .script(browser.resolveContent('jedi-js/channels/linkedin.js'))
                .script(browser.resolveContent('jedi-js/channels/sourceaddress.js'))
                .script(browser.resolveContent('jedi-js/channels/channel-factory.js'))
                .script(browser.resolveContent('jedi-js/channels/contact-matcher.js'))
                .script(browser.resolveContent('jedi-js/channels/profile-matcher.js'))
                .script(browser.resolveContent('jedi-js/channels/sync.js'))
                .script(browser.resolveContent('jedi-js/templates/templates.js'))
                .script(browser.resolveContent('jedi-js/options.js'))
                .script(browser.resolveContent('jedi-js/dashboard.js'))
                .wait(function() {
                    options.init();

                    // Add this gmail account if not added already
                    j_ensure_gmail_channel();

                    var hasOffline = (e.target.getAttribute('offline') == 'true');

                    if (hasOffline) {
                        // We have lift-off, start receive timer
                        receiveTimer = setTimeout(workerHeartBeat, 2000);
                    }
                });
        },
        configure: function(service) {
            var location = browser.resolveAppRootUrl('auth/' + service);
            this.win = window.open(location,
                'mailjedi_auth_window', 'width=750,height=450,toolbar=no,' +
                    'location=no,status=yes,menubar=no,scrollbars=auto');
            
            this.win.focus();
        },
        configureSuccess: function(event) {
            // Make sure the message comes from a valid source
            if (/mailjedi\.com/.test(event.origin)) {
                options.process_configure_response(
                    jQuery.parseJSON(event.data), this.win);
            }
        }
    };
}();

function bind(scope, fn) {
    return function () {
        fn.apply(scope, arguments);
    };
}

document.addEventListener('Loaded', bind(mailjedi, mailjedi.loaded), false);
document.addEventListener('Rendered', bind(mailjedi, function() { dashboard.init(); }), false);
window.addEventListener('message', bind(mailjedi, mailjedi.configureSuccess), false);