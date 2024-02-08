const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('spotshare.db', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the SQLite database.');
});

let sqlCreateTableUsers = `CREATE TABLE IF NOT EXISTS users
                           (
                               id        INTEGER PRIMARY KEY,
                               full_name TEXT NOT NULL,
                               mail      TEXT NOT NULL UNIQUE,
                               password  TEXT NOT NULL
                           )`;

let sqlCreateTableCollections = `CREATE TABLE IF NOT EXISTS collections
(
    id         INTEGER PRIMARY KEY,
    name       TEXT    NOT NULL,
    color      TEXT,
    user_id    INTEGER NOT NULL,
    visibility INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (visibility) REFERENCES visibility (id)
    )`;

let sqlCreateTableVisibility = `CREATE TABLE IF NOT EXISTS visibility
                                (
                                    id   INTEGER PRIMARY KEY,
                                    name TEXT NOT NULL
                                )`;

let sqlCreateTableMarkers = `CREATE TABLE IF NOT EXISTS markers
(
    id            INTEGER PRIMARY KEY,
    name          TEXT    NOT NULL,
    description   TEXT,
    collection_id INTEGER NOT NULL,
    location      TEXT    NOT NULL,
    FOREIGN KEY (collection_id) REFERENCES collections (id)
    )`;

// Run the SQL queries to create tables
db.run(sqlCreateTableUsers, (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Users table created or already exists.');
});

db.run(sqlCreateTableVisibility, (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Visibility table created or already exists.');
});

db.run(sqlCreateTableCollections, (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Collections table created or already exists.');
});

db.run(sqlCreateTableMarkers, (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Markers table created or already exists.');
});

// Close the database connection

