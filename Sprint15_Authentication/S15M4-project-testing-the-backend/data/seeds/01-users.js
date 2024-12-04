const bcrypt = require('bcryptjs')

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = function (knex) {
    return knex('users').truncate()
        .then(() => {
            return knex('users').insert([
                { username: 'Billybob', password: bcrypt.hashSync('password123'), account_type: 'admin' },
                { username: 'Jeff', password: bcrypt.hashSync('secret321'), account_type: 'user' }
            ])
        })
};
