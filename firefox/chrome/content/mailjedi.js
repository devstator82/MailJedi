// Gmail UI was loaded
document.addEventListener('Loaded', function() {

    var iconUrl = gslayer.browser.resolveContent("images/icon11.png");
    var sink = $("<span><a id='show-options'><img border='0' src='" + iconUrl + "' /></a></span>")
        .find('#show-options')
        .click(function() {
            alert('Clicked');
        });

    gslayer.ui.prependNavigationItem(sink);

}, false, true);

// Offline indicator was found
document.addEventListener('Offline', function(e) {

    if (e.target.getAttribute('offline') == 'true') {
        // We have offline capabilities
    }

}, false, true);