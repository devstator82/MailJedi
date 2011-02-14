var LocalDatabase = function() {
    var instance = null;

    function open() {
        if (instance == null) {
            instance = openDatabase('mailjedi',
                    '1.0',
                    'MailJedi content database',
                    5 * 1024 * 1024);            

            // Make sure all tables exist
            instance.transaction(function(tx) {
                tx.executeSql(create_channels_sql);
            });
        }

        return instance;
    }
    return {
        executeSql: function(query, params, callback) {
            var database = open();

            if (typeof params == 'function') {
                // No data, only callback
                callback = params;
                params = null;
            }

            database.transaction(function(tx) {
                tx.executeSql(query, params, function(tx, rs) {
                    var resultSet = [];
                    for (var i = 0; i < rs.rows.length; i++) {
                        var item = rs.rows.item(i);
                        resultSet.push(item);
                    }
                    
                    callback(resultSet);
                });
            });
        }
    }
}();