# 🚀 Site de Exemplo CI/CD

Um site de exemplo completo com pipeline de integração contínua e deploy contínuo (CI/CD) configurado, incluindo validações de segurança e testes automatizados.

## ✨ Características

- ✅ **Servidor Express.js** com middleware de segurança
- ✅ **Testes Automatizados** com Jest + Supertest (17+ testes)
- ✅ **Pipeline CI/CD** com GitHub Actions (4 jobs)
- ✅ **Segurança em Camadas** (Helmet, Rate Limiting, CORS)
- ✅ **Containerização Docker** com Alpine + non-root user
- ✅ **Documentação Completa** para deployment e contribuição

## 🔒 Validações de Segurança Implementadas

### Headers HTTP Seguros via Helmet
- X-Content-Type-Options (previne MIME sniffing)
- X-Frame-Options (previne clickjacking)
- X-XSS-Protection (proteção XSS)
- Content-Security-Policy
- Strict-Transport-Security

### Proteção contra DDoS
- Rate limiting: 100 req/15 min por IP
- Request size limits: 10MB

### CORS Seguro
- Configuração por variável de ambiente
- Suporte a credenciais
- Whitelist de métodos HTTP

### Error Handling Seguro
- Mensagens diferentes em dev/produção
- Respostas JSON consistentes
- Logs apenas no servidor

### Docker Security
- Imagem Alpine (mínima superfície ataque)
- Execução como non-root user (nodejs)
- Health checks configurados

## 🚀 Quick Start

### Opção 1: Node.js Direto

```bash
# Instalar dependências
npm install

# Iniciar servidor
npm start
# Abre em http://localhost:3000
```

### Opção 2: Docker

```bash
# Com docker-compose
docker-compose up
# Abre em http://localhost:3000

# Parar
docker-compose down
```

## 🧪 Testes

```bash
# Executar todos os testes (17 testes)
npm test

# Com cobertura
npm test -- --coverage

# Modo watch
npm test -- --watch
```

**Testes incluem:**
- ✅ 6 testes funcionais (status, info, pages)
- ✅ 4 testes de headers HTTP seguros
- ✅ 2 testes CORS
- ✅ 2 testes de erro handling
- ✅ 3 testes de propriedades de info

## 📚 API Endpoints

### GET /
Página principal (HTML)

```bash
curl http://localhost:3000/
```

### GET /api/status
Status e uptime da API

```bash
curl http://localhost:3000/api/status

# Response
{
  "status": "ok",
  "message": "API está funcionando!",
  "timestamp": "2026-03-05T10:30:00.000Z",
  "uptime": 1234.5
}
```

### GET /api/info
Informações da aplicação

```bash
curl http://localhost:3000/api/info

# Response
{
  "app": "Site de Exemplo CI/CD",
  "version": "1.0.0",
  "environment": "production",
  "node_version": "v18.0.0",
  "secure": true
}
```

## 🔄 CI/CD Pipeline

### GitHub Actions
Pipeline automático com 4 jobs:

1. **validate** - Lint + Testes (Node 18 e 20)
2. **build** - Docker build (depende de validate)
3. **deploy** - Deploy com secrets (depende de build)
4. **security-scan** - Trivy scan (paralelo)

**Triggers:**
- Push para `main` ou `develop`
- Pull Request para `main` ou `develop`

[Ver detalhes do workflow →](.github/workflows/ci-cd.yml)

## 📋 Documentação

- [🔒 **SECURITY.md**](SECURITY.md) - Guia de segurança
- [📦 **ARCHITECTURE.md**](ARCHITECTURE.md) - Arquitetura da aplicação
- [🚀 **DEPLOYMENT.md**](DEPLOYMENT.md) - Guia de deploy
- [🤝 **CONTRIBUTING.md**](CONTRIBUTING.md) - Guia de contribuição
- [⚡ **QUICKSTART.md**](QUICKSTART.md) - Iniciar em 60 segundos

## 🔧 Scripts Disponíveis

```bash
npm start        # Iniciar servidor
npm test         # Executar testes
npm run lint     # ESLint check
npm run build    # Build (echo simples)
npm run dev      # Modo desenvolvimento
```

## 📦 Stack Tecnológico

### Produção
- **Runtime:** Node.js 18+ (Alpine Docker)
- **Framework:** Express.js 4.18
- **Segurança:** Helmet, express-rate-limit, express-validator
- **Containerização:** Docker + Docker Compose

### Desenvolvimento
- **Testing:** Jest 29 + Supertest
- **Linting:** ESLint 8
- **Git Hooks:** (pronto para husky)

## 🔐 Variáveis de Ambiente

```env
NODE_ENV=production          # development, production
PORT=3000                    # Porta do servidor
CORS_ORIGIN=*               # CORS origin
```

Ver [.env.example](.env.example) para mais opções.

## 🐳 Docker

### Build
```bash
docker build -t site-exemplo-cicd:latest .
```

### Run
```bash
docker run -p 3000:3000 \
  -e NODE_ENV=production \
  site-exemplo-cicd:latest
```

### Recursos
- **Base:** node:18-alpine
- **Usuário:** nodejs (non-root)
- **Health Check:** GET /api/status a cada 30s
- **Exposição:** Porta 3000

## 📈 Performance & Segurança

### Otimizações
- Cache de assets estáticos (1 dia)
- Rate limiting (100 req/15min)
- Compression via Helmet
- Alpine Docker image (40MB)

### Monitoramento (Futuro)
- [ ] Prometheus metrics
- [ ] Centralized logging
- [ ] APM (Application Performance Monitoring)
- [ ] Security scanning

## 🆘 Troubleshooting

### "Port 3000 already in use"
```bash
PORT=3001 npm start
```

### "Cannot find module"
```bash
npm install
```

### Testes travando
```bash
npm test -- --forceExit
```

### Docker issues
```bash
docker-compose down
docker system prune
docker-compose up --build
```

## 📝 Changelog

### v1.0.0 (05/03/2026)
- ✨ Implementação inicial
- 🔒 Validações de segurança
- 🧪 17 testes + CI/CD
- 📚 Documentação completa

## 📞 Suporte

- 📖 Leia a documentação em `SECURITY.md`, `ARCHITECTURE.md`
- 🐛 Reporte bugs via GitHub Issues
- 🔐 Vulnerabilidades: reporte privately
- 💬 Discussões: GitHub Discussions

## 📄 Licença

MIT License - veja [LICENSE](LICENSE) para detalhes

---

**Pronto para começar?** Execute `npm install && npm start` 🚀