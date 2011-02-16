var create_channels_sql = 
    'CREATE TABLE IF NOT EXISTS channels (' +
        'id INTEGER PRIMARY KEY AUTOINCREMENT, ' +
        'service_id TEXT, ' +
        'source TEXT, ' +
        'username TEXT, ' +
        'auth_token TEXT, ' +
        'url TEXT, ' +
        'type INTEGER, ' +
        'lastsync_at INTEGER, ' +
        'created_at INTEGER);';

var create_profiles_sql =
    'CREATE TABLE IF NOT EXISTS profiles (' +
        'id INTEGER PRIMARY KEY AUTOINCREMENT, ' +
        'service_id TEXT, ' +
        'person_id NULL, ' +
        'source TEXT, ' +
        'channel_id INTEGER, ' +
        'displayname TEXT, ' +
        'first_name TEXT, ' +
        'last_name TEXT, ' +
        'address TEXT, ' +
        'avatar TEXT, ' +
        'url TEXT, ' +
        'is_soft INTEGER, ' +
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
        'avatar TEXT, ' +
        'icons TEXT, ' +
        'is_soft INTEGER, ' +
        'created_at INTEGER);';

var create_messages_sql =
    'CREATE TABLE IF NOT EXISTS messages (' +
        'id INTEGER PRIMARY KEY AUTOINCREMENT, ' +
        'created_at INTEGER);';

var create_documents_sql =
    'CREATE TABLE IF NOT EXISTS documents (' +
        'id INTEGER PRIMARY KEY AUTOINCREMENT, ' +
        'created_at INTEGER);';