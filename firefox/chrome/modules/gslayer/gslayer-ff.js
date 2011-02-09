// FireFox specific extensions urls
var browser = {
    resolveResource: function(filename) {
        return 'resource://mailjedi/' + filename;
    },
    resolveContent: function(filename) {
        return 'chrome://mailjedi/content/' + filename;
    }
};