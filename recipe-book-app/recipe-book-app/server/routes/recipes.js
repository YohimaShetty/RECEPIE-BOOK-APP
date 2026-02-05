const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');
const auth = require('../middleware/auth');

// All routes are protected (require authentication)

// @route   GET /api/recipes
// @desc    Get all recipes for user
// @access  Private
router.get('/', auth, recipeController.getAllRecipes);

// @route   GET /api/recipes/:id
// @desc    Get single recipe
// @access  Private
router.get('/:id', auth, recipeController.getRecipeById);

// @route   POST /api/recipes
// @desc    Create new recipe
// @access  Private
router.post('/', auth, recipeController.createRecipe);

// @route   PUT /api/recipes/:id
// @desc    Update recipe
// @access  Private
router.put('/:id', auth, recipeController.updateRecipe);

// @route   DELETE /api/recipes/:id
// @desc    Delete recipe
// @access  Private
router.delete('/:id', auth, recipeController.deleteRecipe);

// @route   PATCH /api/recipes/:id/favorite
// @desc    Toggle favorite status
// @access  Private
router.patch('/:id/favorite', auth, recipeController.toggleFavorite);

module.exports = router;
