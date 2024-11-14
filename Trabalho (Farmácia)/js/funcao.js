let usuarios = [
    { nome: "João Silva", cpf: "123.456.789-01", telefone: "(11) 98765-4321", email: "joao@farmacia.com", endereco: "Rua A, 123", nivel: "farmaceutico", crm: "12345", senha: "senha123" },
    { nome: "Maria Oliveira", cpf: "234.567.890-12", telefone: "(21) 99876-5432", email: "maria@farmacia.com", endereco: "Rua B, 456", nivel: "assistente", senha: "senha456" },
    { nome: "Pedro Santos", cpf: "345.678.901-23", telefone: "(31) 91234-5678", email: "pedro@farmacia.com", endereco: "Rua C, 789", nivel: "administrador", senha: "senha789" }
];

// Função para exibir ou ocultar o campo CRM com base na seleção de nível
function verificarNivel() {
    const nivel = document.getElementById('nivelCadastro').value;
    const campoCRM = document.getElementById('crmFieldCadastro'); // Supondo que este seja o ID do contêiner do campo CRM

    if (nivel === 'farmaceutico') {
        campoCRM.style.display = 'block'; // Mostra o campo CRM
    } else {
        campoCRM.style.display = 'none';  // Oculta o campo CRM
    }
}

// Chame a função verificarNivel sempre que o campo nivelCadastro mudar
document.getElementById('nivelCadastro').addEventListener('change', verificarNivel);

function cadastrarUsuario(event) {
    event.preventDefault(); // Impede o envio real do formulário para simular o cadastro

    // Coleta os dados dos campos
    const nome = document.getElementById('nomeCadastro').value;
    const cpf = document.getElementById('cpfCadastro').value;
    const telefone = document.getElementById('telefoneCadastro').value;
    const email = document.getElementById('emailCadastro').value;
    const endereco = document.getElementById('enderecoCadastro').value;
    const nivel = document.getElementById('nivelCadastro').value;
    const senha = document.getElementById('senhaCadastro').value;
    const crm = document.getElementById('crmCadastro').value;
    
    // Validação de campos (simples exemplo)
    if (!nome || !cpf || !telefone || !email || !endereco || !senha) {
        alert("Todos os campos são obrigatórios!");
        return;
    }

    // Validação condicional do campo CRM
    if (nivel === 'Farmacêutico' && !crm) {
        alert("O campo CRM é obrigatório para o nível Farmacêutico.");
        return;
    }

    // Exibe a mensagem de sucesso
    const mensagemSucesso = document.getElementById('mensagemSucesso');
    mensagemSucesso.style.display = 'block';

    // Limpa o formulário após o cadastro
    document.getElementById('cadastrar').reset();

    // Esconde a mensagem de sucesso após 3 segundos (opcional)
    setTimeout(() => {
        mensagemSucesso.style.display = 'none';
    }, 3000);
    
    // Inicializa a exibição correta do campo CRM ao carregar a página
    document.addEventListener('DOMContentLoaded', verificarNivel);
}


function consultarUsuario() {
    const nome = document.getElementById('nomeConsultar').value.toLowerCase();
    const nivel = document.getElementById('nivelConsultar').value;
    const cpf = document.getElementById('cpfConsultar').value;
    const resultados = usuarios.filter(u => 
        (nome ? u.nome.toLowerCase().includes(nome) : true) &&
        (nivel ? u.nivel === nivel : true) &&
        (cpf ? u.cpf === cpf : true)
    );
    
    if (resultados.length > 0) {
        document.getElementById('consultaResultado').style.display = 'block';
        document.getElementById('resultadoConsultaTable').innerHTML = resultados.map(usuario => `
            <tr>
                <td>${usuario.nome}</td>
                <td>${usuario.cpf}</td>
                <td>${usuario.telefone}</td>
                <td>${usuario.email}</td>
                <td>${usuario.endereco}</td>
                <td>${usuario.nivel}</td>
                <td>${usuario.crm || 'N/A'}</td>
            </tr>
        `).join('');
    } else {
        alert("Usuário não encontrado!");
    }
}

function excluirUsuario() {
    const cpf = document.getElementById('cpfExcluir').value;
    const index = usuarios.findIndex(u => u.cpf === cpf);
    if (index > -1) {
        usuarios.splice(index, 1);
        alert("Usuário excluído com sucesso!");
    } else {
        alert("Usuário não encontrado!");
    }
}

function editarUsuario(event) {
    event.preventDefault();
    const cpf = document.getElementById('cpfEditar').value;
    const usuario = usuarios.find(u => u.cpf === cpf);
    if (usuario) {
        usuario.nome = document.getElementById('nomeEditar').value;
        usuario.telefone = document.getElementById('telefoneEditar').value;
        usuario.email = document.getElementById('emailEditar').value;
        usuario.endereco = document.getElementById('enderecoEditar').value;
        usuario.nivel = document.getElementById('nivelEditar').value;
        usuario.crm = usuario.nivel === 'farmaceutico' ? document.getElementById('crmEditar').value : '';
        alert("Usuário editado com sucesso!");
    } else {
        alert("Erro ao editar o usuário.");
    }
}