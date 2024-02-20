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

export const getUser = (req, res) => {
    res.setHeader("Content-Type", "application/json");

    const query = "select * from 'users' where id = ?;";

    db.get(query, [req.params.id], (err, row) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            user: row
        });
    });
}

export const createUser = (req, res) => {
    res.setHeader("Content-Type", "application/json");

    const query = "insert into 'users' (full_name, mail, password) values (?, ?, ?);";
    db.run(query, [req.body.username, req.body.mail, req.body.password], function (err) {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            user: {
                id: this.lastID,
                username: req.body.username,
                mail: req.body.mail
            }
        });
    });
}

export const updateUser = (req, res) => {
    res.setHeader("Content-Type", "application/json");

    const query = "update 'users' set full_name = ?, mail = ?, password = ? where id = ?;";
    db.run(query, [req.body.username, req.body.mail, req.body.password, req.params.id], function (err) {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            user: {
                id: req.params.id,
                username: req.body.username,
                mail: req.body.mail
            }
        });
    });
}