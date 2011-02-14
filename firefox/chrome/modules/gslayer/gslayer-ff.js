// FireFox specific extensions urls
var browser = {
    resolveContent: function(filename) {
        return 'resource://mailjedi/' + filename;
    },
    resolveAppRootUrl: function(path) {
        return 'http://dev.mailjedi.com:3000/' + path;
    },
    resolveAppUrl: function(path) {
        return browser.resolveAppRootUrl('jedi-js/' + path);
    }
};