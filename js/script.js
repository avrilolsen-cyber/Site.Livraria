// DADOS DO SISTEMA
const registeredUsers = [];
const cartItems = [];
const libraryItems = [];

let selectedPaymentType = null;
let currentSelectedBook = null;
let activeReadingBook = null;
let currentReadingPage = 0;

/* BASE DE DADOS DOS LIVROS */
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
      "<strong>Capítulo 1: O Laboratório</strong><br><br>Olive Smith acreditava em ciência, não em relacionamentos duradouros e contos de fadas.",
      "<strong>Capítulo 2: O Beijo Inesperado</strong><br><br>Para convencer sua melhor amiga de que estava namorando, Olive beija o primeiro homem que vê no corredor: o temido Dr. Adam Carlsen."
    ]
  },
  { 
    id: 2,
    topic: "Fantasia", 
    accent: "#8FA3C9", 
    title: "O Nome do Vento", 
    author: "Patrick Rothfuss", 
    price: "49,90",
    img: "https://covers.openlibrary.org/b/isbn/9788599296493-L.jpg",
    synopsis: "A história de Kvothe, um jovem prodígio que se torna o mago mais notório que o mundo já viu.",
    pages: [
      "<strong>Prológio: Um Silêncio de Três Partes</strong><br><br>Era noite na Hospedaria Marco da Pedra, e o silêncio pertencia a três partes.",
      "<strong>Capítulo 1: Lições de Música e Magia</strong><br><br>Viajando com os Edema Ruh, Kvothe aprendeu as primeiras artes da simpatia com o velho Abenthy."
    ]
  },
  { 
    id: 3,
    topic: "Terror", 
    accent: "#A87C80", 
    title: "O Iluminado", 
    author: "Stephen King", 
    price: "45,00",
    img: "https://covers.openlibrary.org/b/isbn/9788532503251-L.jpg",
    synopsis: "Jack Torrance aceita o emprego de zelador no Hotel Overlook durante o inverno, mas o local guarda forças sinistras.",
    pages: [
      "<strong>Capítulo 1: Entrevista de Emprego</strong><br><br>Jack Torrance achava que o Hotel Overlook seria sua oportunidade perfeita de recomeço e isolamento para escrever.",
      "<strong>Capítulo 2: O Quarto 217</strong><br><br>O pequeno Danny sentia que algo terrível espreitava nos corredores silenciosos e cobertos de neve."
    ]
  }
];

/* TROCA DE TEMAS */
function setTheme(themeName, element) {
  document.body.removeAttribute('data-theme');
  if (themeName !== 'rose') {
    document.body.setAttribute('data-theme', themeName);
  }
  
  const circles = document.querySelectorAll('.theme-circle');
  circles.forEach(c => c.classList.remove('active'));
  if (element) element.classList.add('active');
}

/* NAVEGAÇÃO ENTRE TELAS */
function navigateTo(screenId, btnElement) {
  // Esconde todas as telas ativas
  const screens = document.querySelectorAll('.screen');
  screens.forEach(s => s.classList.remove('active'));
  
  // Mostra apenas a tela selecionada
  const targetScreen = document.getElementById(screenId);
  if (targetScreen) {
    targetScreen.classList.add('active');
  }

  // Atualiza botões da barra superior
  const navBtns = document.querySelectorAll('.nav-btn');
  navBtns.forEach(b => b.classList.remove('active'));

  if (btnElement) {
    btnElement.classList.add('active');
  } else {
    const activeNav = document.getElementById(`nav-${screenId}`);
    if (activeNav) activeNav.classList.add('active');
  }

  // Atualiza dados conforme a tela aberta
  if (screenId === 'screen-cart') renderCart();
  if (screenId === 'screen-library') renderLibrary();
}

/* SISTEMA DE LOGIN E CADASTRO */
function handleLogin() {
  const user = document.getElementById('login-username').value.trim();
  const pass = document.getElementById('login-password').value.trim();
  const errorMsg = document.getElementById('login-error-msg');

  if (!user || !pass) {
    errorMsg.innerText = "Preencha todos os campos!";
    errorMsg.style.display = "block";
    return;
  }

  const found = registeredUsers.find(u => u.username === user && u.password === pass);

  if (found || (user === "admin" && pass === "1234")) {
    errorMsg.style.display = "none";
    document.getElementById('main-header').style.display = 'flex';
    renderBooksGrid(booksData);
    navigateTo('screen-home');
  } else {
    errorMsg.innerText = "Usuário ou senha incorretos! (Ou cadastre-se no botão abaixo)";
    errorMsg.style.display = "block";
  }
}

function handleSignup() {
  const user = document.getElementById('signup-username').value.trim();
  const pass = document.getElementById('signup-password').value.trim();
  const errorMsg = document.getElementById('signup-error-msg');
  const successMsg = document.getElementById('signup-success-msg');

  if (!user || !pass) {
    errorMsg.style.display = "block";
    successMsg.style.display = "none";
    return;
  }

  registeredUsers.push({ username: user, password: pass });
  errorMsg.style.display = "none";
  successMsg.style.display = "block";

  setTimeout(() => {
    successMsg.style.display = "none";
    navigateTo('screen-login');
  }, 1500);
}

/* CATÁLOGO E FILTROS */
function renderBooksGrid(books) {
  const grid = document.getElementById('book-grid');
  grid.innerHTML = '';

  books.forEach(book => {
    const card = document.createElement('div');
    card.className = 'book-card';
    card.style.setProperty('--book-accent', book.accent);
    card.onclick = () => openBookModal(book);

    card.innerHTML = `
      <img src="${book.img}" alt="${book.title}">
      <strong style="font-size:14px; margin-top:5px; color:var(--text-main);">${book.title}</strong>
      <p style="font-size:12px; color:var(--text-muted);">${book.author}</p>
      <p style="font-size:14px; font-weight:bold; color:var(--primary-color); margin-top:6px;">R$ ${book.price}</p>
    `;
    grid.appendChild(card);
  });
}

function toggleTopicDropdown() {
  const menu = document.getElementById('topic-dropdown-menu');
  menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
}

function filterBooks(topic) {
  document.getElementById('selected-topic-label').innerText = topic === 'Todos' ? 'Todos os Tópicos' : topic;
  document.getElementById('topic-dropdown-menu').style.display = 'none';

  if (topic === 'Todos') {
    renderBooksGrid(booksData);
  } else {
    const filtered = booksData.filter(b => b.topic === topic);
    renderBooksGrid(filtered);
  }
}

/* PESQUISA */
function toggleDropdown() {
  const menu = document.getElementById('dropdown-menu');
  menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
}

function handleSearch() {
  const query = document.getElementById('search-input').value.toLowerCase().trim();
  const placeholder = document.getElementById('search-placeholder');
  const resultsGrid = document.getElementById('search-results-grid');

  if (!query) {
    placeholder.style.display = 'flex';
    resultsGrid.style.display = 'none';
    return;
  }

  const results = booksData.filter(b => 
    b.title.toLowerCase().includes(query) || b.author.toLowerCase().includes(query)
  );

  placeholder.style.display = 'none';
  resultsGrid.style.display = 'grid';
  resultsGrid.innerHTML = '';

  if (results.length === 0) {
    resultsGrid.innerHTML = '<p style="grid-column: 1/-1; text-align:center; color:var(--text-muted);">Nenhum livro encontrado.</p>';
    return;
  }

  results.forEach(book => {
    const card = document.createElement('div');
    card.className = 'book-card';
    card.style.setProperty('--book-accent', book.accent);
    card.onclick = () => openBookModal(book);

    card.innerHTML = `
      <img src="${book.img}" alt="${book.title}">
      <strong style="font-size:14px; color:var(--text-main);">${book.title}</strong>
      <p style="font-size:12px; color:var(--text-muted);">${book.author}</p>
      <p style="font-size:14px; font-weight:bold; color:var(--primary-color); margin-top:6px;">R$ ${book.price}</p>
    `;
    resultsGrid.appendChild(card);
  });
}

function filterSearchGenre(genre) {
  document.getElementById('dropdown-menu').style.display = 'none';
  const placeholder = document.getElementById('search-placeholder');
  const resultsGrid = document.getElementById('search-results-grid');

  const results = genre === 'Todos' ? booksData : booksData.filter(b => b.topic === genre);

  placeholder.style.display = 'none';
  resultsGrid.style.display = 'grid';
  resultsGrid.innerHTML = '';

  results.forEach(book => {
    const card = document.createElement('div');
    card.className = 'book-card';
    card.style.setProperty('--book-accent', book.accent);
    card.onclick = () => openBookModal(book);

    card.innerHTML = `
      <img src="${book.img}" alt="${book.title}">
      <strong style="font-size:14px; color:var(--text-main);">${book.title}</strong>
      <p style="font-size:12px; color:var(--text-muted);">${book.author}</p>
      <p style="font-size:14px; font-weight:bold; color:var(--primary-color); margin-top:6px;">R$ ${book.price}</p>
    `;
    resultsGrid.appendChild(card);
  });
}

/* MODAL DO LIVRO */
function openBookModal(book) {
  currentSelectedBook = book;
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
  if (currentSelectedBook) {
    const exists = cartItems.some(item => item.id === currentSelectedBook.id);
    if (!exists) {
      cartItems.push(currentSelectedBook);
    }
  }
  closeModal('modal-book-detail');
  navigateTo('screen-cart');
}

/* CARRINHO & PAGAMENTO */
function renderCart() {
  const container = document.getElementById('cart-items-container');
  container.innerHTML = '';

  if (cartItems.length === 0) {
    container.innerHTML = '<p class="empty-cart-msg">Seu carrinho está vazio.</p>';
    document.getElementById('checkout-btn').disabled = true;
    return;
  }

  document.getElementById('checkout-btn').disabled = false;

  cartItems.forEach((book, index) => {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'cart-item';
    itemDiv.innerHTML = `
      <img src="${book.img}" alt="${book.title}">
      <div style="flex:1;">
        <strong style="font-size:14px; color:var(--text-main);">${book.title}</strong>
        <p style="font-size:12px; color:var(--text-muted);">${book.author}</p>
        <div class="price-row">
          <span style="font-weight:bold; color:var(--primary-color);">R$ ${book.price}</span>
        </div>
      </div>
      <button onclick="removeFromCart(${index})" style="background:none; border:none; color:#D9534F; cursor:pointer; font-weight:bold;">✕</button>
    `;
    container.appendChild(itemDiv);
  });
}

function removeFromCart(index) {
  cartItems.splice(index, 1);
  renderCart();
}

function selectPaymentMethod(type, element) {
  selectedPaymentType = type;
  const options = document.querySelectorAll('.payment-option');
  options.forEach(opt => opt.classList.remove('selected'));
  if (element) element.classList.add('selected');

  document.getElementById('form-pix').style.display = type === 'pix' ? 'block' : 'none';
  document.getElementById('form-card').style.display = (type === 'credito' || type === 'debito') ? 'block' : 'none';
  document.getElementById('form-boleto').style.display = type === 'boleto' ? 'block' : 'none';
  
  document.getElementById('validation-error-msg').style.display = 'none';
}

function validateAndOpenModal() {
  const errorMsg = document.getElementById('validation-error-msg');

  if (!selectedPaymentType || cartItems.length === 0) {
    errorMsg.style.display = 'block';
    return;
  }

  let isValid = false;
  if (selectedPaymentType === 'pix') {
    isValid = !!document.getElementById('pix-cpf').value.trim();
  } else if (selectedPaymentType === 'credito' || selectedPaymentType === 'debito') {
    const num = document.getElementById('card-number').value.trim();
    const name = document.getElementById('card-name').value.trim();
    isValid = num && name;
  } else if (selectedPaymentType === 'boleto') {
    const name = document.getElementById('boleto-name').value.trim();
    const cpf = document.getElementById('boleto-cpf').value.trim();
    isValid = name && cpf;
  }

  if (!isValid) {
    errorMsg.style.display = 'block';
    return;
  }

  errorMsg.style.display = 'none';

  const total = cartItems.reduce((acc, book) => acc + parseFloat(book.price.replace(',', '.')), 0);
  document.getElementById('total-price-label').innerText = `Total: R$ ${total.toFixed(2).replace('.', ',')} - Confirmar compra?`;
  
  document.getElementById('modal-confirm').style.display = 'flex';
}

function confirmPurchase() {
  closeModal('modal-confirm');
  
  cartItems.forEach(book => {
    if (!libraryItems.some(l => l.id === book.id)) {
      libraryItems.push(book);
    }
  });

  cartItems.length = 0;
  renderCart();

  document.getElementById('modal-success').style.display = 'flex';
}

/* BIBLIOTECA & LEITOR DE LIVROS */
function renderLibrary() {
  const grid = document.getElementById('library-grid');
  grid.innerHTML = '';

  if (libraryItems.length === 0) {
    grid.innerHTML = '<p style="grid-column: 1/-1; text-align:center; color:var(--text-muted);">Sua biblioteca está vazia. Adquira livros no carrinho!</p>';
    return;
  }

  libraryItems.forEach(book => {
    const card = document.createElement('div');
    card.className = 'biblio-card';
    card.innerHTML = `
      <img src="${book.img}" alt="${book.title}">
      <strong style="font-size:14px; color:var(--text-main);">${book.title}</strong>
      <p style="font-size:12px; color:var(--text-muted);">${book.author}</p>
      <button class="biblio-btn" onclick="openReader(${book.id})">Ler Agora</button>
    `;
    grid.appendChild(card);
  });
}

function openReader(bookId) {
  const book = libraryItems.find(b => b.id === bookId);
  if (!book) return;

  activeReadingBook = book;
  currentReadingPage = 0;

  document.getElementById('reader-book-title').innerText = book.title;
  document.getElementById('reader-book-author').innerText = book.author;
  document.getElementById('reader-total-pages').innerText = book.pages ? book.pages.length : 1;

  updateReaderContent();
  navigateTo('screen-reader');
}

function updateReaderContent() {
  if (!activeReadingBook || !activeReadingBook.pages) return;

  const contentArea = document.getElementById('reader-text-content');
  contentArea.innerHTML = activeReadingBook.pages[currentReadingPage] || "Página em branco.";

  document.getElementById('reader-current-page').innerText = currentReadingPage + 1;
  document.getElementById('reader-bookmark-page').innerText = currentReadingPage + 1;

  document.getElementById('btn-prev-page').disabled = currentReadingPage === 0;
  document.getElementById('btn-next-page').disabled = currentReadingPage === activeReadingBook.pages.length - 1;
}

function changeReaderPage(delta) {
  if (!activeReadingBook || !activeReadingBook.pages) return;
  const newPage = currentReadingPage + delta;

  if (newPage >= 0 && newPage < activeReadingBook.pages.length) {
    currentReadingPage = newPage;
    updateReaderContent();
  }
}