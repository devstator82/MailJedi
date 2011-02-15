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
  return this.replace(/{(\d+)}/g, function(match, number) {
      return args[number] || '{' + number + '}';
    }
  );
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