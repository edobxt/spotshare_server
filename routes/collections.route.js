
import express from "express";


const collectionsRoute = express.Router();


collectionsRoute.route('')

collectionsRoute.route('/:id')

collectionsRoute.route('/:id/markers')
export default collectionsRoute;