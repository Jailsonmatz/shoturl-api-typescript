// import config from '../../knexfile';
const config = require('../../knexfile');

import knex from 'knex';

const connection = knex(config.development);

export default connection;