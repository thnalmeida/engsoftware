// Função para cadastrar o usuário
function cadastrarUsuario() {
    const nome = document.getElementById('nome').value;
    const cpf = document.getElementById('cpf').value;
    const nivel = document.getElementById('nivel').value;
    const endereco = document.getElementById('endereco').value;
    const telefone = document.getElementById('telefone').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    // Simulação de um banco de dados (armazena os dados em um array)
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    
    // Verifica se o CPF já está cadastrado
    const cpfExistente = usuarios.some(user => user.cpf === cpf);
    if (cpfExistente) {
        showAlert("CPF já cadastrado. Tente outro.", "error");
        return;
    }

    // Criação do novo usuário
    const novoUsuario = {
        nome,
        cpf,
        nivel,
        endereco,
        telefone,
        email,
        senha
    };

    // Armazena o novo usuário
    usuarios.push(novoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    // Exibe mensagem de sucesso
    showAlert("Usuário cadastrado com sucesso!", "success");

    // Limpa o formulário
    document.getElementById('cadastroForm').reset();

     // Atualiza a lista de usuários na tela
     listarUsuarios();
}

// Função para listar os usuários cadastrados
function listarUsuarios() {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const listaUsuarios = document.getElementById('listaUsuarios');
    listaUsuarios.innerHTML = ''; // Limpa a lista

    usuarios.forEach(usuario => {
        const tr = document.createElement('tr');
        
        // Cria as células para cada dado do usuário
        const nomeTd = document.createElement('td');
        nomeTd.textContent = usuario.nome;
        
        const emailTd = document.createElement('td');
        emailTd.textContent = usuario.email;
        
        const telefoneTd = document.createElement('td');
        telefoneTd.textContent = usuario.telefone;
        
        const cpfTd = document.createElement('td');
        cpfTd.textContent = usuario.cpf;
        
        // Adiciona as células na linha
        tr.appendChild(nomeTd);
        tr.appendChild(emailTd);
        tr.appendChild(telefoneTd);
        tr.appendChild(cpfTd);
        
        // Adiciona a linha à tabela
        listaUsuarios.appendChild(tr);
    });
}

// Exibe a lista de usuários ao carregar a página
document.addEventListener('DOMContentLoaded', listarUsuarios);

// Função para exibir alertas
function showAlert(message, type) {
    const alertBox = document.getElementById('alert');
    alertBox.textContent = message;
    alertBox.style.backgroundColor = type === "success" ? "#d4edda" : "#f8d7da";
    alertBox.style.display = "block";
}