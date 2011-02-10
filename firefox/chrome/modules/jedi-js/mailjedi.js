var mailjedi = function() {
    return {
        win: null,
        
        loaded: function() {
            $('head').append(
                $('<link>').attr({
                    type: 'text/css',
                    rel: 'stylesheet',
                    href: browser.resolveResource('jedi-js/mailjedi.css')
                })
            );

            var iconUrl = browser.resolveResource('jedi-js/images/icon11.png');
            var sink = "<span><img border='0' src='" + iconUrl + "' /> " +
                    "<a id='show-options' rel='#options-popup' href='javascript:;'>MailJedi</a></span>";

            // Add navigation item
            gslayer.ui.prependNavigationItem(sink);

            // Add options popup to html
            $LAB.script(browser.resolveResource('jedi-js/templates/options.js'));
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
                var response = jQuery.parseJSON(event.data);

                this.win.close();
            }
        }
    };
}();

document.addEventListener('Loaded', mailjedi.loaded, false);
window.addEventListener('message', mailjedi.configureSuccess, false);