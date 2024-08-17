/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = function (knex) {
    return knex('ingredients').insert([
        { name: 'sliced cheddar cheese' },
        { name: 'sliced bread' },
        { name: 'egg' },
        { name: 'onion' },
        { name: 'butter' },
        { name: 'mayo' },
        { name: 'spice mix' }
    ])
};
