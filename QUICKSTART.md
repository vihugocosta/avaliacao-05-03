# 🚀 Quick Start - Guia Rápido

## 60 Segundos para Começar

### 1️⃣ Instalar Dependências

```bash
npm install
```

### 2️⃣ Iniciar o Servidor

```bash
npm start
```

### 3️⃣ Abrir no Navegador

```
http://localhost:3000
```

✅ **Pronto!** O site está rodando! Clique no botão "Testar API" para usar a aplicação.

---

## 🐳 Com Docker (Alternativa)

```bash
# Iniciar com Docker Compose
docker-compose up

# Abrir
http://localhost:3000

# Parar
docker-compose down
```

---

## 🧪 Executar Testes

```bash
npm test
```

---

## 🔗 Links Úteis

- **[README.md](README.md)** - Documentação completa
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Deploy em produção
- **[ARCHITECTURE.md](ARCHITECTURE.md)** - Arquitetura da app
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - Contribuir para o projeto

---

## 📝 Próximos Passos

1. ✅ Instalar dependências (`npm install`)
2. ✅ Iniciar servidor (`npm start`)
3. ✅ Explorar interface web
4. ✅ Testar API endpoints
5. ✅ Ler documentação completa
6. ✅ Customizar para suas necessidades

---

## 🆘 Troubleshooting

**Erro: "Port 3000 already in use"**
```bash
# Usar porta diferente
PORT=3001 npm start
```

**Erro: "npm not found"**
```bash
# Instalar Node.js em https://nodejs.org
```

**Erro ao testar API:**
- Certifique-se que servidor está rodando
- Verifique console do navegador (F12)
- Veja se a porta está correta

---

## 💡 Dicas

- Use `npm run dev` para desenvolvimento com reinicialização automática
- Leia `.env.example` para ver variáveis de ambiente disponíveis
- Use `make help` para ver comandos disponíveis (se tiver `make`)
- Verifique `__tests__/` para ver exemplos de testes

---

**Bem-vindo ao Site de Exemplo CI/CD! 🎉**

Para documentação detalhada, veja [README.md](README.md)
