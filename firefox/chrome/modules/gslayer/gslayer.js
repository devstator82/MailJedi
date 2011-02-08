
var gslayer = {
    // Gmail UI html elements
    globals: {
        GUSER: '#guser',
        OFFLINE_INDICATOR: '#\\:qa',
        CANVAS_FRAME: 'canvas_frame'
    },

    // Browser specific things
    browser : {
        resolveResource: function(filename) {
            return 'resource://mailjedi/gslayer/' + filename;
        },
        resolveContent: function(filename) {
            return 'chrome://mailjedi/content/' + filename;
        }
    },

    // State variables
    loaded: false,
    bootstrapTimer: null,
    dataElement: null,
    hasOffline: false,

    // Functions
    require: function(filename) {
        $LAB.script(gslayer.browser.resolveResource(filename))
            .wait();

        return this;
    },
    init: function() {
        document.gslayer = this;
        
        // Bootstrap-load all dependencies
        gslayer.require('jquery.js')
               .require('gears_init.js')
               .require('globals.js')
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

			clearInterval(gslayer.bootstrapTimer);

            if ($(gslayer.globals.OFFLINE_INDICATOR).length) {
                gslayer.hasOffline = true;
				logger.log('Found offline indicator');
                
                gslayer.events.publish('Loaded', { name: 'offline', value: true });

                // Get email address
                var emailAddress = gslayer.state.emailAddress();

                // Initialize database access
                var parts = emailAddress.split('@');
                var filename = /@gmail\.com$/.test(emailAddress) ?
                        emailAddress + '-GoogleMail' :
                        emailAddress + '-GoogleMail@' + parts[parts.length -1];

                db.init(filename);
			} else {
                gslayer.hasOffline = false;
				logger.log('No offline indicator found');

                gslayer.events.publish('Loaded', { name: 'offline', value: false });
			}
		}
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
        }
    },

    data: {
        test: function() {
            alert(db.executeSql('select count(*) from Messages'));
        }
    }
};

gslayer.init();