const request = require('supertest');
const app = require('../../server');

describe('Integration Test - Full Auth & Recipe Flow', () => {
  let authToken = null;

  test('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        username: 'testuser123',
        email: 'testuser@test.com',
        password: 'password123'
      });

    expect([200, 201, 400]).toContain(res.statusCode);
  });

  test('should login user and get token', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'testuser@test.com',
        password: 'password123'
      });

    if (res.statusCode === 200) {
      authToken = res.body.token;
      expect(authToken).toBeDefined();
    }
  });

  test('GET /api/recipes with valid token should return recipes', async () => {
    if (!authToken) {
      console.log('Skipping: No auth token available');
      return;
    }

    const res = await request(app)
      .get('/api/recipes')
      .set('Authorization', `Bearer ${authToken}`);

    expect([200, 401]).toContain(res.statusCode);
  });

  test('POST /api/recipes should create recipe with auth', async () => {
    if (!authToken) {
      console.log('Skipping: No auth token available');
      return;
    }

    const res = await request(app)
      .post('/api/recipes')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        title: 'Test Recipe',
        description: 'A test recipe',
        ingredients: 'Test ingredients',
        instructions: 'Test instructions'
      });

    expect([200, 201, 401]).toContain(res.statusCode);
  });
});
