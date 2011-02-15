var mailjedi = function() {
    return {
        win: null,
        
        loaded: function() {
            $('head').append(
                $('<link>').attr({
                    type: 'text/css',
                    rel: 'stylesheet',
                    href: browser.resolveContent('jedi-js/mailjedi.css')
                })
            );

            var iconUrl = browser.resolveContent('jedi-js/images/icon11.png');
            var sink = "<span><img border='0' src='" + iconUrl + "' /> " +
                    "<a id='show-options' rel='#options-popup' href='javascript:;'>MailJedi</a></span>";

            // Add navigation item
            gslayer.ui.prependNavigationItem(sink);

            // Add options popup to html
            var isFirefox = (window.navigator.userAgent.indexOf("Firefox") > -1);

            $LAB.script(browser.resolveContent('jedi-js/force.js'))
                .script(browser.resolveContent('jedi-js/lang/en-US.js'))
                .script(browser.resolveContent('jedi-js/storage/storage.js'))
                .script(browser.resolveContent('jedi-js/storage/' + (isFirefox ? 'gears.js' : 'html5.js')))
                .script(browser.resolveContent('jedi-js/storage/entities/service_user.js'))
                .script(browser.resolveContent('jedi-js/channels/facebook.js'))
                .script(browser.resolveContent('jedi-js/channels/channelFactory.js'))
                .script(browser.resolveContent('jedi-js/templates/options_template.js'))
                .script(browser.resolveContent('jedi-js/options.js'))
                .wait(function(){
                    options.init();
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
window.addEventListener('message', bind(mailjedi, mailjedi.configureSuccess), false);