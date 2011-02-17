j_sourceAddress = function(rawAddress) {
    var displayname = null;
    var address = null;

    return {
        displayname: function() {
            return displayname;
        },
        address: function() {
            return address;
        },
        parse: function() {
            rawAddress = $.trim(rawAddress);

            // todo implement extendedPart when we start dealing with status updates

            if (rawAddress.indexOf('<') > -1 && rawAddress.indexOf('>') > -1) {

                var parts = rawAddress.split(/<|>/).filter(function(e) {
                    return !(e == null || jQuery.trim(e) == '');
                });

                if (parts.length == 1) {
                    displayname = address = $.trim(parts[0].unquote());
                }
                else if (parts.length == 2) {
                    displayname = $.trim(parts[0].unquote());
                    address = $.trim(parts[1].unquote());
                }
            }
            else {
                displayname = rawAddress;
                address = rawAddress;
            }

            if (address == null)
                address = rawAddress;
        },
        toString: function() {
            // todo implement renderProperties when we start dealing with status updates

            if (displayname != null && $.trim(displayname) != '' && displayname != address) {
                return '{0} <{1}>'.format(displayname, address);
            }

            return address;
        }
    }
};