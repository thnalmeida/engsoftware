from selenium import webdriver
from selenium.webdriver.common.by import By
import time

# Inicializa o driver do navegador
driver = webdriver.Chrome()  # Certifique-se de ter o ChromeDriver configurado corretamente
driver.get("file:///C:/Users/loren/Documents/Trabalho%20(Farm%C3%A1cia)/CadastrarCon.html")  # Substitua pelo caminho correto do arquivo HTML

# Função para simular digitação lenta (opcional)
def digitar_lento(element, texto, intervalo=0.1):
    """Digita texto caractere por caractere no elemento, com uma pausa entre cada caractere."""
    for caractere in texto:
        element.send_keys(caractere)
        time.sleep(intervalo)

# Automatizar o preenchimento e submissão do formulário
try:
    # Preencher o campo "Nome do Convênio"
    nome_convenio = driver.find_element(By.ID, "nomeConvenio")
    digitar_lento(nome_convenio, "Saúde Vital")

    # Preencher o campo "Razão Social"
    razao_social = driver.find_element(By.ID, "razaoSocial")
    digitar_lento(razao_social, "Saúde Vital LTDA")

    # Preencher o campo "CNPJ"
    cnpj = driver.find_element(By.ID, "cnpj")
    digitar_lento(cnpj, "12345678000199")  # Insira um CNPJ válido para seu teste

    # Preencher o campo "Contato"
    contato = driver.find_element(By.ID, "contato")
    digitar_lento(contato, "saudevital@email.com'")

    # Preencher o campo "Condições de Pagamento"
    condicoes_pagamento = driver.find_element(By.ID, "condicoesPagamento")
    digitar_lento(condicoes_pagamento, "Parcelamento em até 12x, 25% de desconto para pagamento à vista")

    # Submeter o formulário
    submit_button = driver.find_element(By.CSS_SELECTOR, "button[type='submit']")
    submit_button.click()

    # Pausa para observar o resultado da automação
    time.sleep(3)

    # Verificar se a mensagem de sucesso é exibida
    success_message = driver.find_element(By.ID, "successMessageCadastrar")
    if success_message.is_displayed():
        print("Formulário enviado com sucesso!")
    else:
        print("Erro ao enviar o formulário.")

    # Verificar os dados na tabela
    tabela = driver.find_element(By.ID, "tabelaConveniosCadastrados")
    linhas = driver.find_elements(By.CSS_SELECTOR, "#conveniosTableBody tr")
    print("Dados cadastrados na tabela:")
    for linha in linhas:
        colunas = linha.find_elements(By.TAG_NAME, "td")
        dados = [coluna.text for coluna in colunas]
        print(dados)

except Exception as e:
    print(f"Ocorreu um erro: {e}")

finally:
    # Fechar o navegador
    driver.quit()
