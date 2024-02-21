import express from "express";
import {init} from "../controllers/init.controllers.js";

const initRoutes = express.Router();

initRoutes.route("").get(init)

export default initRoutes;