function isSafe(e) {
    // Make sure that only code from the gmail domain is allowed
    // to trigger events that we subscribe to.
    return /mail\.google\.com/i.test(e.target.ownerDocument.location);
}

function loaded(e) {
    if (isSafe(e)) {
//        if (e.target.getAttribute('offline') == 'true') {
//            // We have lift-off, start receive task
//            var receiveWorker = new Worker('chrome://mailjedi/content/workers/receive.js');
//            receiveWorker.onmessage = function(event) {
//                alert(event.data);
//            };
//        }
//        else {
//            // Show UI with instructions for enabling offline
//        }
    }
}

function syncing(e) {
    if (isSafe(e)) {
        if (e.target.getAttribute('syncing') == 'false') {
            // GMail offline syncing finished

        }
    }
}

document.addEventListener('Loaded', loaded, false, true);
document.addEventListener('Syncing', syncing, false, true);