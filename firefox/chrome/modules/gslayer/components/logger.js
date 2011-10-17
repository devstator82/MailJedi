var logger = {
	prefix: 'INBOX2 - ',
    doAlert: false,
	
	log: function(statement) {
        if (typeof console != 'undefined')
		    console.log(logger.prefix + statement);

        if (logger.doAlert) {
            alert(statement);
        }
	},
    warn: function(statement) {
        if (typeof console != 'undefined')
            console.log(logger.prefix + 'WARNING: ' + statement);

        if (logger.doAlert) {
            alert(statement);
        }
    },
    error: function(statement) {
        if (typeof console != 'undefined')
            console.log(logger.prefix + 'ERROR: ' + statement);

        if (logger.doAlert) {
            alert(statement);
        }
        
        throw statement;
    }
};