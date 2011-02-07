var mailjedi = {

    init: function(event) {
        // Only run when navigating to gmail
        if (/mail\.google\.com/i.test(content.location.href)) {
            if (event.originalTarget instanceof HTMLDocument) {
                var win = event.originalTarget.defaultView;

                if (win.frameElement) {
                    if (win.frameElement.id == 'canvas_frame') {
                        // This is our gmail content frame. Inject our extension code into it
                        mailjedi.appendScript(event.originalTarget, 'require.js');
                        mailjedi.appendScript(event.originalTarget, 'gslayer.js');
                    }

                    win = win.top;
                }
            }
        }
    },
    appendScript: function(doc, filename) {
        var scriptElement = doc.createElement('script');
        scriptElement.setAttribute('type', 'text/javascript');
        scriptElement.setAttribute('src', 'resource://mailjedi/gslayer/' + filename);

        doc.body.appendChild(scriptElement);
    }
};

//
// Main entry point for our plugin
//
window.addEventListener("load", function () {
    gBrowser.addEventListener("DOMContentLoaded", mailjedi.init, true);
}, false);