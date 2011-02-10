var LocalDatabase = function() {
    var instance = null;

    function open() {
        if (instance == null) {
            instance = openDatabase('mailjedi',
                    '1.0',
                    'MailJedi content database',
                    5 * 1024 * 1024);

            // Make sure all tables exist
            
        }

        return instance;
    }
    return {
        executeSql: function(query) {
            var database = null;

            try {
                database = open();

                database.transaction(function (tx) {
                  tx.executeSql(query);
                });

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