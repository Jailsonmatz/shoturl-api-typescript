"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import config from '../../knexfile';
var config = require('../../knexfile');
var knex_1 = __importDefault(require("knex"));
var connection = knex_1.default(config.development);
exports.default = connection;
