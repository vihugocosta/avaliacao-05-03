const request = require('supertest');
const app = require('../server');

describe('API Tests', () => {
  let server;

  beforeAll(() => {
    // Get server instance if available
    server = app.listen ? app : require('http').createServer(app);
  });

  afterAll((done) => {
    // Close server after all tests
    if (server && server.close) {
      server.close(done);
    } else {
      done();
    }
  });
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

    it('deve ter uptime definido', async () => {
      const response = await request(app).get('/api/status');
      expect(response.body.uptime).toBeDefined();
      expect(typeof response.body.uptime).toBe('number');
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

    it('deve conter propriedade node_version', async () => {
      const response = await request(app).get('/api/info');
      expect(response.body).toHaveProperty('node_version');
    });

    it('deve ter secure flag true', async () => {
      const response = await request(app).get('/api/info');
      expect(response.body.secure).toBe(true);
    });
  });

  describe('🔒 Segurança - Headers HTTP', () => {
    it('deve conter header X-Content-Type-Options', async () => {
      const response = await request(app).get('/api/status');
      expect(response.headers['x-content-type-options']).toBeDefined();
    });

    it('deve conter header X-Frame-Options', async () => {
      const response = await request(app).get('/api/status');
      expect(response.headers['x-frame-options']).toBeDefined();
    });

    it('deve conter header X-XSS-Protection', async () => {
      const response = await request(app).get('/api/status');
      expect(response.headers['x-xss-protection']).toBeDefined();
    });

    it('deve conter Content-Security-Policy header', async () => {
      const response = await request(app).get('/api/status');
      expect(response.headers['content-security-policy']).toBeDefined();
    });
  });

  describe('🔒 Segurança - CORS', () => {
    it('deve permitir requisições com CORS', async () => {
      const response = await request(app)
        .get('/api/status')
        .set('Origin', 'http://localhost:3000');
      expect(response.headers['access-control-allow-origin']).toBeDefined();
    });

    it('deve respeitar credenciais CORS', async () => {
      const response = await request(app)
        .get('/api/status')
        .set('Origin', 'http://localhost:3000');
      expect(response.headers['access-control-allow-credentials']).toBeDefined();
    });
  });

  describe('🔒 Segurança - 404 e Erros', () => {
    it('deve retornar 404 para rota desconhecida', async () => {
      const response = await request(app).get('/api/inexistente');
      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
    });

    it('deve retornar JSON em 404', async () => {
      const response = await request(app).get('/api/inexistente');
      expect(response.body).toHaveProperty('message');
    });
  });
});
