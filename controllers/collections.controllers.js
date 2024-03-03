import db from "../database/db.js";
import e from "express";

export const getAllCollections = (req, res) => {
    const sql = `SELECT * FROM collections`;
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
}

export const getCollectionById = (req, res) => {
    const sql = `SELECT * FROM collections WHERE id = ?`;
    db.get(sql, [req.params.id], (err, row) => {
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
            res.status(404).json({ message: "Collection introuvable" });
        }
    });
}

export const createCollection = (req, res) => {
    const { name,color, user_id,visibility } = req.body;
    const sql = `INSERT INTO collections (name,color, user_id,visibility) VALUES (?, ?, ?, ?)`;
    db.run(sql, [name,color, user_id,visibility], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: "Succès", id: this.lastID });
    });
}

export const updateCollection = (req, res) => {
    const { name, color} = req.body;
    const id = req.params.id;
    const sql = `UPDATE collections SET name = ?, color = ? WHERE id = ?`;
    db.run(sql, [name,color, id], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            throw err;
        }
        res.json({ message: "Succès", changes: this.changes });
    });
}

export const deleteCollection = (req, res) => {
    const id = req.params.id;
    const sql = `DELETE FROM collections WHERE id = ?`;
    db.run(sql, [id], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: "Succès", changes: this.changes });
    });
}

export const getCollectionMarkers = (req, res) => {
    const sql = `SELECT * FROM markers WHERE collection_id = ?`;
    db.all(sql, [req.params.id], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: "Succès",
            data: rows
        });
    });
}

export const getCollectionsByUserId = (req, res) => {
    const sql = `SELECT * FROM collections WHERE user_id = ?`;
    db.all(sql, [req.params.id], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: "Succès",
            data: rows
        });
    });
}
