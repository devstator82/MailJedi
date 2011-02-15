var the_force = {
    alert: function(msg) {
        alert(msg)
    },
    bind: function(scope, fn) {
        return function () {
            fn.apply(scope, arguments);
        };
    }
};