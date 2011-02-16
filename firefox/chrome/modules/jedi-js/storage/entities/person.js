var j_person = function() {
    return {
        id: null,
        displayname: null,
        first_name: null,
        last_name: null,
        avatar: null,
        icons: null,
        is_soft: true,
        created_at: null
    }
};

function j_name_parser(name) {
    var first_name = null;
    var last_name = null;
    var parsed = false;

    return {
        first_name: function() {
            if (!parsed) this.parse();

            return first_name;
        },
        last_name: function() {
            if (!parsed) this.parse();

            return last_name;
        },
        parse: function() {
            name = $.trim(name);

            if (name.indexOf(' ') < 0) {
                first_name = name.capitalize();
                return;
            }

            // Contains comma, such as in Sadiq, Waseem
            if (name.indexOf(',') > -1) {
                var commaSep = name.split(',').filter(function(e) {
                    return !(e == null || jQuery.trim(e) == '');
                });

                if (commaSep.length != 2) {
                    first_name = name.capitalize();
                    return;
                }

                first_name = commaSep[0].capitalize();
                last_name = commaSep[1].capitalize();
                return;
            }

            // No comma, split on space
            var parts = name.split(' ').filter(function(e) {
                return !(e == null || jQuery.trim(e) == '');
            });

            if (parts.length > 2) {
                // Something like [jean-luc jesuis] [leleur]
                for (var i = 0; i < parts.length - 1; i++)
                    first_name += parts[i] + ' ';

                first_name = $.trim(first_name).capitalize();
                last_name = parts[parts.length - 1].capitalize();
                return;
            }

            first_name = parts[0].capitalize();
            last_name = parts[1].capitalize();
        },
        toString: function() {
            if (!parsed) this.parse();

            return $.trim('{0} {1}'.format(first_name, last_name));
        }
    }
}