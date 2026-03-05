// Função para testar a API
async function testAPI() {
  try {
    const response = await fetch('/api/status');
    const data = await response.json();
    
    const responseDiv = document.getElementById('api-response');
    const responseContent = document.getElementById('response-content');
    
    responseContent.textContent = JSON.stringify(data, null, 2);
    responseDiv.style.display = 'block';
    
    // Scroll para a resposta
    responseDiv.scrollIntoView({ behavior: 'smooth' });
  } catch (error) {
    alert('Erro ao testar a API: ' + error.message);
    console.error('Erro:', error);
  }
}

// Smooth scroll para os links da navegação
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#') {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth'
        });
      }
    }
  });
});

// Log de inicialização
console.log('Site de Exemplo CI/CD carregado com sucesso!');
