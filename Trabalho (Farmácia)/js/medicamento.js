// Array para armazenar os medicamentos cadastrados
const medicamentos = [
    {
        nomeComercial: "Paracetamol",
        nomeGenerico: "Paracetamol",
        formaFarmaceutica: "Comprimido",
        dosagem: "500mg",
        viaAdministracao: "Oral",
        registroAnvisa: "123456789",
        fabricante: "Farmacêutica A",
        lote: "L001",
        validade: "2025-12-31",
        substanciaAtiva: "Paracetamol",
        valor: "15.90",
        quantidade: 50
    },
    {
        nomeComercial: "Ibuprofeno",
        nomeGenerico: "Ibuprofeno",
        formaFarmaceutica: "Comprimido",
        dosagem: "200mg",
        viaAdministracao: "Oral",
        registroAnvisa: "987654321",
        fabricante: "Farmacêutica B",
        lote: "L002",
        validade: "2024-10-20",
        substanciaAtiva: "Ibuprofeno",
        valor: "12.50",
        quantidade: 100
    },
    {
        nomeComercial: "Omeprazol",
        nomeGenerico: "Omeprazol",
        formaFarmaceutica: "Cápsula",
        dosagem: "20mg",
        viaAdministracao: "Oral",
        registroAnvisa: "543216789",
        fabricante: "Farmacêutica C",
        lote: "L003",
        validade: "2026-05-15",
        substanciaAtiva: "Omeprazol",
        valor: "25.00",
        quantidade: 200
    },
    {
        nomeComercial: "Amoxicilina",
        nomeGenerico: "Amoxicilina",
        formaFarmaceutica: "Suspensão Oral",
        dosagem: "250mg/5ml",
        viaAdministracao: "Oral",
        registroAnvisa: "678912345",
        fabricante: "Farmacêutica D",
        lote: "L004",
        validade: "2025-03-10",
        substanciaAtiva: "Amoxicilina",
        valor: "18.70",
        quantidade: 30
    },
    {
        nomeComercial: "Losartana",
        nomeGenerico: "Losartana Potássica",
        formaFarmaceutica: "Comprimido",
        dosagem: "50mg",
        viaAdministracao: "Oral",
        registroAnvisa: "456789123",
        fabricante: "Farmacêutica E",
        lote: "L005",
        validade: "2024-08-22",
        substanciaAtiva: "Losartana Potássica",
        valor: "20.00",
        quantidade: 150
    }
];

function handleIncluir(event) {
    event.preventDefault();

    const nomeComercial = document.getElementById('nomeComercial').value;
    const nomeGenerico = document.getElementById('nomeGenerico').value;
    const formaFarmaceutica = document.getElementById('formaFarmaceutica').value;
    const dosagem = document.getElementById('dosagem').value;
    const viaAdministracao = document.getElementById('viaAdministracao').value;
    const registroAnvisa = document.getElementById('registroAnvisa').value;
    const fabricante = document.getElementById('fabricante').value;
    const lote = document.getElementById('lote').value;
    const validade = document.getElementById('validade').value;
    const substanciaAtiva = document.getElementById('substanciaAtiva').value;
    const valor = document.getElementById('valor').value;
    const quantidade = document.getElementById('quantidade').value;

    medicamentos.push({ nomeComercial, nomeGenerico, formaFarmaceutica, dosagem, viaAdministracao, registroAnvisa, fabricante, lote, validade, substanciaAtiva, valor, quantidade });
    
    document.getElementById('incluirMessage').textContent = "Medicamento incluído com sucesso!";
    atualizarTabelaMedicamentosIncluidos();
    
    limparCamposIncluir();
}

function atualizarTabelaMedicamentosIncluidos() {
    const tabela = document.getElementById('tabelaMedicamentosIncluidos');
    const tbody = document.getElementById('medicamentosTableBody');
    tbody.innerHTML = '';

    medicamentos.forEach(m => {
        const linha = document.createElement('tr');
        linha.innerHTML = `
            <td>${m.nomeComercial}</td>
            <td>${m.nomeGenerico}</td>
            <td>${m.formaFarmaceutica}</td>
            <td>${m.dosagem}</td>
            <td>${m.viaAdministracao}</td>
            <td>${m.registroAnvisa}</td>
            <td>${m.fabricante}</td>
            <td>${m.lote}</td>
            <td>${m.validade}</td>
            <td>${m.substanciaAtiva}</td>
            <td>${m.valor}</td>
            <td>${m.quantidade}</td>
        `;
        tbody.appendChild(linha);
    });

    tabela.style.display = 'block';
}

function limparCamposIncluir() {
    document.getElementById('nomeComercial').value = '';
    document.getElementById('nomeGenerico').value = '';
    document.getElementById('formaFarmaceutica').value = '';
    document.getElementById('dosagem').value = '';
    document.getElementById('viaAdministracao').value = '';
    document.getElementById('registroAnvisa').value = '';
    document.getElementById('fabricante').value = '';
    document.getElementById('lote').value = '';
    document.getElementById('validade').value = '';
    document.getElementById('substanciaAtiva').value = '';
    document.getElementById('valor').value = '';
    document.getElementById('quantidade').value = '';
}

function handleConsultar(event) {
    event.preventDefault();
    const nome = document.getElementById('consultarNome').value;
    const dosagem = document.getElementById('consultarDosagem').value;
    const formaFarmaceutica = document.getElementById('consultarFormaFarmaceutica').value;

    const resultados = medicamentos.filter(m => {
        return (
            (nome && m.nomeComercial.includes(nome)) ||
            (dosagem && m.dosagem.includes(dosagem)) ||
            (formaFarmaceutica && m.formaFarmaceutica && m.formaFarmaceutica.includes(formaFarmaceutica))
        );
    });

    const tabela = document.getElementById('tabelaMedicamentosConsultados');
    const tbody = document.getElementById('consultarMedicamentosTableBody');
    tbody.innerHTML = '';
    document.getElementById('consultaResultado').textContent = '';

    if (resultados.length > 0) {
        resultados.forEach(m => {
            const linha = document.createElement('tr');
            linha.innerHTML = `
                <td>${m.nomeComercial}</td>
                <td>${m.nomeGenerico}</td>
                <td>${m.formaFarmaceutica}</td>
                <td>${m.dosagem}</td>
                <td>${m.viaAdministracao}</td>
                <td>${m.registroAnvisa}</td>
                <td>${m.fabricante}</td>
                <td>${m.lote}</td>
                <td>${m.validade}</td>
                <td>${m.substanciaAtiva}</td>
                <td>${m.valor}</td>
                <td>${m.quantidade}</td>
            `;
            tbody.appendChild(linha);
        });
        tabela.style.display = 'block';
    } else {
        document.getElementById('consultaResultado').textContent = "Nenhum medicamento encontrado com as informações fornecidas.";
    }

    limparCamposConsultar();
}

function limparCamposConsultar() {
    document.getElementById('consultarNome').value = '';
    document.getElementById('consultarDosagem').value = '';
    document.getElementById('consultarFormaFarmaceutica').value = '';
}

function handleAlterar(event) {
    event.preventDefault();
    document.getElementById('alterarMessage').textContent = "Medicamento alterado com sucesso!";
    // Lógica de alteração pode ser implementada aqui
}

function handleExcluir(event) {
    event.preventDefault();
    const nome = document.getElementById('excluirNome').value;
    document.getElementById('excluirMensagem').textContent = `Tem certeza que deseja excluir ${nome}?`;
    document.getElementById('excluirConfirmacao').style.display = 'block';
}

function confirmarExclusao(confirmado) {
    if (confirmado) {
        document.getElementById('excluirMessage').textContent = "Medicamento excluído com sucesso!";
        // Lógica de exclusão pode ser implementada aqui.
    } else {
        document.getElementById('excluirMessage').textContent = "Exclusão cancelada";
    }
    document.getElementById('excluirConfirmacao').style.display = 'none';  // Oculta a caixa de confirmação
    document.getElementById('excluirMensagem').textContent = "";  // Limpa a mensagem de confirmação
}