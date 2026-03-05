# Guia de Contribuição

Obrigado por se interessar em contribuir para o Site de Exemplo CI/CD! 🎉

## Como Começar

1. **Fork o repositório**
   ```bash
   # Via GitHub UI ou
   gh repo fork <original-repo>
   ```

2. **Clone seu fork**
   ```bash
   git clone https://github.com/seu-usuario/site-exemplo-cicd.git
   cd site-exemplo-cicd
   ```

3. **Crie uma branch para sua feature**
   ```bash
   git checkout -b feature/sua-feature
   # ou para bug fix
   git checkout -b fix/seu-bug
   ```

4. **Instale dependências**
   ```bash
   npm install
   ```

## Desenvolvimento

### Estrutura de Branches

- `main` - Produção (deploy automático)
- `develop` - Desenvolvimento (staging)
- `feature/*` - Novas features
- `fix/*` - Bug fixes
- `docs/*` - Documentação

### Padrão de Commits

Use mensagens descritivas em inglês:

```bash
# Exemplo bom
git commit -m "feat: add user authentication"
git commit -m "fix: resolve memory leak in API"
git commit -m "docs: update installation instructions"
git commit -m "style: format code with prettier"
git commit -m "test: add tests for auth module"

# Exemplo ruim
git commit -m "bugfix"
git commit -m "updates"
```

### Tipos de Commit

- `feat:` - Nova feature
- `fix:` - Bug fix
- `docs:` - Documentação
- `style:` - Formatação e estilo
- `refactor:` - Refatoração de código
- `test:` - Testes
- `chore:` - Ferramentas de build, dependências

## Código

### Padrões de Código

- Use o ESLint: `npm run lint`
- Siga o padrão de código existente
- Adicione comentários para lógica complexa
- Use nomes descritivos para variáveis e funções

### Testes

TODOS os PRs devem incluir testes:

```bash
# Executar testes
npm test

# Com cobertura
npm test -- --coverage

# Modo watch
npm test -- --watch
```

### Checklist Antes de Submeter

- [ ] Código segue o padrão ESLint (`npm run lint`)
- [ ] Testes passam (`npm test`)
- [ ] Nova feature ou bug fix tem testes
- [ ] Documentação foi atualizada
- [ ] Commit messages seguem o padrão
- [ ] Sem conflitos com `develop`

## Pull Request

### Criar um PR

1. **Push sua branch:**
   ```bash
   git push origin feature/sua-feature
   ```

2. **Abra um PR no GitHub**
   - Use este template:

```markdown
## Descrição
Uma descrição clara do que foi mudado.

## Tipo de Mudança
- [ ] Bug fix (mudança não-breaking)
- [ ] Nova feature (mudança não-breaking)
- [ ] Breaking change
- [ ] Documentação

## Como Testar
Explique como testar suas mudanças.

## Checklist
- [ ] Meu código segue o style do projeto
- [ ] Fiz linting do meu próprio código
- [ ] Adicionei testes para minhas mudanças
- [ ] Meus testes passam localmente
- [ ] Documentação atualizada
```

### Revisão de PR

- Seja receptivo a feedback
- Faça as alterações solicitadas
- Force push se necessário

## Reportar Bugs

Use GitHub Issues com este template:

```markdown
## Descrever o bug
Uma descrição clara do bug.

## Reproduzir
Passos para reproduzir o comportamento:
1. Faça isso...
2. Depois isso...
3. Errado acontece

## Comportamento esperado
O que deveria acontecer.

## Environment
- OS: [ex: Windows 11]
- Node: [ex: 18.0.0]
- npm: [ex: 8.0.0]

## Logs/Screenshots
Se aplicável, adicione logs ou screenshots.
```

## Sugerir Enhancements

Use GitHub Issues com este template:

```markdown
## Descrição do Enhancement
Uma descrição clara da ideia.

## Motivo
Por que isso seria útil?

## Solução Proposta
Como você sugere implementar?

## Contexto Adicional
Outras informações relevantes.
```

## Merge Strategy

- Squash merge para PRs pequenas
- Conventional commits
- Rebase when needed

## Code Review Checklist

Reviewers irão verificar:

- ✓ Funcionalidade correta
- ✓ Qualidade do código
- ✓ Documentação
- ✓ Testes adequados
- ✓ Performance
- ✓ Segurança
- ✓ Sem breaking changes desnecessárias

## Comunidade

- Seja respeitoso e inclusivo
- Não seja agressivo em reviews
- Ajude novos contribuidores
- Compartilhe conhecimento

## Dúvidas?

- Abra uma Discussion no GitHub
- Procure por issues relacionadas
- Veja a documentação

---

Obrigado por contribuir! 🙏
