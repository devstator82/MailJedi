var gmail_channel = function(config) {
    return {
        source: function() {
            return 'gmail';
        },
        me: function(callback) {
            // Not implemented
        },
        friends: function(callback) {
            gslayer.db.contacts(function(data) {

                var profiles = [];

                $.each(data, function(i, elem) {
                    var profile = j_profile();
                    var name = j_name_parser(elem.Name);
                    var sourceaddress = j_sourceAddress(elem.PrimaryEmail);
                    sourceaddress.parse();

                    profile.service_id = elem.ServerId;
                    profile.source = 'gmail';
                    profile.channel_id = config.id;
                    profile.displayname = elem.Name;
                    profile.first_name = name.first_name();
                    profile.last_name = name.last_name();
                    profile.address = sourceaddress.address;
                    profile.avatar = null;
                    profile.url = null;
                    profile.is_soft = false;

                    if ($.trim(profile.displayname) == '') {
                        profile.displayname = profile.address;
                        profile.is_soft = true;
                    }

                    if ($.trim(profile.address) != '')
                        profiles.push(profile);
                });

                callback(profiles);
            });
        },
        messages: function(callback) {
            if (config.lastmessage_at == null) {
                config.lastmessage_at = 0;
            }

            gslayer.db.messages(config.lastmessage_at, function(data) {
                var messages = [];

                function parseFolder(elem) {
                    if (elem.IsInbox)
                        return 10;

                    if (elem.IsOutbox || elem.IsSent)
                        return 20;

                    if (elem.IsDraft)
                        return 30;

                    if (elem.IsSpam)
                        return 40;

                    if (elem.IsTrash)
                        return 50;
                }

                $.each(data, function(i, elem) {
                    var message = j_message();

                    message.channel_id = config.id;
                    message.service_id = elem.ServerId;
                    message.source = 'gmail';
                    message.subject = elem.Subject;
                    message.preview = elem.SnippetHtml;
                    message.from = j_sourceAddress(elem.FromAddress).parse();
                    message.to = j_sourceAddressList(elem.ToAddresses);
                    message.cc = j_sourceAddressList(elem.CcAddresses);
                    message.bcc = j_sourceAddressList(elem.BccAddresses);
                    message.is_unread = elem.IsUnread;
                    message.folder = parseFolder(elem);
                    message.attachments = elem.NumberOfAttachments;
                    message.sort_date = elem.ReceivedDateMs / 1000;

                    messages.push(message);
                });

                callback(messages);
            });
        }
    }
};