# Guia de Deploy

Este documento descreve como fazer o deploy da aplicação em diferentes ambientes.

## 📦 Deployment Local

### Usando Node.js diretamente

```bash
# Instalar dependências
npm install

# Iniciar servidor
npm start
```

A aplicação estará disponível em `http://localhost:3000`

## 🐳 Deployment com Docker

### Opção 1: Docker Compose (Recomendado para desenvolvimento)

```bash
# Iniciar
docker-compose up

# Parar
docker-compose down

# Recriar imagem
docker-compose up --build
```

### Opção 2: Docker Direto

```bash
# Build da imagem
docker build -t site-exemplo-cicd:1.0.0 .

# Executar
docker run -p 3000:3000 \
  -e NODE_ENV=production \
  -e PORT=3000 \
  site-exemplo-cicd:1.0.0
```

## ☁️ Deployment em Servidores em Nuvem

### Heroku

```bash
# Login no Heroku
heroku login

# Criar app
heroku create nome-da-app

# Deploy via Git
git push heroku main

# Ver logs
heroku logs --tail
```

### AWS Elastic Container Service (ECS)

1. Build e push da imagem:
```bash
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <account-id>.dkr.ecr.us-east-1.amazonaws.com

docker build -t site-exemplo-cicd:latest .

docker tag site-exemplo-cicd:latest <account-id>.dkr.ecr.us-east-1.amazonaws.com/site-exemplo-cicd:latest

docker push <account-id>.dkr.ecr.us-east-1.amazonaws.com/site-exemplo-cicd:latest
```

2. Create ECS task definition
3. Create ECS service

### Google Cloud Run

```bash
# Autenticar
gcloud auth login

# Build e push
gcloud builds submit --tag gcr.io/PROJECT_ID/site-exemplo-cicd

# Deploy
gcloud run deploy site-exemplo-cicd \
  --image gcr.io/PROJECT_ID/site-exemplo-cicd \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

### Azure App Service

```bash
# Criar resource group
az group create --name myResourceGroup --location eastus

# Criar App Service plan
az appservice plan create --name myAppServicePlan \
  --resource-group myResourceGroup \
  --sku B1 --is-linux

# Deploy
az webapp up --name site-exemplo-cicd \
  --resource-group myResourceGroup \
  --plan myAppServicePlan
```

## 🔄 Continuous Deployment (CD)

### GitHub Actions

O projeto está pré-configurado com GitHub Actions. A configuração está em `.github/workflows/ci-cd.yml`

O pipeline executa automaticamente em:
- Push para `main` ou `develop`
- Pull Requests

### Configurar Deploy Automático

1. **No repositório GitHub:**
   - Vá para Settings > Secrets and variables > Actions
   - Adicione secrets necessários (ex: DOCKER_USERNAME, DOCKER_PASSWORD)

2. **Editar workflow:**
   ```yaml
   - name: Push Docker image
     if: github.event_name == 'push'
     run: |
       docker login -u ${{ secrets.DOCKER_USERNAME }} -p ${{ secrets.DOCKER_PASSWORD }}
       docker push site-exemplo-cicd:${{ github.sha }}
   ```

## 📋 Checklist de Deploy

- [ ] Verificar variáveis de ambiente
- [ ] Executar testes localmente
- [ ] Verificar linting
- [ ] Atualizar versão em package.json
- [ ] Criar git tag com versão
- [ ] Fazer push para repositório
- [ ] Verificar CI/CD pipeline
- [ ] Validar deploy em staging
- [ ] Monitorar logs em produção
- [ ] Estar pronto para rollback

## 🚨 Rollback

### Docker
```bash
# Voltar para versão anterior
docker-compose down
docker rmi site-exemplo-cicd:current
docker tag site-exemplo-cicd:previous site-exemplo-cicd:current
docker-compose up
```

### GitHub/Git
```bash
# Fazer revert de commit
git revert <commit-hash>
git push origin main
```

## 📊 Monitoramento

### Health Check

A aplicação inclui um endpoint de health check:
```
GET /api/status
```

Verificar periodicamente:
```bash
curl http://localhost:3000/api/status
```

### Docker Health Check

O Dockerfile inclui health check automático:
```bash
docker ps  # Ver status de health
```

### Logs

```bash
# Local
npm start  # Ver logs no console

# Docker
docker-compose logs -f site-exemplo-cicd

# Heroku
heroku logs --tail

# AWS ECS
aws logs tail /ecs/site-exemplo-cicd --follow
```

## 🔐 Segurança em Produção

- [ ] Usar variáveis de ambiente para secrets
- [ ] Habilitar HTTPS/TLS
- [ ] Configurar CORS apropriadamente
- [ ] Implementar rate limiting
- [ ] Configurar firewall
- [ ] Manter dependências atualizadas
- [ ] Usar imagem Docker baseada em Alpine
- [ ] Executar container como non-root user
- [ ] Fazer scanning de vulnerabilidades

## 📝 Versionamento

Usar Semantic Versioning:
- MAJOR.MINOR.PATCH
- Exemplo: 1.0.0

Atualizar `package.json` antes de cada release.

---

Para dúvidas, consulte o README.md ou abra uma issue.
