j_sourceAddress = function(rawAddress) {
    return {
        displayname: null,
        address: null,

        parse: function() {
            rawAddress = $.trim(rawAddress);

            // todo implement extendedPart when we start dealing with status updates

            if (rawAddress.indexOf('<') > -1 && rawAddress.indexOf('>') > -1) {

                var parts = rawAddress.split(/<|>/).filter(function(e) {
                    return !(e == null || jQuery.trim(e) == '');
                });

                if (parts.length == 1) {
                    this.displayname = this.address = $.trim(parts[0].unquote());
                }
                else if (parts.length == 2) {
                    this.displayname = $.trim(parts[0].unquote());
                    this.address = $.trim(parts[1].unquote());
                }
            }
            else {
                this.displayname = rawAddress;
                this.address = rawAddress;
            }

            if (this.address == null)
                this.address = rawAddress;

            return this;
        },
        toString: function() {
            // todo implement renderProperties when we start dealing with status updates

            if (this.displayname != null && $.trim(this.displayname) != ''
                && this.displayname != this.address) {
                    return '{0} <{1}>'.format(this.displayname, this.address);
            }

            return $.trim(this.address);
        }
    }
};

j_sourceAddressList = function(list) {
    var parts = list.split(',');
    var result = [];
    
    $.each(parts, function(i, rawAddress) {
        var address = j_sourceAddress($.trim(rawAddress));
        address.parse();

        result.push(address);
    });

    return result;
};

j_sourceAddressListString = function(list) {
    var arr = [];

    for (var i = 0; i < list.length; i++) {
        arr.push(list[i].toString());
    }

    return arr.join(',');
};