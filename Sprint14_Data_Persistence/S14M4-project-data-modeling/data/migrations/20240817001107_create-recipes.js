/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema
        .createTable('recipes', tbl => {
            tbl.increments('recipe_id')
            tbl.string('name')
                .unique()
                .notNullable()
            tbl.timestamp('created_at')
                .defaultTo(knex.fn.now())
        })
        .createTable('ingredients', tbl => {
            tbl.increments('ingredient_id')
            tbl.string('name')
                .notNullable()
        })
        .createTable('steps', tbl => {
            tbl.increments('step_id')
            tbl.integer('recipe_id')
                .unsigned()
                .notNullable()
                .references('recipe_id')
                .inTable('recipes')
                .onUpdate('CASCADE')
                .onDelete('CASCADE')
            tbl.integer('step_number')
                .unsigned()
                .notNullable()
            tbl.string('instructions')
                .notNullable()
        })
        .createTable('steps_ingredients', tbl => {
            tbl.integer('step_id')
                .unsigned()
                .notNullable()
                .references('step_id')
                .inTable('steps')
                .onUpdate('CASCADE')
                .onDelete('CASCADE')
            tbl.integer('ingredient_id')
                .unsigned()
                .notNullable()
                .references('ingredient_id')
                .inTable('ingredients')
                .onUpdate('CASCADE')
                .onDelete('CASCADE')
            tbl.decimal('quantity')
                .notNullable()
            tbl.primary(['step_id', 'ingredient_id'])
        })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists('steps_ingredients')
        .dropTableIfExists('steps')
        .dropTableIfExists('ingredients')
        .dropTableIfExists('recipes')
};
