import express from "express"

import {createUser, getUser, getUsers, updateUser} from "../controllers/users.controllers.js"

const usersRoutes = express.Router()

usersRoutes.route("")
    .get(getUsers)

usersRoutes.route("/:id")
    .get(getUser)

usersRoutes.route("").post(createUser)

usersRoutes.route("/:id").put(updateUser)

export default usersRoutes