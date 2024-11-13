from selenium import webdriver  # type: ignore
from selenium.webdriver.common.by import By  # type: ignore
from selenium.webdriver.support.ui import Select  # type: ignore
import time

# Iniciar o navegador
driver = webdriver.Chrome()  # ou webdriver.Firefox() se estiver usando o Firefox

# Abrir a página com o formulário
driver.get("file:///C:/Users/loren/Documents/Trabalho%20(Farm%C3%A1cia)/CadastrarUsu.html")  # Substitua pelo URL da sua página de cadastro

# Função para digitar mais lentamente
def digitar_lento(element, texto, intervalo=0.1):
    """Digita o texto caractere por caractere em um elemento, com uma pausa entre cada caractere."""
    for caractere in texto:
        element.send_keys(caractere)
        time.sleep(intervalo)

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
        if crm_field.is_displayed():
            crm = driver.find_element(By.ID, "crmCadastro")
            digitar_lento(crm, "123456")

        # Preencher o campo Senha
        senha = driver.find_element(By.ID, "senhaCadastro")
        digitar_lento(senha, "senhaSegura123")

        # Submeter o formulário
        submit_button = driver.find_element(By.CSS_SELECTOR, "button[type='submit']")
        submit_button.click()

        # Pausar para observar o resultado do teste
        time.sleep(5)

        # Capturar a mensagem de sucesso (ajuste conforme a mensagem esperada)
        print("Cadastro realizado com sucesso.")

    except Exception as e:
        print("Erro durante o teste de cadastro:", e)

    finally:
        # Fechar o navegador
        driver.quit()

# Executar a função de teste
testar_cadastro()