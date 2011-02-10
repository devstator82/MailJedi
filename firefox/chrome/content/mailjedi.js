var mailjedi = {
    addEventHandler: function(name, callback) {
        document.addEventListener(name, callback, false, true);
    },

    loaded: function() {
        $("head").append(
            $('<link>').attr({
                type: 'text/css',
                rel: 'stylesheet',
                href: browser.resolveContent('mailjedi.css')
            })
        );

        var iconUrl = browser.resolveContent('images/icon11.png');
        var sink = $("<span><a id='show-options'><img border='0' src='" + iconUrl + "' /> MailJedi</a></span>")
            .find('#show-options')
            .click(function() {
                // Show options dialog
                $('#options-popup').overlay({
                    color: '#fff',
                    closeOnClick: false,
                    load: true
                });
        });

        // Add navigation item
        gslayer.ui.prependNavigationItem(sink);

        // Add options popup to html
        $LAB.script(browser.resolveContent('templates/options.js'));
    }
};

mailjedi.addEventHandler('Loaded', mailjedi.loaded);