var contactMatcher = function(persons, profile){

    return {
        match: function() {
            var found = null;
            var target_name = profile.displayname.toLowerCase();

            for (var i = 0; i < persons.length; i++) {
                var person = persons[i];
                var source_name = person.displayname.toLowerCase();

                if (source_name == target_name ||
                    source_name.replace(' ', '').indexOf(target_name) > -1) {

                    found = person;
                    break;
                }

                if (found != null) {
                    // Match found, check if profile needs updating
                }
                else {
                    // Match not found, try to match to profile address
                    
                }
            }
        }
    };
};