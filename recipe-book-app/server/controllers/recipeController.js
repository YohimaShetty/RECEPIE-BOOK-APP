const db = require('../config/database');

// Get all recipes for logged-in user
exports.getAllRecipes = (req, res) => {
  const userId = req.user.id;
  const { category, search } = req.query;

  let query = 'SELECT * FROM recipes WHERE user_id = ?';
  let params = [userId];

  if (category) {
    query += ' AND category = ?';
    params.push(category);
  }

  if (search) {
    query += ' AND title LIKE ?';
    params.push(`%${search}%`);
  }

  query += ' ORDER BY created_at DESC';

  db.all(query, params, (err, recipes) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching recipes' });
    }

    // Parse ingredients (stored as JSON string)
    const parsedRecipes = recipes.map(recipe => ({
      ...recipe,
      ingredients: JSON.parse(recipe.ingredients || '[]')
    }));

    res.json(parsedRecipes);
  });
};

// Get single recipe
exports.getRecipeById = (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  db.get(
    'SELECT * FROM recipes WHERE id = ? AND user_id = ?',
    [id, userId],
    (err, recipe) => {
      if (err) {
        return res.status(500).json({ message: 'Error fetching recipe' });
      }

      if (!recipe) {
        return res.status(404).json({ message: 'Recipe not found' });
      }

      // Parse ingredients
      recipe.ingredients = JSON.parse(recipe.ingredients || '[]');

      res.json(recipe);
    }
  );
};

// Create new recipe
exports.createRecipe = (req, res) => {
  const userId = req.user.id;
  const {
    title,
    description,
    ingredients,
    instructions,
    prep_time,
    cook_time,
    servings,
    category,
    image_url
  } = req.body;

  // Validation
  if (!title || !ingredients || !instructions) {
    return res.status(400).json({ message: 'Please provide title, ingredients, and instructions' });
  }

  // Convert ingredients array to JSON string
  const ingredientsJson = JSON.stringify(ingredients);

  db.run(
    `INSERT INTO recipes 
    (user_id, title, description, ingredients, instructions, prep_time, cook_time, servings, category, image_url) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [userId, title, description, ingredientsJson, instructions, prep_time, cook_time, servings, category, image_url],
    function(err) {
      if (err) {
        return res.status(500).json({ message: 'Error creating recipe' });
      }

      res.status(201).json({
        id: this.lastID,
        user_id: userId,
        title,
        description,
        ingredients,
        instructions,
        prep_time,
        cook_time,
        servings,
        category,
        image_url,
        is_favorite: 0,
        rating: 0
      });
    }
  );
};

// Update recipe
exports.updateRecipe = (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  const {
    title,
    description,
    ingredients,
    instructions,
    prep_time,
    cook_time,
    servings,
    category,
    image_url,
    rating
  } = req.body;

  // Convert ingredients array to JSON string
  const ingredientsJson = JSON.stringify(ingredients);

  db.run(
    `UPDATE recipes 
    SET title = ?, description = ?, ingredients = ?, instructions = ?, 
        prep_time = ?, cook_time = ?, servings = ?, category = ?, 
        image_url = ?, rating = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ? AND user_id = ?`,
    [title, description, ingredientsJson, instructions, prep_time, cook_time, servings, category, image_url, rating, id, userId],
    function(err) {
      if (err) {
        return res.status(500).json({ message: 'Error updating recipe' });
      }

      if (this.changes === 0) {
        return res.status(404).json({ message: 'Recipe not found' });
      }

      res.json({ message: 'Recipe updated successfully' });
    }
  );
};

// Delete recipe
exports.deleteRecipe = (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  db.run(
    'DELETE FROM recipes WHERE id = ? AND user_id = ?',
    [id, userId],
    function(err) {
      if (err) {
        return res.status(500).json({ message: 'Error deleting recipe' });
      }

      if (this.changes === 0) {
        return res.status(404).json({ message: 'Recipe not found' });
      }

      res.json({ message: 'Recipe deleted successfully' });
    }
  );
};

// Toggle favorite status
exports.toggleFavorite = (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  db.get(
    'SELECT is_favorite FROM recipes WHERE id = ? AND user_id = ?',
    [id, userId],
    (err, recipe) => {
      if (err) {
        return res.status(500).json({ message: 'Error fetching recipe' });
      }

      if (!recipe) {
        return res.status(404).json({ message: 'Recipe not found' });
      }

      const newFavoriteStatus = recipe.is_favorite === 1 ? 0 : 1;

      db.run(
        'UPDATE recipes SET is_favorite = ? WHERE id = ? AND user_id = ?',
        [newFavoriteStatus, id, userId],
        (err) => {
          if (err) {
            return res.status(500).json({ message: 'Error updating favorite status' });
          }

          res.json({ is_favorite: newFavoriteStatus });
        }
      );
    }
  );
};
