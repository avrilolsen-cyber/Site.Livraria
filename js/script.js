
const registeredUsers = [];
const cartItems = [];
let selectedPaymentType = null;

/* DADOS DOS LIVROS COM CORES EXCLUSIVAS (ACCENT COLOR) */
const booksData = [
  { 
    id: 0,
    topic: "Romance", 
    accent: "#E8A5B0",
    title: "Melhor do Que Nos Filmes", 
    author: "Lynn Painter", 
    price: "39,90",
    img: "https://covers.openlibrary.org/b/isbn/9786555607284-L.jpg",
    synopsis: "Liz Buxbaum precisa da ajuda de seu vizinho insuportável, Wes Bennett, para chamar a atenção de seu antigo crush, Michael. Mas ao simularem momentos de romance, Liz descobre que o amor pode ser surpreendente.",
    pages: [
      "<strong>Capítulo 1: O Vizinho Insuportável</strong><br><br>Liz Buxbaum sempre viveu rodeada de comédias românticas. Desde pequena, ela acreditava que sua vida teria uma trilha sonora perfeita e um 'felizes para sempre' digno de cinema.",
      "<strong>Capítulo 1 (Cont.): A Vaga de Estacionamento</strong><br><br>A única coisa no caminho do romance de Liz era Wes Bennett. Wesley, seu vizinho e inimigo mortal desde a infância, parecia existir apenas para irritá-la.",
      "<strong>Capítulo 2: O Retorno de Michael</strong><br><br>Quando Michael, sua paixão de infância, voltou para a cidade, Liz soube que precisava agir. Mas para se aproximar dele, precisaria do plano mais arriscado de todos: pedir a ajuda de Wes."
    ]
  },
  { 
    id: 1,
    topic: "Romance", 
    accent: "#C3A2C8",
    title: "Love Hypothesis", 
    author: "Ali Hazelwood", 
    price: "29,90",
    img: "https://covers.openlibrary.org/b/isbn/9780593336823-L.jpg",
    synopsis: "Uma aluna de doutorado em biologia resolve inventar um namoro de mentira com um professor jovem e ranzinza.",
    pages: [
      "<strong>Capítulo 1: O Experimento</strong><br><br>Olive Smith, doutoranda em Biologia, não acreditava em relacionamentos duradouros. Mas para convencer sua melhor amiga de que estava feliz, ela resolve beijar o primeiro homem que encontra no corredor.",
      "<strong>Capítulo 1 (Cont.): O Beijo Inesperado</strong><br><br>Para sua surpresa, o homem era Adam Carlsen — o jovem e temido professor da universidade. Surpreendentemente, ele concorda em manter a farsa de um namoro de mentira.",
      "<strong>Capítulo 2: Hipótese Confirmada?</strong><br><br>Conforme encontros falsos em cafeterias acontecem, Olive percebe que a verdadeira ciência do amor é muito mais complexa e imprevisível do que qualquer equação em seu laboratório."
    ]
  },
  { 
    id: 2,
    topic: "Fantasia", 
    accent: "#81B29A",
    title: "O Nome do Vento", 
    author: "Patrick Rothfuss", 
    price: "49,90",
    img: "https://covers.openlibrary.org/b/isbn/9788580410051-L.jpg",
    synopsis: "A jornada lendária de Kvothe, um jovem com talentos mágicos extraordinários que se torna o mago mais poderoso e temido do mundo.",
    pages: [
      "<strong>Capítulo 1: Um Silêncio de Três Partes</strong><br><br>A hospedaria Marco da Pedra estava em silêncio. Era um silêncio em três partes. A parte mais óbvia era uma quietude profunda e soturna, feita de coisas que faltavam.",
      "<strong>Capítulo 2: A Infância com a Troup</strong><br><br>Meu nome é Kvothe. Fui criado na trupe de artistas mambembes do meu pai. Aprendi a tocar alaúde antes de caminhar e a atuar antes de ler.",
      "<strong>Capítulo 3: A Universidade</strong><br><br>A magia não é como nos contos de fadas. Ela exige mente afiada, concentração extrema e o conhecimento dos nomes verdadeiros de todas as coisas."
    ]
  },
  { 
    id: 3,
    topic: "Terror", 
    accent: "#9D8189",
    title: "O Iluminado", 
    author: "Stephen King", 
    price: "44,90",
    img: "https://covers.openlibrary.org/b/isbn/9788532503251-L.jpg",
    synopsis: "Jack Torrance aceita o emprego de zelador no isolado Hotel Overlook durante o inverno, mas forças sombrias começam a influenciar sua mente.",
    pages: [
      "<strong>Capítulo 1: A Entrevista</strong><br><br>Jack Torrance achava que o Hotel Overlook era sua última chance de recomeçar a vida e unir novamente sua família após os erros do passado.",
      "<strong>Capítulo 2: O Hotel Isolado</strong><br><br>A neve começou a cair fortemente, bloqueando todas as estradas das montanhas. O Overlook agora estava completamente isolado do resto do mundo.",
      "<strong>Capítulo 3: Sussurros nos Corredores</strong><br><br>O pequeno Danny sentia que o hotel guardava memórias terríveis. E que essas memórias ganhavam vida quando as luzes se apagavam."
    ]
  },
  { 
    id: 4,
    topic: "Ficção Científica", 
    accent: "#8D99AE",
    title: "Duna", 
    author: "Frank Herbert", 
    price: "59,90",
    img: "https://covers.openlibrary.org/b/isbn/9788576573135-L.jpg",
    synopsis: "Num planeta árido e desértico chamado Arrakis, jovem Paul Atreides precisa enfrentar intrigas políticas para proteger o bem mais valioso do universo: a especiaria.",
    pages: [
      "<strong>Capítulo 1: O Teste do Gom Jabbar</strong><br><br>A idosa Bene Gesserit observava o jovem Paul. 'Um homem precisa ter controle total sobre sua mente e sobre sua dor', alertou ela.",
      "<strong>Capítulo 2: Chegada a Arrakis</strong><br><br>Arrakis era um deserto infinito. Sem água, sem chuva. Mas ali estava o segredo do império galáctico: a preciosa mistura chamada especiaria.",
      "<strong>Capítulo 3: Os Vermes das Arenas</strong><br><br>O som rítmico no solo despertava os monstros gigantescos que habitavam sob a areia escaldante."
    ]
  },
  { 
    id: 5,
    topic: "Desenvolvimento Pessoal", 
    accent: "#D4A373",
    title: "Hábitos Atômicos", 
    author: "James Clear", 
    price: "35,00",
    img: "https://covers.openlibrary.org/b/isbn/9788550807560-L.jpg",
    synopsis: "Um método revolucionário com pequenas mudanças diárias para transformar sua rotina, criar bons hábitos e alcançar resultados extraordinários.",
    pages: [
      "<strong>Capítulo 1: O Poder das Mudanças de 1%</strong><br><br>Pequenas melhorias diárias parecem insignificantes no começo, mas ao longo do tempo geram uma transformação gigante na sua vida.",
      "<strong>Capítulo 2: Identidade e Hábitos</strong><br><br>Não foque apenas no que você quer alcançar, mas em quem você quer se tornar. Bons hábitos mudam sua autoimagem.",
      "<strong>Capítulo 3: As Quatro Leis da Mudança</strong><br><br>Torne o hábito claro, atraente, fácil e satisfatório."
    ]
  }
];

const userLibrary = [ ...booksData.slice(0, 2) ]; 
let selectedBookForModal = null;
let activeReadingBook = null;
let currentReaderPageIdx = 0;

/* INICIALIZAÇÃO */
window.onload = () => {
  renderBooks(booksData);
  renderLibrary();
  renderCart();
};

/* CONTROLE DE TEMAS */
function setTheme(themeName, element) {
  document.documentElement.setAttribute('data-theme', themeName);
  document.querySelectorAll('.theme-circle').forEach(el => el.classList.remove('active'));
  if (element) element.classList.add('active');
}

/* NAVEGAÇÃO ENTRE TELAS */
function navigateTo(screenId, btnElement) {
  document.querySelectorAll('.screen').forEach(screen => screen.classList.remove('active'));
  document.getElementById(screenId).classList.add('active');

  if (btnElement) {
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    btnElement.classList.add('active');
  }
}

/* AUTENTICAÇÃO */
function handleLogin() {
  const user = document.getElementById('login-username').value.trim();
  const pass = document.getElementById('login-password').value.trim();
  const errorMsg = document.getElementById('login-error-msg');

  if (user !== "" && pass !== "") {
    errorMsg.style.display = 'none';
    document.getElementById('main-header').style.display = 'flex';
    navigateTo('screen-home', document.getElementById('nav-screen-home'));
  } else {
    errorMsg.style.display = 'block';
  }
}

function handleSignup() {
  const user = document.getElementById('signup-username').value.trim();
  const pass = document.getElementById('signup-password').value.trim();
  const errorMsg = document.getElementById('signup-error-msg');
  const successMsg = document.getElementById('signup-success-msg');

  if (user !== "" && pass !== "") {
    registeredUsers.push({ user, pass });
    errorMsg.style.display = 'none';
    successMsg.style.display = 'block';
    setTimeout(() => {
      successMsg.style.display = 'none';
      navigateTo('screen-login');
    }, 1500);
  } else {
    errorMsg.style.display = 'block';
  }
}

/* FILTRO E RENDERIZAÇÃO DE LIVROS NA CASA */
function toggleTopicDropdown() {
  const menu = document.getElementById('topic-dropdown-menu');
  menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
}

function filterBooks(topic) {
  document.getElementById('selected-topic-label').innerText = topic === 'Todos' ? 'Todos os Tópicos' : topic;
  document.getElementById('topic-dropdown-menu').style.display = 'none';

  if (topic === 'Todos') {
    renderBooks(booksData);
  } else {
    const filtered = booksData.filter(b => b.topic === topic);
    renderBooks(filtered);
  }
}

function renderBooks(list) {
  const grid = document.getElementById('book-grid');
  grid.innerHTML = "";

  list.forEach(book => {
    const card = document.createElement('div');
    card.className = 'book-card';
    card.style.setProperty('--book-accent', book.accent);
    card.onclick = () => openBookModal(book);

    card.innerHTML = `
      <img src="${book.img}" alt="${book.title}">
      <strong>${book.title}</strong>
      <p style="font-size: 12px; color: var(--text-muted);">${book.author}</p>
      <p style="font-weight: bold; color: var(--primary-color); margin-top: 8px;">R$ ${book.price}</p>
    `;
    grid.appendChild(card);
  });
}

/* MODAL DE DETALHES DO LIVRO */
function openBookModal(book) {
  selectedBookForModal = book;
  document.getElementById('modal-book-img').src = book.img;
  document.getElementById('modal-book-title').innerText = book.title;
  document.getElementById('modal-book-author').innerText = book.author;
  document.getElementById('modal-book-synopsis').innerText = book.synopsis;
  document.getElementById('modal-book-detail').style.display = 'flex';
}

function closeModal(modalId) {
  document.getElementById(modalId).style.display = 'none';
}

function addToCartAndNavigate() {
  if (selectedBookForModal) {
    if (!cartItems.some(item => item.id === selectedBookForModal.id)) {
      cartItems.push(selectedBookForModal);
      renderCart();
    }
    closeModal('modal-book-detail');
    navigateTo('screen-cart', document.getElementById('nav-screen-cart'));
  }
}

/* PESQUISA */
function toggleDropdown() {
  const dropdown = document.getElementById('dropdown-menu');
  dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
}

/* CARRINHO E COMPRAS */
function selectPaymentMethod(type, element) {
  selectedPaymentType = type;
  document.querySelectorAll('.payment-option').forEach(el => el.classList.remove('selected'));
  element.classList.add('selected');

  document.querySelectorAll('.payment-details-form').forEach(f => f.style.display = 'none');
  if (type === 'pix') document.getElementById('form-pix').style.display = 'block';
  if (type === 'credito' || type === 'debito') document.getElementById('form-card').style.display = 'block';
  if (type === 'boleto') document.getElementById('form-boleto').style.display = 'block';
  document.getElementById('validation-error-msg').style.display = 'none';
}

function renderCart() {
  const container = document.getElementById('cart-items-container');
  container.innerHTML = "";

  if (cartItems.length === 0) {
    container.innerHTML = `<p class="empty-cart-msg">Seu carrinho está vazio 🌸</p>`;
    return;
  }

  cartItems.forEach((item, index) => {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'cart-item';
    itemDiv.innerHTML = `
      <img src="${item.img}" alt="${item.title}">
      <div style="flex: 1;">
        <strong>${item.title}</strong>
        <p style="font-size: 12px; color: var(--text-muted);">${item.author}</p>
        <div class="price-row">
          <span>Preço: <strong>R$ ${item.price}</strong></span>
        </div>
      </div>
      <button onclick="removeFromCart(${index})" style="background: none; border: none; color: #D9534F; cursor: pointer; font-size: 18px;">✕</button>
    `;
    container.appendChild(itemDiv);
  });
}

function removeFromCart(index) {
  cartItems.splice(index, 1);
  renderCart();
}

function validateAndOpenModal() {
  const errorMsg = document.getElementById('validation-error-msg');
  if (cartItems.length === 0) {
    alert("Adicione pelo menos um livro ao carrinho!");
    return;
  }

  if (!selectedPaymentType) {
    errorMsg.style.display = 'block';
    return;
  }

  errorMsg.style.display = 'none';
  let total = cartItems.reduce((acc, b) => acc + parseFloat(b.price.replace(',', '.')), 0);
  document.getElementById('total-price-label').innerText = `Total: R$ ${total.toFixed(2).replace('.', ',')} - Confirmar compra?`;
  document.getElementById('modal-confirm').style.display = 'flex';
}

function confirmPurchase() {
  closeModal('modal-confirm');
  cartItems.forEach(item => {
    if (!userLibrary.some(b => b.id === item.id)) {
      userLibrary.push(item);
    }
  });
  cartItems.length = 0;
  renderCart();
  renderLibrary();
  document.getElementById('modal-success').style.display = 'flex';
}

/* BIBLIOTECA E LEITOR */
function renderLibrary() {
  const grid = document.getElementById('library-grid');
  grid.innerHTML = "";

  userLibrary.forEach(book => {
    const card = document.createElement('div');
    card.className = 'biblio-card';
    card.innerHTML = `
      <img src="${book.img}" alt="${book.title}">
      <strong>${book.title}</strong>
      <p style="font-size: 12px; color: var(--text-muted);">${book.author}</p>
      <button class="biblio-btn" onclick="openReader(${book.id})">Ler Livro</button>
    `;
    grid.appendChild(card);
  });
}

function openReader(bookId) {
  activeReadingBook = userLibrary.find(b => b.id === bookId);
  if (!activeReadingBook) return;

  currentReaderPageIdx = 0;
  document.getElementById('reader-book-title').innerText = activeReadingBook.title;
  document.getElementById('reader-book-author').innerText = activeReadingBook.author;
  document.getElementById('reader-total-pages').innerText = activeReadingBook.pages.length;
  updateReaderContent();

  navigateTo('screen-reader');
}

function updateReaderContent() {
  if (!activeReadingBook) return;
  const textContent = activeReadingBook.pages[currentReaderPageIdx];
  document.getElementById('reader-text-content').innerHTML = textContent;
  document.getElementById('reader-current-page').innerText = currentReaderPageIdx + 1;
  document.getElementById('reader-bookmark-page').innerText = currentReaderPageIdx + 1;

  document.getElementById('btn-prev-page').disabled = currentReaderPageIdx === 0;
  document.getElementById('btn-next-page').disabled = currentReaderPageIdx === activeReadingBook.pages.length - 1;
}

function changeReaderPage(delta) {
  currentReaderPageIdx += delta;
  updateReaderContent();
}