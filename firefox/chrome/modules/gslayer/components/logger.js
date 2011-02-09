var logger = {
	prefix: 'INBOX2 - ',
    doAlert: false,
	
	log: function(statement) {
		console.log(logger.prefix + statement);

        if (logger.doAlert) {
            alert(statement);
        }
	},
    error: function(statement) {
        console.log(logger.prefix + 'ERROR: ' + statement);

        if (logger.doAlert) {
            alert(statement);
        }
        
        throw statement;
    }
};