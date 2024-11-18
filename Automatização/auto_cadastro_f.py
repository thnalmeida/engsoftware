from selenium import webdriver  #type:ignore
from selenium.webdriver.common.by import By #type:ignore
import time

# Configuração do WebDriver (ajuste o caminho do driver conforme necessário)
driver = webdriver.Chrome()

# Abra a página que contém o formulário
driver.get("file:///C:/Users/loren/Documents/Trabalho%20(Farm%C3%A1cia)/CadastrarF.html")

# Função para digitar mais lentamente
def digitar_lento(element, texto, intervalo=0.1):
    """Digita o texto caractere por caractere em um elemento, com uma pausa entre cada caractere."""
    for caractere in texto:
        element.send_keys(caractere)
        time.sleep(intervalo)
def testar_cadastro():
    try:
        # Preencher o campo "Nome"
        nome_input = driver.find_element(By.ID, "nome")
        digitar_lento(nome_input, "Fornecedor Teste")

        # Preencher o campo "CNPJ"
        cnpj_input = driver.find_element(By.ID, "cnpj")
        digitar_lento(cnpj_input,"12.345.678/0001-90")

        # Preencher o campo "Telefone"
        telefone_input = driver.find_element(By.ID, "telefone")
        digitar_lento(telefone_input,"(12) 34567-8901")

        # Preencher o campo "E-mail"
        email_input = driver.find_element(By.ID, "email")
        digitar_lento(email_input,"teste@fornecedor.com")

        # Preencher o campo "Endereço" (opcional)
        endereco_input = driver.find_element(By.ID, "endereco")
        digitar_lento(endereco_input,"Rua Teste, 123")

        # Submeter o formulário
        submit_button = driver.find_element(By.CSS_SELECTOR, "button[type='submit']")
        submit_button.click()
        
        # Pausar para observar o resultado do teste
        time.sleep(5)

       
        print("Formulário enviado com sucesso!")

    except Exception as e:
        print("Erro durante o teste de cadastro:", e)
            
    finally:
        # Fechar o navegador
        driver.quit()

# Executar a função de teste
testar_cadastro()