var j_channelFactory = {
    build: function(source, token) {
        switch (source.toLocaleLowerCase()) {
            case 'gmail':
                return gmail_channel(token);

            case 'facebook':
                return facebook_channel(token);

            case 'twitter':
                return twitter_channel(token);

            case 'linkedin':
                return linkedin_channel(token);
        }
    }    
};