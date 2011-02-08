
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
               .require('globals.js')
               .require('components/logger.js');

        // Create our event pub/sub data element
        gslayer.dataElement = document.createElement('GSlayerDataElement');        
        document.documentElement.appendChild(gslayer.dataElement);

        gslayer.bootstrapTimer = setInterval('gslayer.waitForInit();', 1500);                
    },
    waitForInit: function() {

		if ($(gslayer.globals.GUSER).length) {
			logger.log('Found gmail navigation bar');

			clearInterval(gslayer.bootstrapTimer);
            gslayer.events.publish('Loaded');

            if ($(gslayer.globals.OFFLINE_INDICATOR).length) {
				logger.log('Found offline indicator');
                
                gslayer.events.publish('Offline', { name: 'offline', value: true });

			} else {
				logger.log('No offline indicator found');

                gslayer.events.publish('Offline', { name: 'offline', value: false });
			}
		}
	},

    // Event handler
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
    }
};

gslayer.init();