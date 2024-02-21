// TODO : ajouter les controllers pour les initialisations

import db from "../database/db.js";

export const init = async (req, res) => {
    try {
        const jardin_remarquables = await fetch('https://www.karudata.com/api/explore/v2.1/catalog/datasets/liste-des-jardins-remarquables/records');
        const {results: data_jardin_remarquables} = await jardin_remarquables.json();

        const lieux_remarquables = await fetch('https://www.karudata.com/api/explore/v2.1/catalog/datasets/les-lieux-remarquables-de-la-guadeloupe/records');
        const {results: data_lieux_remarquables} = await lieux_remarquables.json();


        data_jardin_remarquables.forEach(async (jardin) => {

            const sql = `INSERT INTO markers (name, location, description, collection_id)
                         VALUES (?, ?, ?, 1)`;
            db.run(sql, [jardin.nom_du_jardin, jardin.adresse_complete, jardin.description], (err) => {
                if (err) {
                    return console.error(err.message);
                }
                console.log('Jaridn remarquable inséré');
            });
        });
        data_lieux_remarquables.forEach(async (lieu) => {
            const sql = `INSERT INTO markers (name, location, description, collection_id)
                         VALUES (?, ?, ?, 2)`;
            db.run(sql, [lieu.nom_produit, lieu.commune, lieu.commentaire_1], (err) => {
                if (err) {
                    return console.error(err.message);
                }
                console.log('Lieu remarquable inséré');
            });

        });

    } catch (e) {
        console.error(e);
        res.status(500).json({error: e.message});
        return;
    }

}