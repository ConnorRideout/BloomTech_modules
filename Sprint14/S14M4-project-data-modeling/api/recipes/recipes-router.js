const router = require('express').Router()
const Recipes = require('./recipes-model')
const {
    checkValidId,
} = require('./recipes-middleware')

router.get('/:recipe_id', checkValidId, (req, res, next) => {
    res.status(200).json(req.recipe)
})

router.use((err, req, res, next) => {
    const { status, message } = err
    res.status(status || 500).json({ message })
})

module.exports = router