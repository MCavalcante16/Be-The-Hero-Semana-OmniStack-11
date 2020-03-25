const express = require('express');
const routes = express.Router();
const ongController = require('./controllers/OngController')
const incidentController = require('./controllers/IncidentController')
const ProfileController = require('./controllers/ProfileController');
const sessionController = require('./controllers/SessionController');

//Conexão com o bando de dados
const connection = require('./database/connection')


routes.post('/sessions', sessionController.create);

//Listar Ongs
routes.get('/ongs', ongController.index);
//Cadastrar Ong
routes.post('/ongs', ongController.create);


//Listar Incidentes
routes.get('/incidents', incidentController.index);
//Cadastrar Incidente
routes.post('/incidents', incidentController.create);
//Deletar Incidente
routes.delete('/incidents/:id', incidentController.delete);


//Listar Incidentes de uma Ong Especifica
routes.get('/profile', ProfileController.index);



module.exports = routes;