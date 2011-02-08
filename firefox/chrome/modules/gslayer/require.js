var EXPORTED_SYMBOLS = ['require'];

var mods = {};

var require = function (mod) {
  if (mods[mod]) {
    return mods[mod].exports;
  }

  var scope = {
    require: require
  };

  var found = false;
  for (var i = 0 ; i < require.path.length ; i++) {
    var path = require.path[i];
    try {
      scope.exports = {};

      Components.classes["@mozilla.org/moz/jssubscript-loader;1"].
          getService(Components.interfaces.mozIJSSubScriptLoader).
          loadSubScript(path + "/" + mod + ".js", scope);
      found = true;
      break;
    }
    catch (e) {
        if (e != "Error opening input stream (invalid filename?)") {
            throw e;
        }
    }
  }
  if (!found) {
      Components.utils.reportError("CommonJS module not found: " + mod);
  }

  mods[mod] = scope;
  return mods[mod].exports;
};

require.path = [];