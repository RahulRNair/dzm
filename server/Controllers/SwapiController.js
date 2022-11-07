const axios = require('axios');
const createError = require('http-errors');
const API_SERVER = "https://swapi.dev/api/";

module.exports = {
    getAllPeoples: async (req, res, next) => {
        axios.get(API_SERVER + 'people')
        .then(response => {
          res.send(response.data);
        })
        .catch(error => {
            next(error);
        });
    },
    getAllPlanets: async (req, res, next) => {
        axios.get(API_SERVER + 'planets')
        .then(response => {
          res.send(response.data);
        })
        .catch(error => {
            next(error);
        });
    },
    getAllStarships: async (req, res, next) => {
        axios.get(API_SERVER + 'starships')
        .then(response => {
          res.send(response.data);
        })
        .catch(error => {
            next(error);
        });
    },
    findPeopleById: async (req, res, next) => {
        const id = req.params.id;
        axios.get(API_SERVER + 'people/'+ id)
        .then(response => {
          res.send(response.data);
        })
        .catch(error => {
            next(error);
        });
    },
    findPlanetById: async (req, res, next) => {
        const id = req.params.id;
        axios.get(API_SERVER + 'planets/'+ id)
        .then(response => {
          res.send(response.data);
        })
        .catch(error => {
            next(error);
        });
    },
    findStarshipById: async (req, res, next) => {
        const id = req.params.id;
        axios.get(API_SERVER + 'starships/'+ id)
        .then(response => {
          res.send(response.data);
        })
        .catch(error => {
            next(error);
        });
    },

}