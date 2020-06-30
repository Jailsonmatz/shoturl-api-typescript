"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var UsersController_1 = __importDefault(require("./controllers/UsersController"));
var UrlsController_1 = __importDefault(require("./controllers/UrlsController"));
var StatsController_1 = __importDefault(require("./controllers/StatsController"));
var routes = express_1.default.Router();
var usersController = new UsersController_1.default();
var urlsController = new UrlsController_1.default();
var statsController = new StatsController_1.default();
routes.get('/stats', statsController.index); // traz os status globais do sistema
routes.get('/users/:user_id/stats', statsController.userStats); // traz os status de um usuario
routes.get('/stats/:id', statsController.urlStats); // traz os status de uma url
routes.get('/:id', urlsController.index); // redireciona para o endereco original
routes.get('/urls/:id', urlsController.show); // redireciona para o endereco original (usando o id do banco)
routes.post('/users/:user_id/urls', urlsController.store); // cadastrar url
routes.delete('/urls/:id', urlsController.destroy); // apaga uma url
routes.post('/users', usersController.store); // criar novo usuario
routes.delete('/user/:user_id', usersController.destroy); // deletar usuario
exports.default = routes;
