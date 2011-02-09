//
// GMail UI was loaded
//
function isRunningUnderGmail(e) {
    // Make sure that only code from the gmail domain is allowed
    // to trigger events that we subscribe to.
    return /mail\.google\.com/i.test(e.target.ownerDocument.location);
}

document.addEventListener('Loaded', function(e) {
    if (isRunningUnderGmail(e)) {
        if (e.target.getAttribute('offline') == 'true') {
            // We have lift-off, start receive task
            var receiveWorker = new Worker('chrome://mailjedi/content/workers/receive.js');
            receiveWorker.onmessage = function(event) {
                
            };
        }
        else {
            // Show UI with instructions for enabling offline
        }
    }
}, false, true);

//
// Sync status changed
//
document.addEventListener('Syncing', function(e) {
    if (isRunningUnderGmail(e)) {
        if (e.target.getAttribute('syncing') == 'false') {
            // GMail offline syncing finished

        }
    }
}, false, true);