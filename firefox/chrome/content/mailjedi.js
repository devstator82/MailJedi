var mailjedi = {
    init: function() {
        mailjedi.subscribe('Loaded', function() {
            alert('Loaded bruv');
        });
    },
    subscribe: function(name, callback) {
        document.addEventListener(name, callback, false, true);
    }
};

mailjedi.init();