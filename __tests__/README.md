# Testes Automatizados

Este diretório contém os testes automatizados do projeto.

## Estrutura

- `server.test.js` - Testes da API do servidor

## Como executar

```bash
npm test
```

## Cobertura de testes

```bash
npm test -- --coverage
```

## Testes incluídos

### GET /
- Verifica se a página principal retorna status 200

### GET /api/status
- Retorna status ok
- Contém propriedade message
- Contém timestamp válido

### GET /api/info
- Retorna informações da aplicação
- Contém versão correta
- Contém propriedade environment

## Adicionando novos testes

1. Crie um novo arquivo `*.test.js` neste diretório
2. Importe as dependências necessárias
3. Use `describe()` e `it()` para estruturar os testes
4. Execute `npm test` para executar

Exemplo:
```javascript
describe('Novo Endpoint', () => {
  it('deve retornar sucesso', async () => {
    const response = await request(app).get('/novo');
    expect(response.status).toBe(200);
  });
});
```
