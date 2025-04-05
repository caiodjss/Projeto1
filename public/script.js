function toggleMode() {
  const html = document.documentElement
  html.classList.toggle("light")
  const img = document.querySelector("#profile img")

  if (html.classList.contains("light")) {
    img.setAttribute("src", "./assets/avatar-light.png")
  } else {
    img.setAttribute("src", "./assets/avatar.png")
  }
}

function loadContent(content) {
  const view = document.getElementById('view-form');
  view.innerHTML = content;
}

document.getElementById('cadastro-docente').addEventListener('click', function(event) {
  event.preventDefault();
  const formCadastroDocente = `
    <h2>Cadastro de Docente</h2>
    <br>
    <form>
      <label for="nome">Nome:</label>
      <input type="text" id="nome" name="nome" required>
      <br>
      <label for="area">Área:</label>
      <input type="text" id="area" name="area" required>
      <br>
      <label for="email">Email:</label>
      <input type="email" id="email" name="email" required>
      <br>
      <button type="submit">Cadastrar</button>
    </form>
  `;
  loadContent(formCadastroDocente);
});

document.getElementById('cadastro-coordenadores').addEventListener('click', function(event) {
  event.preventDefault();
  const formCadastroCoordenador = `
    <h2>Cadastro de Coordenador</h2>
    <br>
    <form>
      <label for="nome">Nome:</label>
      <input type="text" id="nome" name="nome" required>
      <br>
      <label for="email">Email:</label>
      <input type="email" id="email" name="email" required>
      <br>
      <button type="submit">Cadastrar</button>
    </form>
  `;
  loadContent(formCadastroCoordenador);
});

document.getElementById('cadastro-turmas').addEventListener('click', function(event) {
  event.preventDefault();
  const formCadastroTurma = `
    <h2>Cadastro de Turma</h2>
    <br>
    <form>
      <label for="codigo">Código da Turma:</label>
      <input type="text" id="codigo" name="codigo" required>
      <br>
      <label for="turno">Turno:</label>
      <input type="text" id="turno" name="turno" required>
      <br>
      <button type="submit">Cadastrar</button>
    </form>
  `;
  loadContent(formCadastroTurma);
});

document.getElementById('horario-docentes').addEventListener('click', function(event) {
  event.preventDefault();
  const formHorariosDocentes = `
    <h2>Horários dos Docentes</h2>
    <br>
    <form>
      <label for="docente">Selecione o Docente:</label>
      <select id="docente" name="docente">
        <option value="docente1">Docente 1</option>
        <option value="docente2">Docente 2</option>
        <option value="docente3">Docente 3</option>
      </select>
      <br>
      <button type="submit">Consultar</button>
    </form>
  `;
  loadContent(formHorariosDocentes);
});

document.getElementById('consulta-horario-aula').addEventListener('click', function(event) {
  event.preventDefault();
  const consultarHorarioDocente = `
    <h2>Consultar Horário de Aulas por Docente</h2>
    <br>
    <form>
      <label for="docente">Selecione o Docente:</label>
      <select id="docente" name="docente">
        <option value="docente1">Docente 1</option>
        <option value="docente2">Docente 2</option>
        <option value="docente3">Docente 3</option>
      </select>
      <br>
      <button type="submit">Consultar</button>
    </form>
  `;
  loadContent(consultarHorarioDocente);
});

document.getElementById('consulta-turma').addEventListener('click', function(event) {
  event.preventDefault();
  const consultarHorarioTurma = `
    <h2>Consultar Horário da Turma</h2>
    <br>
    <form>
      <label for="turma">Selecione a Turma:</label>
      <select id="turma" name="turma">
        <option value="turma1">Turma 1</option>
        <option value="turma2">Turma 2</option>
        <option value="turma3">Turma 3</option>
      </select>
      <br>
      <button type="submit">Consultar</button>
    </form>
  `;
  loadContent(consultarHorarioTurma);
});

document.querySelector('.login-box form').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const usuario = e.target.usuario.value;
  const senha = e.target.senha.value;

  try {
    const response = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usuario, senha })
    });

    if (response.ok) {
      window.location.href = 'index.html';
    } else {
      alert('Usuário ou senha incorretos!');
    }
  } catch (error) {
    console.error('Erro:', error);
  }
});

document.querySelector('.login-box form').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  try {
    const response = await fetch('http://localhost:3000/api/usuarios/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        usuario: e.target.usuario.value,
        senha: e.target.senha.value
      })
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.message || 'Erro no login');

    localStorage.setItem('authToken', data.token);
    localStorage.setItem('userData', JSON.stringify(data.user));
    
    switch(data.user.nivel_acesso) {
      case 'coordenador':
        window.location.href = 'dashboard-coordenador.html';
        break;
      case 'docente':
        window.location.href = 'dashboard-docente.html';
        break;
      default:
        window.location.href = 'index.html';
    }

  } catch (error) {
    alert(error.message);
  }
});

document.addEventListener('DOMContentLoaded', async () => {
  const token = localStorage.getItem('authToken');
  const userData = JSON.parse(localStorage.getItem('userData') || '{}');

  if (!token && !window.location.pathname.includes('login.html')) {
    return window.location.href = 'login.html';
  }

  try {
    await fetch('http://localhost:3000/api/usuarios/me', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    if (userData.nome) {
      document.querySelector('.user-name').textContent = userData.nome;
    }
  } catch (error) {
    localStorage.removeItem('authToken');
    window.location.href = 'login.html';
  }
});

// public/script.js
document.querySelector('.login-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const response = await fetch('http://localhost:3000/api/usuarios/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      usuario: e.target.usuario.value,
      senha: e.target.senha.value
    })
  });

  if (response.ok) {
    const { token } = await response.json();
    localStorage.setItem('token', token);
    window.location.href = 'dashboard.html';
  } else {
    alert('Login falhou!');
  }
});