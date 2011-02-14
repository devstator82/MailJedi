var LocalDatabase = function() {
    var instance = null;

    function open() {
        if (instance == null) {
            instance = google.gears.factory.create('beta.database');
            instance.open('mailjedi');
            
            // Make sure all tables exist
            instance.execute(create_channels_sql);
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

            logger.log('Executing query: ' + query);

            var resultSet = [];
            var rs = database.execute(query, params);

            while (rs.isValidRow()) {
                var obj = [];
                var count = rs.fieldCount();

                if (count == 1) {
                    // Use this for count, sum, etc queries
                    obj = rs.field(0);
                }
                else {
                    for (var i = 0; i < rs.fieldCount(); i++) {
                        var fieldName = rs.fieldName(i);

                        obj[rs.fieldName(i)] = rs.field(i);
                    }
                }

                resultSet.push(obj);
                rs.next();
            }
            rs.close();

            logger.log('Query returned ' + resultSet.length + ' rows');

            // Execute our callback function
            if (typeof callback == 'function') {
                logger.log('Invoking query callback');

                callback(resultSet);
            }
        }
    }
}();