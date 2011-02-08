var db = {
    filename: null,

    init: function(filename) {
        db.filename = filename;
    },
    open: function() {
        var database = google.gears.factory.create('beta.database');
        database.open(db.filename);

        return database;
    },
    close: function(database) {
        database.close();
    },
    executeSql: function(query) {
        var database = null;

        if (db.filename == null) {
            throw 'Database has not been initialized yet'
        }

        try {
            database = db.open();

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

            return resultSet;
        }
        catch (error) {
            logger.error(error);
        }
        finally {
            if (database != null)
                database.close();
        }
    }
};