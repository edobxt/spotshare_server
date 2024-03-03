import db from "../database/db.js";
import fetch from 'node-fetch'; // Assurez-vous d'importer fetch si vous utilisez Node.js

export const init = async (req, res) => {
    try {
        let sqlCreateCollectionJardinRemarquable = `INSERT INTO collections (name, color, user_id, visibility)
                                            VALUES ('Jardins remarquables', 'green', 0, 1)`;

        let sqlCreateCollectionLieuxRemarquables = `INSERT INTO collections (name, color, user_id, visibility)
                                            VALUES ('Lieux remarquables', 'blue', 0, 1)`;
        // Vérifiez d'abord si les collections existent et les insérez si nécessaire
        const collections = await new Promise((resolve, reject) => {
            db.all(`SELECT name FROM collections`, [], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });

        const collectionNames = collections.map(c => c.name);
        if (!collectionNames.includes('Jardins remarquables')) {
            db.run(sqlCreateCollectionJardinRemarquable);
        }
        if (!collectionNames.includes('Lieux remarquables')) {
            db.run(sqlCreateCollectionLieuxRemarquables);
        }

        const jardin_remarquables = await fetch('https://www.karudata.com/api/explore/v2.1/catalog/datasets/liste-des-jardins-remarquables/records');
        const { results: data_jardin_remarquables } = await jardin_remarquables.json();

        const lieux_remarquables = await fetch('https://www.karudata.com/api/explore/v2.1/catalog/datasets/les-lieux-remarquables-de-la-guadeloupe/records');
        const { results: data_lieux_remarquables } = await lieux_remarquables.json();

        // Utilisez Promise.all pour gérer les insertions asynchrones
        await Promise.all([
            ...data_jardin_remarquables.map(jardin => new Promise((resolve, reject) => {
                if (jardin.description && jardin.nom_du_jardin && jardin.adresse_complete && jardin.longitude && jardin.latitude) {
                    const sql = `INSERT INTO markers (name, location, description, longitude, latitude, collection_id)
                                 VALUES (?, ?, ?, ?, ?, 1)`;
                    db.run(sql, [jardin.nom_du_jardin, jardin.adresse_complete, jardin.description, jardin.longitude, jardin.latitude], (err) => {
                        if (err) {
                            reject(err);
                        }
                        resolve('Jardin remarquable inséré');
                    });
                } else {
                    resolve('Un ou plusieurs champs requis sont vides pour un jardin remarquable.');
                }
            })),
            ...data_lieux_remarquables.map(lieu => new Promise((resolve, reject) => {
                if (lieu.commentaire_1 && lieu.nom_produit && lieu.commune && lieu.longitude && lieu.latitude) {
                    const sql = `INSERT INTO markers (name, location, description, longitude, latitude, collection_id)
                                 VALUES (?, ?, ?, ?, ?, 2)`;
                    db.run(sql, [lieu.nom_produit, lieu.commune, lieu.commentaire_1, lieu.longitude, lieu.latitude], (err) => {
                        if (err) {
                            reject(err);
                        }
                        resolve('Lieu remarquable inséré');
                    });
                } else {
                    resolve('Un ou plusieurs champs requis sont vides pour un lieu remarquable.');
                }
            }))
        ]);

        res.status(200).json({ message: 'Initialisation réussie' });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: e.message });
    }
}
