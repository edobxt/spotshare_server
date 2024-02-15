// TODO : ajouter les controllers des utilisateurs
import db from "../database/db.js"

export const getUsers = (req, res) => {
    res.setHeader("Content-Type", "application/json");

    const query = "select * from 'users';";

    db.all(query, [], (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: err.message });
            return;
        }

        res.json({
            users: rows
        });
    });
};