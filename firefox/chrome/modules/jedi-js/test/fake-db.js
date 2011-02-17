var LocalDatabase = function() {
    var queries = [];

    return {
        beginTransaction: function() {
        },
        endTransaction: function(callback) {
            callback();
        },
        executeSql: function(query, params, callback) {
            queries.push({ query: query, params: params });

            if (typeof callback == 'function')
                callback(new Array());
        },
        pop: function() {
            return queries.pop();
        }
    }
}();