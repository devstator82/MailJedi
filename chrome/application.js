var application = {
	initialised: false,
	timer: null,

	init: function() {
		application.timer = setInterval('application.waitForInit();', 1500);		
	},
	attachApplicationSink: function() {
		var iconUrl = chrome.extension.getURL("images/icon11.png");		
		var sink = $("<span><a id='show-options'><img border='0' src='" + iconUrl + "' /></a></span>")
			.find('#show-options')
			.click(function() {
				chrome.windows.create({ 
					url: chrome.extension.getURL("options.html"), 
					width: 600, 
					height: 800, 
					type: 'popup' });			
			});		
		
		$(GUSER).children(':first')
			.prepend('<span> | </span>')
			.prepend(sink);
	},
	waitForInit: function() {
				
		if ($(GUSER).length) {		
			logger.log('Found gmail navigation bar');
			
			clearInterval(application.timer);
			application.attachApplicationSink();
		
			if ($(OFFLINE_INDICATOR).length) {
				logger.log('Found offline indicator');
				

			} else {
				logger.log('No offline indicator found');				
			}
		}
	}
};

$(document).ready(function () {
	if (frameElement != null && frameElement.id == CANVAS_FRAME)
		application.init();		
});	