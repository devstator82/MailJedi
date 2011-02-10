// FireFox specific extensions urls
var browser = {
    resolveContent: function(filename) {
        return 'chrome://mailjedi/content/' + filename;
    },
    resolveAppRootUrl: function(path) {
        return 'http://dev.mailjedi.com:3000/' + path;
    },
    resolveAppUrl: function(path) {
        return browser.resolveAppRootUrl('jedi-js/' + path);
    }
};