import sqlite3 from "sqlite3";
import path from "path"
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const db_file = path.resolve(__dirname, './spotshare.db')

const verbose = sqlite3.verbose()

let db = new verbose.Database(db_file, (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the SQLite database.');
});

let sqlCreateTableUsers = `CREATE TABLE IF NOT EXISTS users
                           (
                               id
                               INTEGER
                               PRIMARY
                               KEY,
                               full_name
                               TEXT
                               NOT
                               NULL,
                               mail
                               TEXT
                               NOT
                               NULL
                               UNIQUE,
                               password
                               TEXT
                               NOT
                               NULL
                           )`;

let sqlCreateTableCollections = `CREATE TABLE IF NOT EXISTS collections
(
    id
    INTEGER
    PRIMARY
    KEY,
    name
    TEXT
    NOT
    NULL,
    color
    TEXT,
    user_id
    INTEGER
    NOT
    NULL,
    visibility
    INTEGER
    NOT
    NULL,
    FOREIGN
    KEY
                                 (
    user_id
                                 ) REFERENCES users
                                 (
                                     id
                                 ),
    FOREIGN KEY
                                 (
                                     visibility
                                 ) REFERENCES visibility
                                 (
                                     id
                                 )
    )`;

let sqlCreateTableVisibility = `CREATE TABLE IF NOT EXISTS visibility
                                (
                                    id
                                    INTEGER
                                    PRIMARY
                                    KEY,
                                    name
                                    TEXT
                                    NOT
                                    NULL
                                )`;

let sqlCreateTableMarkers = `CREATE TABLE IF NOT EXISTS markers
(
    id
    INTEGER
    PRIMARY
    KEY,
    name
    TEXT
    NOT
    NULL,
    description
    TEXT,
    collection_id
    INTEGER
    NOT
    NULL,
    location
    TEXT
    NOT
    NULL,
    longitude TEXT NOT NULL,
  latitude TEXT NOT NULL,
    FOREIGN
    KEY
                             (
    collection_id
                             ) REFERENCES collections
                             (
                                 id
                             )
    )`;

let sqlCreateCollectionJardinRemarquable = `INSERT INTO collections (name, color, user_id, visibility)
                                            VALUES ('Jardins remarquables', 'green', 0, 1)`;

let sqlCreateCollectionLieuxRemarquables = `INSERT INTO collections (name, color, user_id, visibility)
                                            VALUES ('Lieux remarquables', 'blue', 0, 1)`;

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

    db.run(sqlCreateCollectionJardinRemarquable, (err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Collection Jardins remarquables created or already exists.');
    });

    db.run(sqlCreateCollectionLieuxRemarquables, (err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Collection Lieux remarquables created or already exists.');
    });
});

db.run(sqlCreateTableMarkers, (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Markers table created or already exists.');
});




