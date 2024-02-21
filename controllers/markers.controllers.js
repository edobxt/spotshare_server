import db from "../database/db.js";

export const getAllMarkers = (req, res) => {
    res.setHeader('content-type', 'application/json');
    let sql = `SELECT * FROM markers where `;
    bd.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
}
export const getMarkersByVisibilityAndUserId = (req, res) => {
    res.setHeader('content-type', 'application/json');

    // Récupération de l'ID de l'utilisateur passé en paramètre
    const userId = req.params.userId; // Assurez-vous que l'ID de l'utilisateur est correctement extrait de la requête

    let sql = `
        SELECT markers.* FROM markers
        JOIN collections ON markers.collection_id = collections.id
        WHERE collections.visibility = 1 OR collections.user_id = ?
    `;

    db.all(sql, [userId], (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
};


export const getMarkerById = (req, res) => {
    res.setHeader('content-type', 'application/json');

    let sql = `SELECT *
               FROM markers
               where id = ?`;

    db.all(sql, [req.params.id], (err, rows) => {
        if (err) {
            throw err;
        }
        res.json({markers: rows});
    });
}

export const addMarker = (req, res) => {
    res.setHeader('content-type', 'application/json');
    const { name, description, collection_id, location } = req.body;
    let sql = `INSERT INTO markers (name, description, collection_id, location) VALUES (?, ?, ?, ?)`;
    db.run(sql, [name, description, collection_id, location], function(err) {
        if (err) {
            throw err;
        }
        res.json({ id: this.lastID });
    });
};

export const updateMarker = (req, res) => {
    res.setHeader('content-type', 'application/json');
    const { name, description, collection_id, location } = req.body;
    let id = req.params.id;
    let sql = `UPDATE markers SET name = ?, description = ?, collection_id = ?, location = ? WHERE id = ?`;
    db.run(sql, [name, description, collection_id, location, id], function(err) {
        if (err) {
            throw err;
        }
        res.json({ changes: this.changes });
    });
};

export const deleteMarker = (req, res) => {
    res.setHeader('content-type', 'application/json');
    let id = req.params.id;
    let sql = `DELETE FROM markers WHERE id = ?`;
    db.run(sql, [id], function(err) {
        if (err) {
            throw err;
        }
        res.json({ changes: this.changes });
    });
};


