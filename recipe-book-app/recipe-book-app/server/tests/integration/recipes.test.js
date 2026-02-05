const request = require('supertest');
const app = require('../../server');

describe('Integration Test - Recipes API', () => {
  test('GET /api/recipes should return 401 if not authenticated', async () => {
    const res = await request(app).get('/api/recipes');

    expect(res.statusCode).toBe(401);
  });
});
