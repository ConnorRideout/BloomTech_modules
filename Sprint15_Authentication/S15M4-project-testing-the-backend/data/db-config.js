const knex = require('knex')
const config = require('../knexfile')

const NODE_ENV = process.env.NODE_ENV || 'development'

module.exports = knex(config[NODE_ENV])