const listContainer = document.getElementById("users-list");
const form = document.getElementById("user-form");

// --- Funções de Validação ---
function validateText(t) {
  return t.length >= 3 && t.length <= 50;
}

function validateEmail(e) {
  const r = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})$/;
  return r.test(e);
}

function validateAge(a) {
  return a > 0 && a < 120;
}

// --- Carregar Usuários da API ---
async function loadUsers() {
  try {
    const r = await fetch("https://dummyjson.com/users");
    const d = await r.json();
    d.users.forEach(u => addUserToList({
      firstName: u.firstName,
      lastName: u.lastName,
      email: u.email,
      age: u.age,
      image: u.image
    }));
  } catch (e) {
    console.warn("Não foi possível carregar API, o sistema continuará funcionando localmente.");
  }
}

// --- Adicionar Card na Tela ---
function addUserToList(u) {
  const d = document.createElement("div");
  d.className = "card user-card";
  d.innerHTML = `
    <div class="thumb"><img src="${u.image}" alt="${u.firstName}"></div>
    <div class="meta">
      <h4>${u.firstName} ${u.lastName}</h4>
      <p class="muted">${u.email} · ${u.age} anos</p>
    </div>
    <button class="remove" title="Remover">✕</button>
  `;

  // Botão de remover com animação
  d.querySelector(".remove").addEventListener("click", () => {
    d.classList.add("removing");
    setTimeout(() => d.remove(), 220);
  });

  listContainer.appendChild(d);
}

// --- Envio do Formulário ---
form.addEventListener("submit", e => {
  e.preventDefault();

  const f = form.firstName.value.trim();
  const l = form.lastName.value.trim();
  const m = form.email.value.trim();
  const a = Number(form.age.value);
  
  // --- NOVA LÓGICA DE AVATAR ---
  // Se o campo de imagem estiver vazio, cria um robô com o nome da pessoa
  let i = form.image.value.trim();
  if (!i) {
      const avatarName = `${f}+${l}`;
      i = `https://api.dicebear.com/9.x/bottts-neutral/svg?seed=${avatarName}`;
  }
  // -----------------------------

  // Validações
  if (!validateText(f) || !validateText(l)) {
    alert("Nome e sobrenome entre 3 e 50 caracteres.");
    return;
  }
  if (!validateEmail(m)) {
    alert("Email inválido.");
    return;
  }
  if (!validateAge(a)) {
    alert("Idade inválida.");
    return;
  }

  // Adiciona na lista e limpa o formulário
  addUserToList({
    firstName: f,
    lastName: l,
    email: m,
    age: a,
    image: i
  });
  
  form.reset();
});

// Inicializa o carregamento da API
loadUsers();