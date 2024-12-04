/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = function (knex) {
    return knex('steps').insert([
        { recipe_id: 1, step_number: 1, instructions: 'preheat a pan over medium heat' },
        { recipe_id: 1, step_number: 2, instructions: 'on each of 2 slices of bread, butter one side with about 1 Tbl of butter' },
        { recipe_id: 1, step_number: 3, instructions: 'place the first slice of bread on a plate, butter-side down. Top with 3 slices of cheese. Season with 1 tsp spice mix, then top with the second slice of bread, butter side up' },
        { recipe_id: 1, step_number: 4, instructions: 'place bread in pan, add a splash of water to the bottom of the pan, then cover. Allow to brown, about 3 minutes. Remove lid then flip and brown the second side, uncovered' },
        { recipe_id: 1, step_number: 5, instructions: 'remove from heat to a plate, serve with tomato soup, and enjoy!' },
        { recipe_id: 2, step_number: 1, instructions: 'preheat a pan over medium heat. Julien 1 onion. Melt a Tbl of butter in the pan. Sautee the onions until browned. Remove and set aside' },
        { recipe_id: 2, step_number: 2, instructions: 'place 2 slices of bread in a toaster and start toasting' },
        { recipe_id: 2, step_number: 3, instructions: 'melt another tsp of butter in the pan. Crack in 2 eggs and sprinkle 1 tsp of spice mix over top. Flip after 2 minutes, top with 2 slices of cheese, cover, and remove from heat' },
        { recipe_id: 2, step_number: 4, instructions: 'the toast should be done. Spread 1 Tbl of mayo on one of the pieces. Top with your fried egg, topped with the onion, and lastly the second piece of toast' },
        { recipe_id: 2, step_number: 5, instructions: 'slice in half and serve with corn chips and a cup of milk. Enjoy!' }
    ])
};
