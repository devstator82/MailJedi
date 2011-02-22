var j_channelFactory = {
    build: function(config) {
        switch (config.source.toLocaleLowerCase()) {
            case 'gmail':
                return gmail_channel(config);

            case 'facebook':
                return facebook_channel(config);

            case 'twitter':
                return twitter_channel(config);

            case 'linkedin':
                return linkedin_channel(config);
        }
    }
};