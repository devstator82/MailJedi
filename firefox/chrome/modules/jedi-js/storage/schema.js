var create_channels_sql = 
    'CREATE TABLE IF NOT EXISTS channels (' +
        'id INTEGER PRIMARY KEY AUTOINCREMENT, ' +
        'service_id TEXT, ' +
        'source TEXT, ' +
        'username TEXT, ' +
        'auth_token TEXT, ' +
        'lastsync_at INTEGER, ' +
        'created_at INTEGER);';

var create_accounts_sql =
    'CREATE TABLE IF NOT EXISTS accounts (' +
        'id INTEGER PRIMARY KEY AUTOINCREMENT, ' +
        'email TEXT, ' +
        'isAppsUser INTEGER, ' +
        'url TEXT, ' +
        'lastsync_at INTEGER, ' +
        'created_at INTEGER);';

var create_profiles_sql =
    'CREATE TABLE IF NOT EXISTS profiles (' +
        'id INTEGER PRIMARY KEY AUTOINCREMENT, ' +
        'service_id TEXT, ' +
        'source TEXT, ' +
        'channel_id INTEGER, ' +
        'displayname TEXT, ' +
        'first_name TEXT, ' +
        'last_name TEXT, ' +
        'avatar TEXT, ' +
        'url TEXT, ' +
        'created_at INTEGER);';

var create_persons_sql =
    'CREATE TABLE IF NOT EXISTS persons (' +
        'id INTEGER PRIMARY KEY AUTOINCREMENT, ' +
        'redirect_id INTEGER, ' +
        'service_id TEXT, ' +
        'source TEXT, ' +
        'channel_id INTEGER, ' +
        'displayname TEXT, ' +
        'first_name TEXT, ' +
        'last_name TEXT, ' +
        'avatar TEXT);' +
        'created_at INTEGER);';

var create_messages_sql =
    'CREATE TABLE IF NOT EXISTS messages (' +
        'id INTEGER PRIMARY KEY AUTOINCREMENT, ' +
        'created_at INTEGER);';

var create_documents_sql =
    'CREATE TABLE IF NOT EXISTS documents (' +
        'id INTEGER PRIMARY KEY AUTOINCREMENT, ' +
        'created_at INTEGER);';