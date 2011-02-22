var the_force = {
    // Set to true to enable debug mode
    use: true,

    alert: function(msg) {
        alert(msg)
    },
    bind: function(scope, fn) {
        return function () {
            fn.apply(scope, arguments);
        };
    }
};

String.prototype.format = function() {
  var args = arguments;
  return this.replace(/{(\d*)}/g, function(match, number) {
      return args[number] || '';
    }
  );
};

String.prototype.capitalize = function() {
    return this
        .toLowerCase()
        .replace(/^\w/, function($0) { 
            return $0.toUpperCase();
        })
};

String.prototype.to_date = function() {
    return new Date(Number(this) * 1000);
};

Number.prototype.to_date = function() {
    return new Date(Number(this) * 1000);
};

Date.prototype.to_unixtime = function() {
    return Math.ceil(this.getTime() / 1000);
};

String.prototype.startsWith = function (str) {
    return this.substr(0, str.length) === str;
};

String.prototype.endsWith = function (str) {
    return this.substr(this.length - str.length -1, str.length) === str;
};

String.prototype.unquote = function() {
    if (this.startsWith('"') && this.endsWith('"')) {
        return this.substring(1, this.length -2);
    }

    return this;
};

Array.prototype.popArray = function(fieldname) {

    var resp = [];

    for (var i = 0; i < this.length; i++) {
        if (typeof fieldname == 'undefined') {
            if (typeof this[i] == 'array') {
                resp.push(this[i][0]);
            }
            else {
                resp.push(this[i]);
            }
        }
        else {
            if (fieldname.endsWith('id')) {
                resp.push(String(this[i][fieldname]));
            }
            else {
                resp.push(this[i][fieldname]);
            }
        }
    }

    return resp;
};

//This prototype is provided by the Mozilla foundation and
//is distributed under the MIT license.
//http://www.ibiblio.org/pub/Linux/LICENSES/mit.license

if (!Array.prototype.filter)
{
  Array.prototype.filter = function(fun /*, thisp*/)
  {
    var len = this.length;
    if (typeof fun != "function")
      throw new TypeError();

    var res = new Array();
    var thisp = arguments[1];
    for (var i = 0; i < len; i++)
    {
      if (i in this)
      {
        var val = this[i]; // in case fun mutates this
        if (fun.call(thisp, val, i, this))
          res.push(val);
      }
    }

    return res;
  };
}

Object.prototype.isArray = function() {
   return (this.constructor.toString().indexOf("Array") > -1);
};