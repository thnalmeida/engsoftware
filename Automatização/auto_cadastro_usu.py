from selenium import webdriver  # type: ignore
from selenium.webdriver.common.by import By  # type: ignore
from selenium.webdriver.support.ui import Select  # type: ignore
import time

# Caminho do arquivo HTML local
file_path = "file:///C:/Users/loren/Documents/Trabalho%20(Farm%C3%A1cia)/CadastrarUsu.html"

# Iniciar o navegador
driver = webdriver.Chrome()  # Configure o caminho correto do driver, se necessário
driver.get(file_path)

# Função para digitar mais lentamente
def digitar_lento(element, texto, intervalo=0.1):
    """Digita o texto caractere por caractere em um elemento, com uma pausa entre cada caractere."""
    for caractere in texto:
        element.send_keys(caractere)
        time.sleep(intervalo)

# Função para verificar se a tabela é exibida e capturar dados
def verificar_tabela():
    try:
        # Verificar se o corpo da tabela está visível
        tabela = driver.find_element(By.ID, "usuariosTableBody")
        if tabela.is_displayed():
            print("Tabela exibida com sucesso.")

            # Capturar as linhas da tabela
            linhas = tabela.find_elements(By.TAG_NAME, "tr")
            if linhas:
                for linha in linhas:
                    colunas = linha.find_elements(By.TAG_NAME, "td")
                    dados = [coluna.text for coluna in colunas]
                    print("Dados na tabela:", dados)
            else:
                print("Nenhum dado encontrado na tabela.")
        else:
            print("Tabela não está visível.")
    except Exception as e:
        print("Erro ao verificar a tabela:", e)

# Função para realizar o teste de cadastro
def testar_cadastro():
    try:
        # Preencher o campo Nome
        nome = driver.find_element(By.ID, "nomeCadastro")
        digitar_lento(nome, "Nome 1")

        # Preencher o campo CPF
        cpf = driver.find_element(By.ID, "cpfCadastro")
        digitar_lento(cpf, "123.456.789-10")

        # Preencher o campo Telefone
        telefone = driver.find_element(By.ID, "telefoneCadastro")
        digitar_lento(telefone, "(11) 98765-4321")

        # Preencher o campo Email
        email = driver.find_element(By.ID, "emailCadastro")
        digitar_lento(email, "nome.1@example.com")

        # Preencher o campo Endereço
        endereco = driver.find_element(By.ID, "enderecoCadastro")
        digitar_lento(endereco, "Rua dos Testes, 123")

        # Selecionar Nível de Acesso
        nivel = Select(driver.find_element(By.ID, "nivelCadastro"))
        nivel.select_by_value("farmaceutico")  # Seleciona o valor 'farmaceutico'

        # Preencher o campo CRM (exibido somente se 'Farmacêutico' estiver selecionado)
        time.sleep(1)  # Pausa para garantir que o campo apareça
        crm_field = driver.find_element(By.ID, "crmFieldCadastro")
        if crm_field.value_of_css_property("display") != "none":  # Confirma que o campo está visível
            crm = driver.find_element(By.ID, "crmCadastro")
            digitar_lento(crm, "123456")

        # Preencher o campo Senha
        senha = driver.find_element(By.ID, "senhaCadastro")
        digitar_lento(senha, "senhaSegura123")

        # Submeter o formulário
        submit_button = driver.find_element(By.CSS_SELECTOR, "button[type='submit']")
        submit_button.click()

        # Pausar para observar o resultado do teste
        time.sleep(7)

        # Verificar a tabela
        verificar_tabela()

    except Exception as e:
        print("Erro durante o teste de cadastro:", e)

    finally:
        # Fechar o navegador
        driver.quit()

# Executar a função de teste
testar_cadastro()
