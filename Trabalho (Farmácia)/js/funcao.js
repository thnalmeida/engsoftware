//-----------------Usuário---------------------
const usuarios = [
    { nome: "João Silva", cpf: "123.456.789-01", telefone: "(11) 98765-4321", email: "joao@farmacia.com", endereco: "Rua A, 123", nivel: "farmaceutico", crm: "12345", senha: "senha123" },
    { nome: "Maria Oliveira", cpf: "234.567.890-12", telefone: "(21) 99876-5432", email: "maria@farmacia.com", endereco: "Rua B, 456", nivel: "assistente", senha: "senha456" },
    { nome: "Ana Santos", cpf: "345.678.901-23", telefone: "(31) 91234-5678", email: "ana@farmacia.com", endereco: "Rua C, 789", nivel: "administrador", senha: "senha789" }
];


function toggleCRMField(formType) {
    const nivelSelect = document.getElementById(`nivel${formType}`);
    const crmField = document.getElementById(`crmField${formType}`);
    crmField.style.display = nivelSelect.value === 'farmaceutico' ? 'block' : 'none';
}

function cadastrarUsuario(event) {
    event.preventDefault();
    const usuario = {
        nome: document.getElementById('nomeCadastro').value,
        cpf: document.getElementById('cpfCadastro').value,
        telefone: document.getElementById('telefoneCadastro').value,
        email: document.getElementById('emailCadastro').value,
        endereco: document.getElementById('enderecoCadastro').value,
        nivel: document.getElementById('nivelCadastro').value,
        crm: document.getElementById('nivelCadastro').value === 'farmaceutico' ? document.getElementById('crmCadastro').value : '',
        senha: document.getElementById('senhaCadastro').value
    };
    usuarios.push(usuario);
    document.getElementById('cadastrarMessage').textContent = "Usuário cadastrado com sucesso!";
    atualizarTabelaCadastrados();
    limparCamposCadastrar();
}

function atualizarTabelaCadastrados() {
    const tbody = document.getElementById('usuariosTableBody');
    tbody.innerHTML = '';
    usuarios.forEach(u => {
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${u.nome}</td>
        <td>${u.cpf}</td>
        <td>${u.telefone}</td>
        <td>${u.email}</td>
        <td>${u.endereco}</td>
        <td>${u.nivel}</td>
        <td>${u.crm || 'N/A'}</td>
    `;
        tbody.appendChild(row);
    });
    document.getElementById('tabelaUsuariosCadastrados').style.display = 'block';
}

function limparCamposCadastrar() {
    document.getElementById('nomeCadastro').value = '';
    document.getElementById('cpfCadastro').value = '';
    document.getElementById('telefoneCadastro').value = '';
    document.getElementById('emailCadastro').value = '';
    document.getElementById('enderecoCadastro').value = '';
    document.getElementById('nivelCadastro').value = 'assistente';
    document.getElementById('crmCadastro').value = '';
    document.getElementById('senhaCadastro').value = '';
}

function buscarUsuarioEditar() {
    const cpf = document.getElementById('cpfEditar').value;
    const usuario = usuarios.find(u => u.cpf === cpf);
    if (usuario) {
        document.getElementById('nomeEditar').value = usuario.nome;
        document.getElementById('telefoneEditar').value = usuario.telefone;
        document.getElementById('emailEditar').value = usuario.email;
        document.getElementById('enderecoEditar').value = usuario.endereco;
        document.getElementById('nivelEditar').value = usuario.nivel;
        toggleCRMField('Editar');
        document.getElementById('crmEditar').value = usuario.crm || '';
        document.getElementById('formEditar').style.display = 'block';
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
        document.getElementById('consultaResultadoMessage').textContent = `Encontrados ${resultados.length} usuários.`;
        const tbody = document.getElementById('resultadoConsultaTable');
        tbody.innerHTML = '';
        resultados.forEach(usuario => {
            const row = document.createElement('tr');
            row.innerHTML = `
            <td>${usuario.nome}</td>
            <td>${usuario.cpf}</td>
            <td>${usuario.telefone}</td>
            <td>${usuario.email}</td>
            <td>${usuario.endereco}</td>
            <td>${usuario.nivel}</td>
            <td>${usuario.crm || 'N/A'}</td>
        `;
            tbody.appendChild(row);
        });
        document.getElementById('tabelaUsuariosConsultados').style.display = 'block';
    } else {
        alert("Usuário não encontrado!");
    }
}

function excluirUsuario() {
    const cpf = document.getElementById('cpfExcluir').value;
    const index = usuarios.findIndex(u => u.cpf === cpf);
    if (index > -1) {
        usuarios.splice(index, 1);
        document.getElementById('excluirMessage').textContent = "Usuário excluído com sucesso!";
    } else {
        document.getElementById('excluirMessage').textContent = "Usuário não encontrado!";
    }
}