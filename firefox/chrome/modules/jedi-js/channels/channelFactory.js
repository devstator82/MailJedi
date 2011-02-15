var channelFactory = {
    build: function(source, token) {
        switch (source.toLocaleLowerCase()) {
            case 'google':
                return google_channel(token);

            case 'facebook':
                return facebook_channel(token);

            case 'twitter':
                return twitter_channel(token);

            case 'linkedin':
                return linkedin_channel(token);
        }
    }
};