// GMail UI was loaded
document.addEventListener('Loaded', function(e) {

    var iconUrl = gslayer.browser.resolveContent("images/icon11.png");
    var sink = $("<span><a id='show-options'><img border='0' src='" + iconUrl + "' /></a></span>")
        .find('#show-options')
        .click(function() {
            alert('Clicked');
        });

    gslayer.ui.prependNavigationItem(sink);

    if (e.target.getAttribute('offline') == 'true') {
        // We have lift-off        
        
    } else {
        // Show UI with instructions for enabling offline
    }    

}, false, true);