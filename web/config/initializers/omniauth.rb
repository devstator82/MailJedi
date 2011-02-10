TwitterConfig = YAML.load_file(Rails.root.join('config', 'twitter.yml'))[Rails.env]
FacebookConfig = YAML.load_file(Rails.root.join('config', 'facebook.yml'))[Rails.env]
LinkedInConfig = YAML.load_file(Rails.root.join('config', 'linkedin.yml'))[Rails.env]

Rails.application.config.middleware.use OmniAuth::Builder do
  provider :twitter, TwitterConfig['consumer_key'], TwitterConfig['consumer_secret']
  provider :facebook, FacebookConfig['app_id'], FacebookConfig['app_secret'], {:scope => 'offline_access,read_mailbox'}
  #provider :linked_in, LinkedInConfig['api_key'], LinkedInConfig['secret_key']
end