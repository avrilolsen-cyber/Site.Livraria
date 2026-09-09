// Estado da Aplicação
let livroSelecionado = null;
let meusLivros = [];

document.addEventListener('DOMContentLoaded', () => {
  // Evento de Login
  const formLogin = document.getElementById('form-login');
  if (formLogin) {
    formLogin.addEventListener('submit', fazerLogin);
  }

  // Eventos dos botões de navegação
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');
      mudarAba(targetTab, btn);
    });
  });

  // Eventos dos botões de comprar nos cards
  const buyButtons = document.querySelectorAll('.btn-buy');
  buyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const bookTitle = btn.getAttribute('data-book');
      adicionarEIrCompras(bookTitle);
    });
  });
});

// Função para simular o login
function fazerLogin(event) {
  event.preventDefault();
  document.getElementById('screen-login').classList.add('hidden');
  document.getElementById('app-main').classList.remove('hidden');
}

// Navegação entre as 4 abas
function mudarAba(nomeAba, elementoBtn) {
  // Esconde todas as abas
  document.getElementById('tab-casa').classList.add('hidden');
  document.getElementById('tab-pesquisa').classList.add('hidden');
  document.getElementById('tab-compras').classList.add('hidden');
  document.getElementById('tab-biblioteca').classList.add('hidden');

  // Remove estado ativo dos botões do menu
  const botoes = document.querySelectorAll('.nav-item');
  botoes.forEach(btn => btn.classList.remove('active'));

  // Mostra a aba selecionada
  document.getElementById('tab-' + nomeAba).classList.remove('hidden');
  if (elementoBtn) {
    elementoBtn.classList.add('active');
  }
}

// Adicionar livro ao carrinho e vai para aba compras
function adicionarEIrCompras(nomeLivro) {
  livroSelecionado = nomeLivro;
  renderizarCarrinho();
  
  // Troca para a aba de compras no menu
  const btnCompras = document.querySelector('.nav-item[data-tab="compras"]');
  mudarAba('compras', btnCompras);
}

// Renderiza a tela de checkout com verde (confirmar) e vermelho (cancelar)
function renderizarCarrinho() {
  const container = document.getElementById('carrinho-itens');
  if (!livroSelecionado) {
    container.innerHTML = '<p class="empty-msg">Seu carrinho está vazio.</p>';
    return;
  }

  container.innerHTML = `
    <div class="checkout-box">
      <h4 class="checkout-title">${livroSelecionado}</h4>
      <p class="checkout-price">Total: R$ 29,90</p>
      
      <p class="checkout-label">Forma de Pagamento:</p>
      <select class="checkout-select">
        <option>Pix</option>
        <option>Cartão de Crédito</option>
      </select>

      <div class="checkout-actions">
        <button class="btn-action btn-green" style="flex: 1; padding: 10px;" id="btn-confirmar-compra">Confirmar Compra</button>
        <button class="btn-action btn-red" style="padding: 10px;" id="btn-cancelar-compra">Cancelar</button>
      </div>
    </div>
  `;

  // Adiciona ouvintes para os novos botões criados dinamicamente
  document.getElementById('btn-confirmar-compra').addEventListener('click', confirmarCompra);
  document.getElementById('btn-cancelar-compra').addEventListener('click', cancelarCompra);
}

function cancelarCompra() {
  livroSelecionado = null;
  renderizarCarrinho();
}

function confirmarCompra() {
  if (livroSelecionado) {
    meusLivros.push(livroSelecionado);
    livroSelecionado = null;
    renderizarCarrinho();
    renderizarBiblioteca();
    
    // Direciona para a Biblioteca
    const btnBiblioteca = document.querySelector('.nav-item[data-tab="biblioteca"]');
    mudarAba('biblioteca', btnBiblioteca);
  }
}

function renderizarBiblioteca() {
  const container = document.getElementById('meus-livros');
  if (meusLivros.length === 0) {
    container.innerHTML = '<p class="empty-msg">Você ainda não possui livros adquiridos.</p>';
    return;
  }

  let html = '<div class="book-grid">';
  meusLivros.forEach(livro => {
    html += `
      <div class="book-card">
        <div class="book-cover">Leitura</div>
        <div class="book-title">${livro}</div>
        <button class="btn-action btn-green" style="width: 100%; margin-top: 5px;">Ler Agora</button>
      </div>
    `;
  });
  html += '</div>';
  container.innerHTML = html;
}