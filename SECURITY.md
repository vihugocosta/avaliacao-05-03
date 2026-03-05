# 🔒 Segurança da Aplicação

## Visão Geral

Este documento descreve as implementações de segurança aplicadas à aplicação Site de Exemplo CI/CD.

## 🛡️ Camadas de Segurança Implementadas

### 1. **Helmet.js - Headers HTTP Seguros**

**O que é:** Helmet é um middleware Express que define diversos headers HTTP relativos a segurança.

**Headers Implementados:**
- `X-Content-Type-Options: nosniff` - Previne MIME type sniffing
- `X-Frame-Options: DENY` - Previne clickjacking
- `X-XSS-Protection: 1; mode=block` - Proteção contra XSS
- `Strict-Transport-Security` - Força HTTPS
- `Content-Security-Policy` - Controla recursos carregados
- `Referrer-Policy` - Controla informações de referência

**Status:** ✅ Implementado e testado

```javascript
app.use(helmet());
```

---

### 2. **Rate Limiting - Proteção contra DDoS**

**O que é:** Limita o número de requisições por IP em um período de tempo.

**Configuração:**
- Janela: 15 minutos
- Limite: 100 requisições por IP
- Mensagem customizada para limite excedido

**Status:** ✅ Implementado e testado

```javascript
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again later',
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);
```

---

### 3. **CORS - Controle de Origem**

**O que é:** Controla quem pode fazer requisições para a API.

**Configuração:**
- Permite credenciais
- Métodos: GET, HEAD, PUT, PATCH, POST
- Origem configurável via variável de ambiente

**Status:** ✅ Implementado e testado

```javascript
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true,
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST'],
  optionsSuccessStatus: 200
}));
```

---

### 4. **Validação de Entrada**

**O que é:** Express-validator para validar dados de entrada.

**Implementado para:**
- Validação de tipo de dado
- Sanitização de strings
- Validação de ranges

**Status:** ✅ Configurado (pronto para expansão em novos endpoints)

---

### 5. **Error Handling Seguro**

**O que é:** Trata erros sem expor informações sensíveis.

**Implementação:**
- Mensagens diferentes para desenvolvimento e produção
- Logs de erro only em servidor
- Respostas consistentes em JSON

**Status:** ✅ Implementado

```javascript
app.use((err, req, res, next) => {
  // Logs apenas no servidor
  console.error('Error:', err);
  
  // Resposta segura ao cliente
  res.status(err.status || 500).json({
    success: false,
    message: process.env.NODE_ENV === 'production' 
      ? 'Internal Server Error' 
      : err.message
  });
});
```

---

### 6. **Docker Security - Non-Root User**

**O que é:** Executa aplicação com usuário não-root dentro do container.

**Implementação:**
```dockerfile
RUN addgroup -g 1001 -S nodejs && adduser -S nodejs -u 1001
USER nodejs
```

**Benefícios:**
- Reduz impacto de vulnerabilidades
- Impede comando RUN como root
- Segue boas práticas de container

**Status:** ✅ Implementado

---

### 7. **Request Size Limits**

**O que é:** Limita tamanho de requisições JSON/URL-encoded.

**Configuração:**
- Limite: 10MB
- Previne ataques de payload

**Status:** ✅ Implementado

```javascript
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
```

---

### 8. **Static File Caching**

**O que é:** Configuração segura de cache para arquivos estáticos.

**Benefícios:**
- Reduz carga do servidor
- ETags desabilitadas para segurança
- Cache duration: 1 dia

**Status:** ✅ Implementado

```javascript
app.use(express.static('public', {
  maxAge: '1d',
  etag: false
}));
```

---

## 🧪 Testes de Segurança

Todos os seguintes testes passam com sucesso:

### Headers HTTP Seguros
- ✅ X-Content-Type-Options presente
- ✅ X-Frame-Options presente
- ✅ X-XSS-Protection presente
- ✅ Content-Security-Policy presente

### CORS
- ✅ Permite requisições com CORS
- ✅ Respeita credenciais

### Error Handling
- ✅ Retorna 404 para rotas inexistentes
- ✅ Respostas JSON consistentes

### Info Endpoints
- ✅ Secure flag = true
- ✅ Node version information

**Executar testes:**
```bash
npm test
```

---

## 📋 Checklist de Segurança em Produção

- [x] ✅ Headers HTTP de segurança via Helmet
- [x] ✅ Rate limiting implementado
- [x] ✅ CORS configurado
- [x] ✅ Validação de entrada pronta
- [x] ✅ Error handling seguro
- [x] ✅ Docker non-root user
- [x] ✅ Request size limits
- [x] ✅ Caching seguro
- [ ] ⏳ HTTPS/TLS (deve ser configurado no proxy/load balancer)
- [ ] ⏳ WAF (Web Application Firewall) externo
- [ ] ⏳ Scanning de dependências (Trivy no CI/CD)
- [ ] ⏳ Monitoring e logging centralizado

---

## 🚀 Próximas Melhorias

### Curto Prazo
- [ ] Adicionar autenticação (JWT/OAuth)
- [ ] Implementar HTTPS obrigatório
- [ ] Adicionar logging estruturado (Winston/Pino)
- [ ] Secrets management (dotenv com validação)

### Médio Prazo
- [ ] WAF (Web Application Firewall)
- [ ] Monitoring e alertas (Prometheus/DataDog)
- [ ] Audit logs
- [ ] Encryption at rest

### Longo Prazo
- [ ] Compliance (GDPR/HIPAA/SOC2)
- [ ] Penetration testing
- [ ] Bug bounty program
- [ ] Security awareness training

---

## 🔍 Variáveis de Ambiente Seguras

Configure estas variáveis em produção:

```env
# Obrigatórias
NODE_ENV=production
PORT=3000
CORS_ORIGIN=https://seu-dominio.com

# Opcionais
LOG_LEVEL=error
RATE_LIMIT_WINDOW=900000
RATE_LIMIT_MAX=100
```

**Nunca faça commit de .env!** Use `.env.example` como template.

---

## 📚 Referências de Segurança

- [Helmet.js Documentation](https://helmetjs.github.io/)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Express.js Security](https://expressjs.com/en/advanced/best-practice-security.html)
- [Node.js Security](https://nodejs.org/en/docs/guides/security/)
- [Docker Security Best Practices](https://docs.docker.com/develop/security-best-practices/)

---

## 📞 Reportar Vulnerabilidades

Se encontrar vulnerabilidades, reporte privadamente para a equipe de segurança.

**NÃO abra issue pública com detalhes de vulnerabilidades!**

---

**Última atualização:** 05/03/2026  
**Versão:** 1.0  
**Status:** ✅ Seguro para Produção
