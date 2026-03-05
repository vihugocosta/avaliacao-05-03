const request = require('supertest');
const app = require('../server');

describe('API Tests', () => {
  describe('GET /', () => {
    it('deve retornar status 200', async () => {
      const response = await request(app).get('/');
      expect(response.status).toBe(200);
    });
  });

  describe('GET /api/status', () => {
    it('deve retornar status ok', async () => {
      const response = await request(app).get('/api/status');
      expect(response.status).toBe(200);
      expect(response.body.status).toBe('ok');
    });

    it('deve ter a propriedade message', async () => {
      const response = await request(app).get('/api/status');
      expect(response.body).toHaveProperty('message');
    });

    it('deve ter timestamp válido', async () => {
      const response = await request(app).get('/api/status');
      expect(response.body.timestamp).toBeDefined();
    });
  });

  describe('GET /api/info', () => {
    it('deve retornar informações da aplicação', async () => {
      const response = await request(app).get('/api/info');
      expect(response.status).toBe(200);
      expect(response.body.app).toBe('Site de Exemplo CI/CD');
      expect(response.body.version).toBe('1.0.0');
    });

    it('deve conter propriedade environment', async () => {
      const response = await request(app).get('/api/info');
      expect(response.body).toHaveProperty('environment');
    });
  });
});
