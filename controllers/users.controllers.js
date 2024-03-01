// TODO : ajouter les controllers des utilisateurs
import db from "../database/db.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = 'project_web_services_spotshare_jwt_secret_key';

export const getAllUsers = (req, res) => {
    const sql = `SELECT id, full_name, mail FROM users`;
    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: "Succès",
            data: rows
        });
    });
};

export const getUserById = (req, res) => {
    const id = req.params.id;
    const sql = `SELECT id, full_name, mail FROM users WHERE id = ?`;
    db.get(sql, [id], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (row) {
            res.json({
                message: "Succès",
                data: row
            });
        } else {
            res.status(404).json({ message: "Utilisateur introuvable" });
        }
    });
};

export const createUser = async (req, res) => {
    const { full_name, mail, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const sqlCheckEmail = `SELECT * FROM users WHERE mail = ?`;
    db.get(sqlCheckEmail, [mail], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (row) {
            res.status(409).json({ message: "Un compte avec cette email existe déja" });
            return;
        }

        const sqlInsert = `INSERT INTO users (full_name, mail, password) VALUES (?, ?, ?)`;
        db.run(sqlInsert, [full_name, mail, hashedPassword], function(err) {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            const user = { id: this.lastID, full_name, mail };
            const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
            res.json({ user, token });
        });
    });
};

export const loginUser = (req, res) => {
    const { mail, password } = req.body;
    
    const sql = `SELECT * FROM users WHERE mail = ?`;
    db.get(sql, [mail], async (err, user) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        console.log(user)
        if (!user) {
            res.status(404).json({ message: "Utilisateur introuvable" });
            return;
        }

        const passwordIsValid = await bcrypt.compare(password, user.password);
        if (!passwordIsValid) {
            res.status(401).json({ message: "Mots de passe incorrect" });
            return;
        }

        const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ user: { id: user.id, full_name: user.full_name, mail: user.mail }, token });
    });
};



export const updateUser = (req, res) => {
    const { full_name, mail, password } = req.body;
    const id = req.params.id;
    const sql = `UPDATE users SET full_name = ?, mail = ?, password = ? WHERE id = ?`;
    db.run(sql, [full_name, mail, password, id], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: "Succès", changes: this.changes });
    });
};

export const deleteUser = (req, res) => {
    const id = req.params.id;
    const sql = `DELETE FROM users WHERE id = ?`;
    db.run(sql, [id], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: "Utilisateur supprimés", changes: this.changes });
    });
};
