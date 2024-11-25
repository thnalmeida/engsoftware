const convData = [
    {
        nomeConvenio: "Convênio Saúde Total",
        razaoSocial: "Saúde Total Ltda.",
        cnpj: "12.345.678/0001-90",
        contato: "contato@saudetotal.com",
        condicoesPagamento: "Parcelamento em até 6x sem juros"
    },
    {
        nomeConvenio: "Plano Vida Melhor",
        razaoSocial: "Vida Melhor S.A.",
        cnpj: "98.765.432/0001-12",
        contato: "suporte@vidamelhor.com",
        condicoesPagamento: "Desconto de 10% para pagamentos à vista"
    },
    {
        nomeConvenio: "Bem-Estar Plus",
        razaoSocial: "Bem-Estar Serviços Médicos",
        cnpj: "23.456.789/0001-45",
        contato: "bemestar@plus.com",
        condicoesPagamento: "Parcelamento em até 12x com juros"
    },
    {
        nomeConvenio: "Saúde Família",
        razaoSocial: "Saúde Família ME",
        cnpj: "34.567.890/0001-67",
        contato: "familia@saude.com",
        condicoesPagamento: "Pagamento único com desconto especial"
    }
];

function atualizarTabelaConvenios() {
    const tbody = document.getElementById('conveniosTableBody');
    tbody.innerHTML = '';

    convData.forEach(convenio => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${convenio.nomeConvenio}</td>
            <td>${convenio.razaoSocial}</td>
            <td>${convenio.cnpj}</td>
            <td>${convenio.contato}</td>
            <td>${convenio.condicoesPagamento}</td>
        `;
        tbody.appendChild(row);
    });

    // Exibir tabela de convênios
    document.getElementById('tabelaConveniosCadastrados').style.display = 'table';
}

function cadastrarConvenio(event) {
    event.preventDefault();
    const nomeConvenio = document.getElementById('nomeConvenio').value;
    const razaoSocial = document.getElementById('razaoSocial').value;
    const cnpj = document.getElementById('cnpj').value;
    const contato = document.getElementById('contato').value;
    const condicoesPagamento = document.getElementById('condicoesPagamento').value;

    // Adiciona registro ao array
    convData.push({ nomeConvenio, razaoSocial, cnpj, contato, condicoesPagamento });
    atualizarTabelaConvenios();

    document.getElementById('successMessageCadastrar').textContent = 'Convênio cadastrado com sucesso!';
    document.getElementById('formCadastrarConvenio').reset();
    return true;
}

function alterarConvenio(event) {
    event.preventDefault();
    const nomeConvenioAlterar = document.getElementById('nomeConvenioAlterar').value;
    const contatoAlterar = document.getElementById('contatoAlterar').value;
    const valoresMedicamentos = document.getElementById('valoresMedicamentos').value;

    // Lógica para alterar o convênio
    const convIndex = convData.findIndex(conv => conv.nomeConvenio === nomeConvenioAlterar);
    if (convIndex >= 0) {
        if (contatoAlterar && valoresMedicamentos) {
            convData[convIndex].contato = contatoAlterar;
            // Aqui você pode armazenar os valores dos medicamentos se desejado
            document.getElementById('successMessageAlterar').textContent = 'Convênio alterado com sucesso!';
        } else {
            document.getElementById('errorAlterar').textContent = 'Os campos contato e valores dos medicamentos são obrigatórios.';
        }
    } else {
        document.getElementById('errorAlterar').textContent = 'Convênio não encontrado.';
    }

    document.getElementById('formAlterarConvenio').reset();
    return true;
}

function consultarConvenio(event) {
    event.preventDefault();
    const consultaNome = document.getElementById('consultaNome').value;
    const consultaContato = document.getElementById('consultaContato').value;
    const tbody = document.getElementById('resultTableBody');
    tbody.innerHTML = '';

    const resultados = convData.filter(conv => 
        conv.nomeConvenio.includes(consultaNome) && 
        conv.contato.includes(consultaContato)
    );

    if (resultados.length > 0) {
        resultados.forEach(conv => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${conv.nomeConvenio}</td>
                <td>${conv.razaoSocial}</td>
                <td>${conv.cnpj}</td>
                <td>${conv.contato}</td>
                <td>${conv.condicoesPagamento}</td>
            `;
            tbody.appendChild(row);
        });
        document.getElementById('resultTable').style.display = 'table';
        document.getElementById('successMessageConsultar').textContent = 'Convênios encontrados:';
    } else {
        document.getElementById('successMessageConsultar').textContent = 'Nenhum convênio encontrado.';
    }

    return true;
}

function excluirConvenio(event) {
    event.preventDefault();
    const excluirNome = document.getElementById('excluirNome').value;
    const excluirCNPJ = document.getElementById('excluirCNPJ').value;

    const convIndex = convData.findIndex(conv => 
        conv.nomeConvenio === excluirNome && conv.cnpj === excluirCNPJ
    );
    if (convIndex >= 0) {
        convData.splice(convIndex, 1);
        document.getElementById('successMessageExcluir').textContent = 'Convênio excluído com sucesso!';
        document.getElementById('formExcluirConvenio').reset();
    } else {
        document.getElementById('errorExcluir').textContent = 'Convênio não encontrado.';
    }

    return true;
}