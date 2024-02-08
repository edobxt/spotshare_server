// TODO : ajouter les routes des markers


import express from 'express';
import {getMarkers} from "../controllers/markers.controllers";

const markersRoute = express.Router();

markersRoute.route('').get(getMarkers);


export default listeRouter;