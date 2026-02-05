// Mock database BEFORE importing controller
jest.mock('../../config/database', () => ({
  get: jest.fn(),
  run: jest.fn(),
  all: jest.fn()
}));

const authController = require('../../controllers/authController');

describe('Unit Test - Auth Controller (register)', () => {
  test('should return 400 if required fields are missing', async () => {
    const req = {
      body: { password: '123456' }
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await authController.register(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Please enter all fields'
    });
  });

  test('should return 400 if password is too short', async () => {
    const req = {
      body: {
        username: 'testuser',
        email: 'test@test.com',
        password: '123'
      }
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await authController.register(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Password must be at least 6 characters'
    });
  });
});
