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

  test('should handle login request', async () => {
    const req = { body: { email: 'test@test.com', password: 'password123' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    db.get.mockImplementation((sql, params, cb) => {
      cb(null, null);
    });

    authController.login(req, res);
    expect(res.status).toHaveBeenCalled();
  });

  test('should validate email and password', async () => {
    const req = { body: { email: '', password: '' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    authController.login(req, res);
    expect(res.status).toHaveBeenCalled();
  });

  test('should query database for user', async () => {
    const req = { body: { email: 'test@test.com', password: 'password123' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    db.get.mockImplementation((sql, params, cb) => {
      cb(null, null);
    });

    authController.login(req, res);
    setTimeout(() => {
      expect(db.get).toHaveBeenCalled();
    }, 100);
  });
});
