import express from "express"
import cors from "cors"

import usersRoutes from "./routes/users.route.js"
import initRoutes from "./routes/init.route.js";
import markersRoute from "./routes/markers.route.js";
import collectionsRoute from "./routes/collections.route.js";
import {generateRoutesHtml, listAllRoutes} from "./controllers/home.controllers.js";

const app = express()
const port = 3300

app.use(express.json())
app.use(cors({
    origin: '*'
}))

app.get("/", (req, res) => {
    res.send(generateRoutesHtml(app));

})

app.use("/users", usersRoutes)

app.use("/init", initRoutes)

app.use("/markers", markersRoute)

app.use("/collections", collectionsRoute)


app.listen(port, () => {
    console.log(`API SpotShare lancé sur le port ${port}.`)
})