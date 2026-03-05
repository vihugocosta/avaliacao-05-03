# 🚀 GitHub Actions Workflow - CI/CD Pipeline

## 📋 Descrição

Este workflow automatiza o pipeline de Integração Contínua e Deploy Contínuo (CI/CD) com os seguintes componentes:

### Jobs Implementados

#### 1️⃣ **validate** (Validação do Código)
- Instala dependências do projeto
- Executa linter (ESLint) para validar qualidade do código
- Executa testes automatizados (Jest)
- Testa em múltiplas versões do Node.js (18.x, 20.x)

#### 2️⃣ **build** (Build da Aplicação)
- **Depende de:** `validate` (só executa se validate passar ✅)
- Compila a aplicação com `npm run build`
- Constrói imagem Docker
- Cacheia layers do Docker para builds mais rápidos

#### 3️⃣ **deploy** (Deploy e Segurança)
- **Depende de:** `build` (só executa se build passar ✅)
- Acessa variável secreta (SECRET_MESSAGE)
- Simula deploy em produção
- Confirma sucesso do pipeline completo

#### 4️⃣ **security-scan** (Scan de Vulnerabilidades)
- Executa independentemente (paralelo aos outros)
- Utiliza Trivy para escanear vulnerabilidades
- Faz upload de resultados para GitHub Security tab

---

## 🔐 Configurar Secrets

Para usar o secret `SECRET_MESSAGE`, siga estos passos:

### GitHub Web UI
1. Vá para seu repositório
2. **Settings** → **Secrets and variables** → **Actions**
3. Clique em **New repository secret**
4. Nome: `SECRET_MESSAGE`
5. Valor: Digite a mensagem secreta desejada
6. Clique em **Add secret**

### Exemplo de Secret
```
Deployment autorizado para produção - Avaliação 05/03/2026
```

---

## 📊 Fluxo de Execução

```
Push para main/develop
        ↓
    validate (Job 1)
   Lint + Testes
        ↓
      PASSA? ✅
        ↓
    build (Job 2)
   needs: validate
        ↓
      PASSA? ✅
        ↓
    deploy (Job 3)
   needs: build
   Acessa SECRET_MESSAGE
        ↓
      SUCESSO! 🎉
```

---

## ✨ Features Principais

### ✅ Dependências entre Jobs
- **`build`** só executa se **`validate`** passar
- **`deploy`** só executa se **`build`** passar
- Impede builds quebrados de irem para produção

### 🔐 Uso de Secrets
- **Job `deploy`** acessa `${{ secrets.SECRET_MESSAGE }}`
- Valor do secret é mascarado nos logs
- Seguro para dados sensíveis (senhas, tokens, etc)

### 🔄 Matrix Strategy
- Testes em múltiplas versões do Node.js
- Garante compatibilidade

### 🐳 Docker Integration
- Build de imagem Docker
- Cache automático com GitHub Actions
- Pronto para push em registros

---

## 🛠️ Como Testar Localmente

### Sem GitHub (teste manual)
```bash
# Validação
npm run lint
npm test

# Build
npm run build

# Docker
docker build -t site-exemplo-cicd:latest .
```

### Com GitHub
1. Faça push para a branch `main` ou `develop`
2. Vá para **Actions** na aba do repositório
3. Clique no workflow em execução
4. Monitore o progresso em tempo real

---

## 📝 Logs e Monitoramento

No GitHub Actions, você verá:

```
✓ validate
  ├─ 📦 Instalar dependências
  ├─ 🔍 Executar linter
  └─ ✅ Executar testes

✓ build (depends on: validate)
  ├─ 🔨 Executar build
  ├─ 🐳 Setup Docker Buildx
  └─ 🏗️ Build da imagem Docker

✓ deploy (depends on: build)
  ├─ 🔓 Acessando dados secretos...
  ├─ 📝 Mensagem Secreta: [REDACTED]
  └─ ✅ Deploy simulado com sucesso!

⊙ security-scan (runs in parallel)
  ├─ 🔒 Executar Trivy vulnerability scanner
  └─ 📊 Upload de resultados de segurança
```

---

## 🆘 Troubleshooting

### ❌ Job não executa
- Verifique se o job anterior passou
- Veja os logs do job anterior para erros

### ❌ Secret não aparece
- Verifique se foi configurado corretamente em Settings
- Secrets levam alguns segundos para sincronizar
- Redacte automatic dos secrets nos logs (aparece `***`)

### ❌ Lint falha
- Rode `npm run lint` localmente
- Corrija os erros de estilo
- Faça commit e push novamente

### ❌ Testes falham
- Rode `npm test` localmente
- Corrija os testes que falharam
- Commit e push

---

## 📚 Referências

- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [Workflow Syntax](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions)
- [Using Secrets](https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions)
- [Job Dependencies (needs)](https://docs.github.com/en/actions/using-jobs/using-jobs-in-a-workflow#defining-prerequisite-jobs)

---

**Criado em:** 05/03/2026  
**Versão:** 1.0  
**Status:** ✅ Funcional
