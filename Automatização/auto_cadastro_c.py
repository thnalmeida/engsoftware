from selenium import webdriver #type:ignore
from selenium.webdriver.common.by import By #type:ignore
from selenium.webdriver.support.ui import Select #type:ignore
import time

# Configurar o WebDriver
driver = webdriver.Chrome()  # Certifique-se de que o ChromeDriver está no PATH ou especifique o caminho completo.

# Abra a página com o formulário
driver.get("file:///C:/Users/loren/Documents/Trabalho%20(Farm%C3%A1cia)/CadastrarC.html")  # Substitua pelo caminho correto para o arquivo HTML.

# Função para simular digitação lenta
def digitar_lento(element, texto, intervalo=0.1):
    """Digita o texto caractere por caractere em um elemento."""
    for caractere in texto:
        element.send_keys(caractere)
        time.sleep(intervalo)

# Função para preencher o formulário
def cadastrar_cliente():
    try:
        # Localizar e preencher o campo Nome Completo
        nome_input = driver.find_element(By.ID, "nome")
        digitar_lento(nome_input, "Nome Aleatório")

        # Localizar e preencher o campo Data de Nascimento
        data_nascimento_input = driver.find_element(By.ID, "dataNascimento")
        data_nascimento_input.send_keys("01011990")  # Formato: DDMMYYYY

        # Selecionar um convênio no dropdown
        convenio_select = Select(driver.find_element(By.ID, "convenio"))
        convenio_select.select_by_value("plano1")

        # Localizar e preencher o campo Telefone
        telefone_input = driver.find_element(By.ID, "telefone")
        digitar_lento(telefone_input, "(11) 91234-5678")

        # Localizar e preencher o campo Endereço
        endereco_input = driver.find_element(By.ID, "endereco")
        digitar_lento(endereco_input, "Rua das Flores, 123")

        # Localizar e preencher o campo CPF
        cpf_input = driver.find_element(By.ID, "cpf")
        digitar_lento(cpf_input, "123.456.789-00")

        # Submeter o formulário
        submit_button = driver.find_element(By.CSS_SELECTOR, "button[type='submit']")
        submit_button.click()

        # Aguarde alguns segundos para verificar o resultado
        time.sleep(5)
        print("Formulário enviado com sucesso!")

    except Exception as e:
        print(f"Erro ao cadastrar cliente: {e}")

    finally:
        # Fechar o navegador
        driver.quit()

# Chamar a função para cadastrar o cliente
cadastrar_cliente()
