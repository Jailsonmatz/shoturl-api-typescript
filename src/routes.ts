import express from 'express';

import UsersController from './controllers/UsersController';
import UrlsController from './controllers/UrlsController';
import StatsController from './controllers/StatsController';

const routes = express.Router();

const usersController = new UsersController();
const urlsController = new UrlsController();
const statsController = new StatsController();

routes.get('/stats', statsController.index); // traz os status globais do sistema
routes.get('/users/:user_id/stats', statsController.userStats ); // traz os status de um usuario
routes.get('/stats/:id', statsController.urlStats ); // traz os status de uma url

routes.get('/:id', urlsController.index); // redireciona para o endereco original
routes.get('/urls/:id', urlsController.show); // redireciona para o endereco original (usando o id do banco)
routes.post('/users/:user_id/urls', urlsController.store); // cadastrar url
routes.delete('/urls/:id', urlsController.destroy); // apaga uma url

routes.post('/users', usersController.store); // criar novo usuario
routes.delete('/user/:user_id', usersController.destroy); // deletar usuario

export default routes;