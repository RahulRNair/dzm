const express = require('express');
const router = express.Router();

const SwapiController = require('../Controllers/SwapiController');

//Get a list of all people from star war api
router.get('/peoples', SwapiController.getAllPeoples);

//Get a list of all planets from star war api
router.get('/planets', SwapiController.getAllPlanets);

//Get a list of all star ships from star war api
router.get('/starships', SwapiController.getAllStarships);

//Get a peoples by id
router.get('/peoples/:id', SwapiController.findPeopleById);

//Get a planet by id
router.get('/planets/:id', SwapiController.findPlanetById);

//Get a star ship by id
router.get('/starships/:id', SwapiController.findStarshipById);

module.exports = router;