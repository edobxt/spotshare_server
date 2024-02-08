import {app} from "./app";

let sql;
app.get('/markers', (req, res) => {
    sql = "SELECT * FROM markers";
    try {
        console.log(req.body.movie);

        return res.json({
            status: 200,
            success: true,
        });
    } catch (e) {
        console.log(e)
        return res.json({
            status: 400,
            success: false,
        });

    }
})

app.post('/markers', (req, res) => {
    try {


    } catch (e) {

        return res.json({
            status: 400,
            success: false,
        });

    }
})