const express = require('express');
const routes = express.Router();
const ongController = require('./controllers/OngController')
const incidentController = require('./controllers/IncidentController')
const ProfileController = require('./controllers/ProfileController');
const sessionController = require('./controllers/SessionController');


//Validação
const { celebrate/*container de validacoes*/, Segments/*Tipos de validacoes*/, Joi/*Validacoes*/} = require('celebrate');

//Conexão com o bando de dados
const connection = require('./database/connection')


routes.post('/sessions', sessionController.create);

//Listar Ongs
routes.get('/ongs', ongController.index);
//Cadastrar Ong
routes.post('/ongs', celebrate({
    //Valida os dados do tipo BODY da requisição
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().length(2),
    })
}), ongController.create);


//Listar Incidentes
routes.get('/incidents', celebrate({
    //Valida dados a partir dos QUERY da requisição
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    }),
}), incidentController.index);
//Cadastrar Incidente
routes.post('/incidents', celebrate({
    [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required(),
        value: Joi.number().required(),
    }),
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown(),
}), incidentController.create);
//Deletar Incidente
routes.delete('/incidents/:id', celebrate({
    //Valida dados do tipo PARAMS
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    })
}), incidentController.delete);


//Listar Incidentes de uma Ong Especifica
routes.get('/profile', celebrate({
    //Valida dados do tipo HEADER
    //Nesse caso, como varios headers sao passados e eu nao tenho conhecimento
    //de todas variáveis de header, se faz a verificação dentro de object e se
    //o .unknown.
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
}), ProfileController.index);



module.exports = routes;