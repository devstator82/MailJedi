var dashboard = function() {
    function resetWrapper() {
        $('body').remove('#people-view');
        $('body').append('<div id="wrapper" class="grid-container" style="display: block; background-color: rgb(255, 255, 255); border: 0pt none; margin: 0pt; padding: 0pt; overflow: hidden; width: 1227px; height: 750px; position: absolute; left: 185px; top: 102px;"></div>');
    }

    return {
        init: function() {
            var that = this;

            gslayer.ui.appendInboxNavigationItem('Use the force Luke', function() {
                that.showDashboard();
            });

            logger.log('Dashboard initialized');
        },
        showDashboard: function() {
            var that = this;
            resetWrapper();

            var query = 'select p.*, count(p.id) as message_count ' +
                    'from persons p, person_messages pm, messages m ' +
                    'where p.id = pm.person_id and m.id = pm.message_id ' +
                    'and m.folder = 10 ' +
                    'group by p.id ' +
                    'order by message_count desc, pm.sort_date desc ' +
                    'limit 100';

            var query = 'select p.* from persons p, profiles r where p.id = r.person_id and r.source = "facebook" limit 20';

            LocalDatabase.executeSql(query, function(persons) {
                $.each(persons, function(i, person) {
                    if (person.avatar == null) {
                        person.avatar = browser.resolveContent('jedi-js/images/no-avatar-70.png');
                    }
                });

                var data = { groups: [
                    { title: 'Friends', people: persons },
                    { title: 'No relationship', people: []  },
                    { title: 'Newsletters', people: []  }
                ]};

                $('#wrapper').html($.tmpl(dashboard_tpl, data));

                $('.search-field label').labelOver('labelover-apply');

                $('.person-link').click(function() {
                    that.showPerson($(this).attr('rel'));
                });
            });
        },
        showPerson: function(id) {
            resetWrapper();
        }
    }
}();