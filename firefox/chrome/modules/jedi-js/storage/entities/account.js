var j_account = function() {
    return {
        id: null,
        email: null,
        isAppsUser: null,
        url: null,
        lastsync_at: null,
        created_at: null
    }
};

var j_ensure_account = function() {    
    var email = gslayer.state.emailAddress();
    var isAppsUser = gslayer.state.isAppsUser();
    var baseUrl = gslayer.state.getBaseUrl();

    LocalDatabase.executeSql('select count(*) from accounts where email = ?', [ email ], function(rs) {
        if (rs[0] == 0) {
            var insert_query = 'insert into accounts (email, isAppsUser, url, created_at) values (?, ?, ?, ?)';

            LocalDatabase.executeSql(insert_query, [ email, isAppsUser, baseUrl, new Date().to_unixtime() ]);
        }
    });
};