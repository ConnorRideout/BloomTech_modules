/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = function (knex) {
    return knex('recipes').insert([
        { name: 'Fried Egg Sandwich' },
        { name: 'Grilled Cheese' }
    ])
};
