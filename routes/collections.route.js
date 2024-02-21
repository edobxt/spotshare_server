
import express from "express";
import {
    createCollection,
    deleteCollection,
    getAllCollections,
    getCollectionById, getCollectionMarkers,
    updateCollection
} from "../controllers/collections.controllers.js";


const collectionsRoute = express.Router();


collectionsRoute.route('').get(getAllCollections);

collectionsRoute.route('/:id').get(getCollectionById);

collectionsRoute.route('/:id').put(updateCollection);

collectionsRoute.route('/:id').delete(deleteCollection);

collectionsRoute.route('').post(createCollection);

collectionsRoute.route('/:id/markers').get(getCollectionMarkers);

collectionsRoute.route('/:id/markers')

export default collectionsRoute;