var logger = {
	prefix: 'INBOX2 - ',
	
	log: function(statement) {
		console.log(logger.prefix + statement);
	},
    error: function(statement) {
        console.log(logger.prefix + 'ERROR: ' + statement);

        throw statement;
    }
};