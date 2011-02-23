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
            resetWrapper();

            var query = 'select p.* from messages m, persons p where p.id = m.person_id and m.is_unread = 1';
            
            LocalDatabase.executeSql(query, function(persons) {
                var data = { groups: [
                    { title: 'Friends', people: persons },
                    { title: 'No relationship', people: []  }
                ]};

                $('#wrapper').html($.tmpl(dashboard_tpl, data));
				$('.search-field label').labelOver('labelover-apply');
            });
        },
        showPerson: function() {
            resetWrapper();
        }
    }
}();