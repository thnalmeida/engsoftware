const clientes = [
    {
        nome: "Nome 1",
        dataNascimento: "1990-01-01",
        convenio: "plano1",
        telefone: "(11) 91234-5678",
        endereco: "Rua das Flores, 123",
        cpf: "123.456.789-00"
    },
    {
        nome: "Nome 2",
        dataNascimento: "1985-05-15",
        convenio: "plano2",
        telefone: "(21) 97654-3210",
        endereco: "Avenida Paulista, 456",
        cpf: "987.654.321-99"
    },
    {
        nome: "Nome 3",
        dataNascimento: "2000-12-25",
        convenio: "plano1",
        telefone: "(31) 99876-5432",
        endereco: "Praça Central, 789",
        cpf: "456.789.123-88"
    }
];

// -----------------------Clientes---------------------
function atualizarTabelaClientes() {
    const tbody = document.getElementById('clientesTableBody');
    tbody.innerHTML = '';

    clientes.forEach(cliente => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${cliente.nome}</td>
            <td>${cliente.dataNascimento}</td>
            <td>${cliente.convenio}</td>
            <td>${cliente.telefone}</td>
            <td>${cliente.endereco}</td>
            <td>${cliente.cpf}</td>
        `;
        tbody.appendChild(row);
    });

    // Exibir tabela de clientes
    document.getElementById('tabelaClientesCadastrados').style.display = 'table';
}

function cadastrarCliente(event) {
    event.preventDefault();
    document.getElementById('messageCadastrar').textContent = '';
    document.getElementById('successMessageCadastrar').textContent = '';

    const nome = document.getElementById('nome').value;
    const dataNascimento = document.getElementById('dataNascimento').value;
    const convenio = document.getElementById('convenio').value;
    const telefone = document.getElementById('telefone').value;
    const endereco = document.getElementById('endereco').value;
    const cpf = document.getElementById('cpf').value;

    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    if (!cpfRegex.test(cpf)) {
        document.getElementById('messageCadastrar').textContent = 'CPF inválido. Formato correto: XXX.XXX.XXX-XX';
        return false;
    }

    const telefoneLimpo = telefone.replace(/\D/g, "");
    if (telefoneLimpo.length !== 11) {
        document.getElementById('messageCadastrar').textContent = 'Telefone inválido. Formato correto: (xx) xxxxx-xxxx';
        return false;
    }

    // Adiciona cliente ao array
    clientes.push({ nome, dataNascimento, convenio, telefone, endereco, cpf });
    document.getElementById('successMessageCadastrar').textContent = 'Cliente cadastrado com sucesso!';
    document.getElementById('formCadastrarCliente').reset();
    atualizarTabelaClientes();

    return true;
}

function alterarCliente(event) {
    event.preventDefault();
    document.getElementById('messageAlterar').textContent = '';
    document.getElementById('successMessageAlterar').textContent = '';

    const cpf = document.getElementById('cpfAlterar').value;
    const nome = document.getElementById('nomeAlterar').value;
    const telefone = document.getElementById('telefoneAlterar').value;

    const cliente = clientes.find(c => c.cpf === cpf);
    if (cliente) {
        if (nome) cliente.nome = nome;
        if (telefone) cliente.telefone = telefone;

        document.getElementById('successMessageAlterar').textContent = 'Cliente alterado com sucesso!';
    } else {
        document.getElementById('messageAlterar').textContent = 'Cliente não encontrado.';
    }

    document.getElementById('formAlterarCliente').reset();
    return true;
}

function consultarCliente(event) {
    event.preventDefault();
    document.getElementById('messageConsultar').textContent = '';
    document.getElementById('successMessageConsultar').textContent = '';
    const tbody = document.getElementById('consultarTableBody');
    tbody.innerHTML = '';

    const nome = document.getElementById('consultaNome').value;
    const cpf = document.getElementById('consultaCpf').value;

    const filteredClients = clientes.filter(cliente => 
        (!nome || cliente.nome.toLowerCase().includes(nome.toLowerCase())) &&
        (!cpf || cliente.cpf === cpf)
    );

    if (filteredClients.length > 0) {
        document.getElementById('successMessageConsultar').textContent = 'Clientes encontrados:';
        filteredClients.forEach(cliente => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${cliente.nome}</td>
                <td>${cliente.dataNascimento}</td>
                <td>${cliente.convenio}</td>
                <td>${cliente.telefone}</td>
                <td>${cliente.endereco}</td>
                <td>${cliente.cpf}</td>
            `;
            tbody.appendChild(row);
        });
        document.getElementById('tabelaClientesConsultados').style.display = 'table'; // Mostra a tabela de resultados
    } else {
        document.getElementById('messageConsultar').textContent = 'Nenhum cliente encontrado com os filtros informados.';
    }

    return true;
}

function excluirCliente(event) {
    event.preventDefault(); // Impede o envio do formulário

    // Limpa as mensagens anteriores
    document.getElementById('messageExcluir').textContent = '';
    document.getElementById('successMessageExcluir').textContent = '';

    // Obtém o CPF do campo de entrada
    const cpf = document.getElementById('cpfExcluir').value;

    // Procura o índice do cliente pelo CPF
    const index = clientes.findIndex(c => c.cpf === cpf);

    if (index !== -1) {
        // Remove o cliente do array
        clientes.splice(index, 1);
        document.getElementById('successMessageExcluir').textContent = 'Cliente excluído com sucesso!';
    } else {
        // Exibe uma mensagem de erro se o cliente não for encontrado
        document.getElementById('messageExcluir').textContent = 'Cliente não encontrado.';
    }

    // Reseta o formulário após a tentativa de exclusão
    document.getElementById('formExcluirCliente').reset();
    return false; // Indica que o formulário não deve ser enviado
}