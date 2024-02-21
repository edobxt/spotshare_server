import express from "express"
import cors from "cors"

import usersRoutes from "./routes/users.route.js"
import initRoutes from "./routes/init.route.js";

const app = express()
const port = 3300

app.use(express.json())
app.use(cors({
    origin: '*'
}))

app.get("/", (req, res) => {
    res.send("Bienvenue sur l'API SpotShare.")
})

app.use("/users", usersRoutes)

app.use("/init", initRoutes)

app.listen(port, () => {
    console.log(`API SpotShare lancé sur le port ${port}.`)
})