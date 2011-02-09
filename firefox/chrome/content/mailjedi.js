var mailjedi = {
    addEventHandler: function(name, callback) {
        document.addEventListener(name, callback, false, true);
    },

    loaded: function() {
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

        gslayer.ui.prependNavigationItem(sink);

        // Add options popup to html
        
//          Not working yet
//        var popup = $.get(browser.resolveContent('templates/options.html'));
//        alert(popup);
//        $('.cP').append(popup);
    }
};

mailjedi.addEventHandler('Loaded', mailjedi.loaded);