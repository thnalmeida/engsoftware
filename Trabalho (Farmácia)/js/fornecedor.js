//---------------- Fornecedor---------------------
const fornecedor = [
    { nome: "Fornecedor 1", cnpj: "12.345.678/0001-90", telefone: "(14) 98008-1234", email: "fornecedor1@dominio.com", endereco: "Rua das Laranjas 12" },
    { nome: "Fornecedor 2", cnpj: "90.412.599/9923-80", telefone: "(35) 97777-1357", email: "fornecedor2@dominio.com", endereco: "Rua dos Limões 14" },
    { nome: "Fornecedor 3", cnpj: "23.902.534/0032-70", telefone: "(11) 91234-5678", email: "fornecedor3@dominio.com", endereco: "Rua das Tangerinas 17" }
];

function handleCadastrar(event) {
    // Previne o comportamento padrão do formulário (recarregar a página)
    event.preventDefault();

    // Coleta os dados dos campos
    const nome = document.getElementById('nome').value;
    const cnpj = document.getElementById('cnpj').value;
    const telefone = document.getElementById('telefone').value;
    const email = document.getElementById('email').value;
    const endereco = document.getElementById('endereco').value;


    // Exibe a mensagem de sucesso
    const mensagemSucesso = document.getElementById('mensagemSucesso');
    mensagemSucesso.style.display = 'block';

    fornecedor.push({ nome, cnpj, telefone, email, endereco });

    // Limpa o formulário após o cadastro
    document.getElementById('cadastrar').reset();

    // Esconde a mensagem de sucesso após 3 segundos (opcional)
    setTimeout(() => {
        mensagemSucesso.style.display = 'none';
    }, 3000);
}

function handleConsultar() {
    const nome = document.getElementById('consultarNome').value.toLowerCase();
    const cnpj = document.getElementById('consultarCNPJ').value;
    const telefone = document.getElementById('consultarTelefone').value;

    const resultados = fornecedor.filter(fornecedor =>
        (!nome || fornecedor.nome.toLowerCase().includes(nome)) &&
        (!cnpj || fornecedor.cnpj === cnpj) &&
        (!telefone || fornecedor.telefone === telefone)
    );

    const resultadoDiv = document.getElementById('consultaResultado');
    const tabelaResultados = document.getElementById('resultadoConsultaTable');

    if (resultados.length > 0) {
        // Exibe os resultados na tabela
        resultadoDiv.style.display = 'none'; // Oculta mensagem de "Nenhum fornecedor encontrado"
        tabelaResultados.innerHTML = resultados.map(fornecedor => `
            <tr>
                <td>${fornecedor.nome}</td>
                <td>${fornecedor.cnpj}</td>
                <td>${fornecedor.telefone}</td>
            </tr>
        `).join('');
    } else {
        // Exibe mensagem de "Nenhum fornecedor encontrado"
        resultadoDiv.style.display = 'block';
        resultadoDiv.textContent = "Nenhum fornecedor encontrado";
        tabelaResultados.innerHTML = ""; // Limpa a tabela
    }
}

function handleCNPJInput() {
    // Obtém o CNPJ informado
    const cnpj = document.getElementById('alterarCNPJ').value;

    // Encontra o fornecedor correspondente
    const fornecedorEncontrado = fornecedor.find(f => f.cnpj === cnpj);

    if (fornecedorEncontrado) {
        // Preenche os campos com os dados do fornecedor encontrado
        document.getElementById('alterarNome').value = fornecedorEncontrado.nome || '';
        document.getElementById('alterarTelefone').value = fornecedorEncontrado.telefone || '';
        document.getElementById('alterarEmail').value = fornecedorEncontrado.email || '';
        document.getElementById('alterarEndereco').value = fornecedorEncontrado.endereco || '';
        document.getElementById('alterarMessage').textContent = ""; // Limpa mensagens anteriores
    } else {
        // Limpa os campos caso o fornecedor não seja encontrado
        document.getElementById('alterarNome').value = '';
        document.getElementById('alterarTelefone').value = '';
        document.getElementById('alterarEmail').value = '';
        document.getElementById('alterarEndereco').value = '';
        document.getElementById('alterarMessage').textContent = "Fornecedor não encontrado.";
        document.getElementById('alterarMessage').style.color = "red";
    }
}

function handleAlterar(event) {
    event.preventDefault();
    const cnpj = document.getElementById('alterarCNPJ').value;
    const fornecedorEncontrado = fornecedor.find(f => f.cnpj === cnpj);

    // Atualiza os dados do fornecedor
    fornecedorEncontrado.nome = document.getElementById('alterarNome').value || fornecedorEncontrado.nome;
    fornecedorEncontrado.telefone = document.getElementById('alterarTelefone').value || fornecedorEncontrado.telefone;
    fornecedorEncontrado.email = document.getElementById('alterarEmail').value || fornecedorEncontrado.email;
    fornecedorEncontrado.endereco = document.getElementById('alterarEndereco').value || fornecedorEncontrado.endereco;

    document.getElementById('alterarMessage').textContent = "Fornecedor alterado com sucesso!";
    document.getElementById('alterarMessage').style.color = "green";

    // Resetar campos após a alteração
    document.getElementById('alterarCNPJ').value = '';
    document.getElementById('alterarNome').value = '';
    document.getElementById('alterarTelefone').value = '';
    document.getElementById('alterarEmail').value = '';
    document.getElementById('alterarEndereco').value = '';
}

function handleExcluir(event) {
    event.preventDefault();
    const cnpj = document.getElementById('excluirCNPJ').value;
    const index = fornecedor.findIndex(f => f.cnpj === cnpj);

    if (index !== -1) {
        fornecedor.splice(index, 1);
        document.getElementById('excluirMessage').textContent = "Fornecedor excluído com sucesso!";
    } else {
        document.getElementById('excluirMessage').textContent = "Fornecedor não encontrado.";
    }
}
function confirmarExclusao() {
    document.getElementById('excluirNome').value = '';
    document.getElementById('excluirCNPJ').value = '';
    document.getElementById('confirmacaoContainer').style.display = 'none';
    document.getElementById('excluirMessage').textContent = "Fornecedor excluído com sucesso!";
}

function cancelarExclusao() {
    document.getElementById('excluirNome').value = '';
    document.getElementById('excluirCNPJ').value = '';
    document.getElementById('confirmacaoContainer').style.display = 'none';
    document.getElementById('excluirMessage').textContent = "Exclusão cancelada!";
}