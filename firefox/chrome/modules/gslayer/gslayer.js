
var gslayer = {
    // Gmail UI html elements
    globals: {
        GUSER: '#guser',
        OFFLINE_INDICATOR: 'img.bo',
        OFFLINE_INDICATOR_SYNCING: 'bx',
        CANVAS_FRAME: 'canvas_frame',
        MANAGE_THIS_DOMAIN: '#\\:r3',
        CONTENT_BODY_ELEMENT: '.cP',
        NAVIGATION_ELEMENT: '.nM[role="navigation"]',
        INBOX_ELEMENT: '.TO:first',
        INBOX_SELECTED_ELEMENT: 'nZ',
        INBOX_ELEMENT_ANCHOR: 'n0'
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
        $LAB.script(browser.resolveContent('gslayer/' + filename))
            .wait();

        return this;
    },
    init: function() {
        document.gslayer = this;
        
        // Bootstrap-load all dependencies
        gslayer.require('components/thirdparty/jquery.js')
               .require('components/thirdparty/jquery.tools.js')
               .require('components/thirdparty/jquery.tpl.js')
               .require('components/thirdparty/jquery.autocomplete.js')
               .require('components/thirdparty/jquery.labelover.js')
               .require('components/thirdparty/gears_init.js')
               .require('components/logger.js')
               .require('components/gmail-db.js');

        // Create our event pub/sub data element
        gslayer.dataElement = document.createElement('GSlayerDataElement');        
        document.documentElement.appendChild(gslayer.dataElement);

        gslayer.bootstrapTimer = setInterval('gslayer.waitForInit();', 500);
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

                gslayer.bootstrapTimer = setInterval('gslayer.waitForInbox();', 500);

                // Start sync watcher
                gslayer.syncTimer = setInterval('gslayer.checkSyncStatus();', 500);
			} else {
                gslayer.hasOffline = false;
				logger.log('No offline indicator found');

                gslayer.events.publish('Loaded', { name: 'offline', value: false });
			}
		}
	},
    waitForInbox: function() {
        var elem = $(gslayer.globals.NAVIGATION_ELEMENT)
                .find(gslayer.globals.INBOX_ELEMENT);

        if (elem.length) {
            logger.log('Found inbox');

            gslayer.events.publish('Rendered');

            clearInterval(gslayer.bootstrapTimer);
        }
    },
    checkSyncStatus: function() {

        var newStatus = $(gslayer.globals.OFFLINE_INDICATOR)
                .hasClass(gslayer.globals.OFFLINE_INDICATOR_SYNCING);

        if (gslayer.syncing === newStatus)
            return; // Nothing changed        

        //logger.log('Sync status changed, new status is: ' + newStatus);

        gslayer.events.publish('Syncing', { name: 'syncing', value: newStatus });
    },

    // Events
    events: {
        publish: function(name, data) {
            if (typeof data != 'undefined') {

                if (data instanceof Array) {
                    for (var i = 0; i < data.length; i++) {
                        var elem = data[i];

                        gslayer.dataElement.setAttribute(elem.name, elem.value);
                    }
                }
                else {
                    gslayer.dataElement.setAttribute(data.name, data.value);
                }
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
        },
        getBaseUrl: function() {
            var location = window.location.href;

            if (/mail\.google\.com\/mail\//i.test(location)) {
                return 'https://mail.google.com/mail/';
            }

            if (/mail\.google\.com\/a\//i.test(location)) {
                var matches = /mail\.google\.com\/a\/(.+)\//i.exec(location);

                return 'https://mail.google.com/a/' + matches[1] + '/';
            }

            return null;
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
        appendInboxNavigationItem: function(item, callback) {
            var elem = $(gslayer.globals.NAVIGATION_ELEMENT)
                    .find(gslayer.globals.INBOX_ELEMENT);

            var newElem = elem.clone();

            newElem.attr('id', 22)
                    .removeClass(gslayer.globals.INBOX_SELECTED_ELEMENT);

            newElem.find('a')
                    .attr('href', 'javascript:;')
                    .attr('title', item)
                    .text(item);

            newElem.click(function() {
                // Doesn't work yet
//                $(gslayer.globals.NAVIGATION_ELEMENT)
//                    .find(gslayer.globals.INBOX_SELECTED_ELEMENT)
//                    .removeClass(gslayer.globals.INBOX_SELECTED_ELEMENT);

//                $(this).addClass(gslayer.globals.INBOX_SELECTED_ELEMENT);

                callback();
            });

            newElem.insertAfter(elem);
        },
        prependHtml: function(html) {
            $(gslayer.globals.CONTENT_BODY_ELEMENT)
                .prepend(html);
        },
        appendHtml: function(html) {
            $(gslayer.globals.CONTENT_BODY_ELEMENT)
                .append(html);
        },
        addOverlayTrigger: function(trigger) {
            $('#show-options').overlay({
                color: '#fff',
                closeOnClick: false
            });
        }
    },

    // Local database access
    db: {
        contacts: function(callback) {
            GmailDatabase.executeSql('select * from Contacts', callback);
        },
        messages: function(since, callback) {
            GmailDatabase.executeSql('select m.*, c.Subject, c.SenderListHtml from Messages m, Conversations c ' +
                    'where c.ConversationId = m.ConversationId and m.Timestamp > ?', [ since ], callback);
        },
        attachments: function(callback) {
            GmailDatabase.executeSql('select * from Attachments', callback);
        }
    }
};

gslayer.init();