// TODO : ajouter les routes des utilisateurs
import express from "express"

import {
    getUsers
} from "../controllers/users.controllers.js"

const usersRoutes = express.Router()

usersRoutes.route("")
    .get(getUsers)



export default usersRoutes