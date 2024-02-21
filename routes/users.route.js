import express from "express"

import {
    createUser,
    deleteUser,
    getAllUsers,
    getUserById,
    loginUser,
    updateUser
} from "../controllers/users.controllers.js"

const usersRoutes = express.Router()

usersRoutes.route("")
    .get(getAllUsers)

usersRoutes.route("/:id")
    .get(getUserById)

usersRoutes.route("/signup").post(createUser)

usersRoutes.route("/login").post(loginUser)

usersRoutes.route("/:id").put(updateUser)

usersRoutes.route("delete/:id").delete(deleteUser)

export default usersRoutes