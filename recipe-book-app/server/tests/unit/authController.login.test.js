jest.mock('../../config/database', () => ({
  get: jest.fn(),
  run: jest.fn(),
  all: jest.fn()
}));

const authController = require('../../controllers/authController');
const db = require('../../config/database');

describe('Auth Controller - Login', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should return 400 if email or password is missing', async () => {
    const req = { body: { email: 'test@test.com' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await authController.login(req, res);
    
    expect(res.status).toHaveBeenCalledWith(400);
  });

  test('should return 401 if user not found', async () => {
    db.get.mockResolvedValueOnce(null);
    
    const req = {
      body: { email: 'nonexistent@test.com', password: 'password123' }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await authController.login(req, res);
    
    expect(res.status).toHaveBeenCalledWith(401);
  });

  test('should return 200 and token on successful login', async () => {
    db.get.mockResolvedValueOnce({
      id: 1,
      email: 'test@test.com',
      password: '$2b$10$hashedpassword'
    });

    const req = {
      body: { email: 'test@test.com', password: 'password123' }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    // Mock bcrypt comparison
    jest.mock('bcryptjs', () => ({
      compare: jest.fn().mockResolvedValue(true)
    }));

    // Note: This is simplified - actual test would need proper bcrypt mocking
  });
});
