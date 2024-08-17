const Recipes = require('./recipes-model')

const response = (message, status = 400) => {
    return { status, message }
}

function checkValidId(req, res, next) {
    const { recipe_id } = req.params
    Recipes.getRecipeById(recipe_id)
        .then(recipe => {
            if (recipe) {
                req.recipe = recipe
                next()
            } else {
                next(response(`No recipe has the id ${recipe_id}`, 404))
            }
        })
        .catch(next)
}

module.exports = {
    checkValidId,
}