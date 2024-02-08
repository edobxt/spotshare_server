import bd from '../controllers/db.js';
// TODO : ajouter les controllers des markers
export const getMarkers = (req, res) => {
    res.setHeader('content-type', 'application/json');
    let sql = `SELECT *
               FROM markers`;
    bd.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
}

