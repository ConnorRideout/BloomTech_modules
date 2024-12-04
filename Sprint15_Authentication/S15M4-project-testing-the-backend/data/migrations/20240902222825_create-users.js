/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('users', tbl => {
        tbl.increments('user_id')
        tbl.string('username')
            .unique()
            .notNullable()
        tbl.string('password')
            .notNullable()
        tbl.string('account_type')
            .defaultTo('user')
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('users')
};
