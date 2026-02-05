jest.mock('../../config/database', () => ({
  get: jest.fn(),
  run: jest.fn(),
  all: jest.fn()
}));

const recipeController = require('../../controllers/recipeController');
const db = require('../../config/database');

describe('Recipe Controller - Unit Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should fetch all recipes', async () => {
    const mockRecipes = [
      { id: 1, title: 'Pasta', description: 'Italian pasta' },
      { id: 2, title: 'Pizza', description: 'Italian pizza' }
    ];

    db.all.mockResolvedValueOnce(mockRecipes);

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await recipeController.getAllRecipes(req, res);

    expect(db.all).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(expect.arrayContaining(mockRecipes));
  });

  test('should create a new recipe', async () => {
    db.run.mockResolvedValueOnce({ lastID: 1 });

    const req = {
      body: {
        title: 'New Recipe',
        description: 'Test recipe',
        ingredients: 'Ingredient 1',
        instructions: 'Step 1'
      },
      user: { id: 1 }
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await recipeController.createRecipe(req, res);

    expect(db.run).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
  });

  test('should delete a recipe', async () => {
    db.run.mockResolvedValueOnce({ changes: 1 });

    const req = {
      params: { id: 1 },
      user: { id: 1 }
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await recipeController.deleteRecipe(req, res);

    expect(db.run).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      message: expect.any(String)
    }));
  });
});
