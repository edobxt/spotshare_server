
import express from "express";
import {
    addMarker, deleteMarker,
    getAllMarkers,
    getMarkerById,
    getMarkersByVisibilityAndUserId,
    updateMarker
} from "../controllers/markers.controllers.js";


const markersRoute = express.Router();

markersRoute.route('').get(getMarkersByVisibilityAndUserId);

markersRoute.route('/:id').get(getMarkerById);

markersRoute.route('/all').get(getAllMarkers);

markersRoute.route('/').post(addMarker);

markersRoute.route('/').put(updateMarker);

markersRoute.route('/:id').delete(deleteMarker);


export default markersRoute;