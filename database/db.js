import sqlite3 from "sqlite3";
import path from "path"
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const db_file = path.resolve(__dirname, './spotshare.db')

const verbose = sqlite3.verbose()

const db = new verbose.Database(db_file, (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the in-memory SQLite database.');
});

export default db