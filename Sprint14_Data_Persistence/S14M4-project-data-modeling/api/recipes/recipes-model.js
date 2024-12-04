const db = require('../../data/db-config')

function getRecipeById(recipe_id) {
    /*
    SELECT
        r.recipe_id,
        r.name as recipe_name,
        r.created_at,
        s.step_id,
        s.step_number,
        s.instructions as step_instructions,
        i.ingredient_id,
        i.name as ingredient_name,
        j.quantity
    FROM steps as s
    LEFT JOIN steps_ingredients as j
        ON j.step_id = s.step_id
    LEFT JOIN ingredients as i
        ON j.ingredient_id = i.ingredient_id
    JOIN recipes as r
        ON s.recipe_id = r.recipe_id
    WHERE r.recipe_id = 1
     */
    return db('steps as s')
        .leftJoin('steps_ingredients as j', 'j.step_id', 's.step_id')
        .leftJoin('ingredients as i', 'j.ingredient_id', 'i.ingredient_id')
        .join('recipes as r', 's.recipe_id', 'r.recipe_id')
        .select(
            'r.recipe_id',
            'r.name as recipe_name',
            'r.created_at',
            's.step_id',
            's.step_number',
            's.instructions as step_instructions',
            'i.ingredient_id',
            'i.name as ingredient_name',
            'j.quantity'
        )
        .where({ 'r.recipe_id': recipe_id })
        .then(res => {
            const steps = res.reduce((acc, rec) => {
                const { step_id, step_number, step_instructions } = rec
                if (!acc.find(r => r.step_id == step_id)) acc.push({ step_id, step_number, step_instructions, ingredients: [] })
                return acc
            }, [])
            return res.reduce((acc, rec) => {
                const { step_number, ingredient_id, ingredient_name, quantity } = rec
                if (ingredient_id) {
                    let newSteps = acc.steps.filter(s => {
                        if (s.step_number == step_number) {
                            s.ingredients.push({ ingredient_id, ingredient_name, quantity })
                        }
                        return s
                    })
                    acc.steps = newSteps
                }
                return acc
            }, {
                recipe_id: res[0].recipe_id,
                recipe_name: res[0].recipe_name,
                created_at: res[0].created_at,
                steps
            })
        })
}

module.exports = {
    getRecipeById,
}