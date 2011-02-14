var create_channels_sql = 
    'CREATE TABLE IF NOT EXISTS channels (' +
    'channel_id INTEGER PRIMARY KEY AUTOINCREMENT, ' +
    'source TEXT, ' +
    'username TEXT, ' +
    'auth_token TEXT, ' +
    'lastsync_at INTEGER, ' +
    'created_at INTEGER);';