# Arquitetura da Aplicação

## 🏗️ Visão Geral

O Site de Exemplo CI/CD é uma aplicação moderna com arquitetura em camadas, desenhada para demonstrar boas práticas de desenvolvimento, testing e deployment.

## 📊 Diagrama de Arquitetura

```
┌─────────────────────────────────────────────────────────┐
│                   Frontend (Browser)                    │
│  ┌────────────────┐ ┌──────────────┐ ┌──────────────┐  │
│  │   index.html   │ │  styles.css  │ │  script.js   │  │
│  └────────────────┘ └──────────────┘ └──────────────┘  │
└──────────────────────┬──────────────────────────────────┘
                       │ HTTP/REST
┌──────────────────────▼──────────────────────────────────┐
│              Node.js / Express Server                   │
│  ┌──────────────────────────────────────────────────┐   │
│  │            Express Middleware Stack              │   │
│  │  CORS │ Static Files │ JSON Parser │ Error Handler│  │
│  └──────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────┐   │
│  │              API Routes & Handlers               │   │
│  │  GET /  │ GET /api/status │ GET /api/info       │   │
│  └──────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────┘
```

## 📁 Estrutura de Pastas

```
site-exemplo-cicd/
│
├── 📄 server.js                 # Servidor Express principal
├── 📄 package.json              # Dependências e scripts
├── 📄 jest.config.js            # Configuração de testes
├── 📄 .eslintrc.json            # Configuração de linting
├── 📄 Dockerfile                # Containerização
├── 📄 docker-compose.yml        # Orquestração local
│
├── 📁 public/                   # Arquivos estáticos servidos
│   ├── index.html               # Página principal
│   ├── styles.css               # Estilos CSS
│   └── script.js                # JavaScript do frontend
│
├── 📁 __tests__/                # Testes automatizados
│   ├── server.test.js           # Testes da API
│   └── README.md                # Documentação de testes
│
├── 📁 .github/
│   └── workflows/
│       └── ci-cd.yml            # Pipeline GitHub Actions
│
├── 📄 README.md                 # Documentação principal
├── 📄 DEPLOYMENT.md             # Guia de deployment
├── 📄 CONTRIBUTING.md           # Guia de contribuição
├── 📄 ARCHITECTURE.md           # Este arquivo
├── 📄 LICENSE                   # Licença MIT
│
├── 📄 .gitignore                # Arquivos ignorados pelo git
├── 📄 .dockerignore             # Arquivos ignorados pelo docker
├── 📄 .env.example              # Variáveis de ambiente exemplo
├── 📄 Makefile                  # Comandos utilitários
└── 📄 .eslintignore             # Arquivos ignorados pelo linter
```

## 🔄 Fluxo de Requisição

```
1. Browser envia requisição HTTP
   ↓
2. Express recebe e roteia para handler
   ↓
3. Middleware processa (CORS, JSON, etc)
   ↓
4. Handler executa lógica e retorna resposta
   ↓
5. Resposta JSON é enviada ao cliente
   ↓
6. JavaScript do frontend atualiza DOM
```

## 🧩 Componentes Principais

### Frontend

**index.html**
- Estrutura semântica HTML5
- Layout responsivo
- Sections: hero, about, features, api, footer

**styles.css**
- Design system consistente
- Mobile-first responsive
- Gradientes e animações suaves
- Tema adaptável

**script.js**
- Consumo de APIs REST
- Manipulação do DOM
- Smooth scrolling
- Error handling

### Backend

**server.js**
- Express application setup
- CORS middleware
- Static file serving
- API routes:
  - `GET /` - Página principal
  - `GET /api/status` - Status da API
  - `GET /api/info` - Info da app
- Error handling

## 🧪 Testing Strategy

### Tipos de Testes

```
Unit Tests          Integration Tests       E2E Tests
├─ Jest            ├─ Supertest            └─ (Futuro)
└─ Mock modules    └─ API endpoints
```

### Coverage Goals

- Branches: 50%+
- Functions: 50%+
- Lines: 50%+
- Statements: 50%+

## 🔀 CI/CD Pipeline

```
┌─────────────────────────────────────────┐
│  Push to GitHub / Open Pull Request    │
└────────────────┬────────────────────────┘
                 │
    ┌────────────▼─────────────┐
    │   GitHub Actions Start   │
    └────────────┬─────────────┘
                 │
    ┌────────────▼─────────────────────────────┐
    │  Matrix Tests (Node 18, 20)              │
    │  ├─ npm ci                               │
    │  ├─ npm run lint (continue-on-error)     │
    │  └─ npm test                             │
    └────────────┬─────────────────────────────┘
                 │
    ┌────────────▼─────────────────────────────┐
    │  Docker Build                            │
    │  └─ Build and cache image                │
    └────────────┬─────────────────────────────┘
                 │
    ┌────────────▼─────────────────────────────┐
    │  Security Scan (Trivy)                   │
    │  └─ Upload SARIF results                 │
    └─────────────────────────────────────────┘
```

## 🐳 Container Architecture

```
┌──────────────────────────────────────┐
│      Docker Image (Alpine Node)      │
│  ┌────────────────────────────────┐  │
│  │  Dependencies (npm ci)          │  │
│  ├────────────────────────────────┼──│
│  │  Application Code               │  │
│  ├────────────────────────────────┼──│
│  │  scripts: npm start             │  │
│  ├────────────────────────────────┼──│
│  │  Port: 3000                     │  │
│  ├────────────────────────────────┼──│
│  │  Health Check: GET /api/status  │  │
│  └────────────────────────────────┘  │
└──────────────────────────────────────┘
     │
     ├─ runs-on: ubuntu-latest (CI/CD)
     ├─ docker compose (local dev)
     └─ cloud platforms (production)
```

## 🔐 Security Layers

1. **Code Level**
   - ESLint - Code quality
   - CORS - Cross-origin requests
   - Environment variables - Secrets management

2. **Container Level**
   - Alpine base image - Minimal attack surface
   - Non-root user (future improvement)
   - Health checks
   - Resource limits (docker-compose)

3. **Pipeline Level**
   - Trivy scanning - Vulnerability detection
   - Testing - Behavior validation
   - Linting - Code standards

## 📊 Data Flow

### Status Request
```
Browser
   │
   ├─ GET /api/status
   │
Server
   │
   ├─ Recebe requisição
   ├─ Executa handler
   ├─ Cria JSON response
   ├─ Retorna ao browser
   │
Browser
   │
   └─ Atualiza interface
```

## 🚀 Deployment Flow

```
Local Development
    ↓
    ├─ npm install
    ├─ npm test
    └─ npm start

Docker Local
    ↓
    ├─ docker-compose up
    └─ localhost:3000

Production
    ↓
    ├─ Build pipeline
    ├─ Security scan
    ├─ Push para registry
    └─ Deploy para cloud
```

## 📈 Escalabilidade

### Atual
- Single process
- Single container
- In-memory data
- Estateless

### Futuro
- Auto-scaling
- Load balancing
- Database (PostgreSQL)
- Redis cache
- CDN para assets
- Message queue (RabbitMQ/Kafka)

## 🔧 Configuração & Variáveis

```env
NODE_ENV         # environment (development/production)
PORT             # server port (default: 3000)
API_URL          # API base URL
LOG_LEVEL        # logging level
```

## 📦 Dependências Principais

### Production
- `express` ^4.18.2 - Web framework
- `cors` ^2.8.5 - CORS middleware

### Development
- `jest` ^29.0.0 - Testing framework
- `eslint` ^8.0.0 - Code linting
- `supertest` - HTTP testing

## 🔄 Request/Response Cycle

```json
// Request
GET /api/status HTTP/1.1

// Response
HTTP/1.1 200 OK
Content-Type: application/json

{
  "status": "ok",
  "message": "API está funcionando!",
  "timestamp": "2026-03-05T10:30:00.000Z"
}
```

## 🎯 Design Patterns

1. **Express Pattern** - Web framework
2. **RESTful API** - API design
3. **Middleware Pattern** - Request processing
4. **Test-Driven** - Testing approach
5. **Containerization** - Deployment

## 📚 Referências

- [Express.js Documentation](https://expressjs.com)
- [Jest Testing Framework](https://jestjs.io)
- [Docker Documentation](https://docs.docker.com)
- [GitHub Actions](https://github.com/features/actions)
- [Node.js Best Practices](https://nodejs.org/en/docs/guides)

---

**Versão:** 1.0.0
**Última atualização:** 2026-03-05
