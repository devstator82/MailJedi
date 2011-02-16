var GmailDatabase = function(emailAddress) {
    var filename = null;
    var emailAddress = null;

    function buildFilename() {
        var emailAddress = gslayer.state.emailAddress();
        var parts = emailAddress.split('@');
        return /@gmail\.com$/.test(emailAddress) ?
                emailAddress + '-GoogleMail' :
                emailAddress + '-GoogleMail@' + parts[parts.length -1];
    }

    function open() {
        // Initialize database access
        if (filename == null)
            filename = buildFilename();

        var database = google.gears.factory.create('beta.database');
        database.open(filename);

        return database;
    }

    function close(database) {
        database.close();
    }

    return {
        executeSql: function(query, params, callback) {

            var database = null;

            try {
                database = open();

                if (typeof params == 'function') {
                    // No data, only callback
                    callback = params;
                    params = null;
                }

                logger.log('Executing GMail query: ' + query);

                var resultSet = [];
                var rs = database.execute(query);

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

                logger.log('GMail query returned ' + resultSet.length + ' rows');

                // Execute our callback function
                if (typeof callback == 'function') {
                    logger.log('Invoking GMail query callback');

                    callback(resultSet);
                }

                return resultSet;
            }
            catch (error) {
                logger.error(error);
            }
            finally {
                if (database != null)
                    close(database);
            }
        }
    }
}();