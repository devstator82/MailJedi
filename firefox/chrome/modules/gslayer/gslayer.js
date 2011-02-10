
var gslayer = {
    // Gmail UI html elements
    globals: {
        GUSER: '#guser',
        OFFLINE_INDICATOR: 'img.bo',
        OFFLINE_INDICATOR_SYNCING: 'bx',
        CANVAS_FRAME: 'canvas_frame',
        MANAGE_THIS_DOMAIN: '#\\:r3',
        CONTENT_BODY_ELEMENT: '.cP'
    },    

    // State variables
    loaded: false,
    bootstrapTimer: null,
    dataElement: null,
    hasOffline: false,

    syncTimer: null,
    syncing: false,

    // Functions
    require: function(filename) {
        $LAB.script(browser.resolveResource('gslayer/' + filename))
            .wait();

        return this;
    },
    init: function() {
        document.gslayer = this;
        
        // Bootstrap-load all dependencies
        gslayer.require('components/thirdparty/jquery.js')
               .require('components/thirdparty/jquery.tools.js')
               .require('components/thirdparty/jquery.tpl.js')
               .require('components/thirdparty/gears_init.js')
               .require('components/logger.js')
               .require('components/db.js');

        // Create our event pub/sub data element
        gslayer.dataElement = document.createElement('GSlayerDataElement');        
        document.documentElement.appendChild(gslayer.dataElement);

        gslayer.bootstrapTimer = setInterval('gslayer.waitForInit();', 1500);
    },
    waitForInit: function() {

		if ($(gslayer.globals.GUSER).length) {
			logger.log('Found gmail navigation bar');

            gslayer.loaded = true;
			clearInterval(gslayer.bootstrapTimer);            
            
            if ($(gslayer.globals.OFFLINE_INDICATOR).length) {
                gslayer.hasOffline = true;
				logger.log('Found offline indicator');
                
                gslayer.events.publish('Loaded', { name: 'offline', value: true });

                // Get email address, also performs a sanity check
                var emailAddress = gslayer.state.emailAddress();

                // Start sync watcher
                gslayer.syncTimer = setInterval('gslayer.checkSyncStatus();', 500);
			} else {
                gslayer.hasOffline = false;
				logger.log('No offline indicator found');

                gslayer.events.publish('Loaded', { name: 'offline', value: false });
			}
		}
	},
    checkSyncStatus: function() {

        var newStatus = $(gslayer.globals.OFFLINE_INDICATOR)
                .hasClass(gslayer.globals.OFFLINE_INDICATOR_SYNCING);

        if (gslayer.syncing === newStatus)
            return; // Nothing changed        

        logger.log('Sync status changed, new status is: ' + newStatus);

        gslayer.events.publish('Syncing', { name: 'syncing', value: newStatus });
    },

    // Events
    events: {
        publish: function(name, data) {
            if (typeof data != 'undefined') {
                gslayer.dataElement.setAttribute(data.name, data.value);
            }

            var ev = document.createEvent("Events");
            ev.initEvent(name, true, false);
            gslayer.dataElement.dispatchEvent(ev);
        },
        subscribe: function(name, callback) {
            document.addEventListener(name, callback, false, true);
        }
    },

    // State
    state: {
        hasOffline: function() {
            return gslayer.hasOffline;
        },
        emailAddress: function() {
            var address = $('#guser b').first().html();

            if (address.indexOf('@') < 0) {
                // Unable to verify email address, something went like wrong
                logger.error('Unable to verify email address. Found: ' + address);
            }

            return address;
        },
        isAppsUser: function() {
            return ($(gslayer.globals.GUSER)
                    .find(gslayer.globals.MANAGE_THIS_DOMAIN)
                    .length);
        }
    },

    // UI hooks
    ui: {
        prependNavigationItem: function(item) {
            $(gslayer.globals.GUSER).children(':first')
			    .prepend('<span> | </span>')
			    .prepend(item);
        },
        appendNavigationItem: function(item) {
            $(gslayer.globals.GUSER).children(':first')
                .append('<span> | </span>')
                .append(item);
        },
        prependHtml: function(html) {
            $(gslayer.globals.CONTENT_BODY_ELEMENT)
                .prepend(html);
        },
        appendHtml: function(html) {
            $(gslayer.globals.CONTENT_BODY_ELEMENT)
                .append(html);
        }
    }
};

gslayer.init();