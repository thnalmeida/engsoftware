from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import Select
import time

# Configuração do WebDriver
driver = webdriver.Chrome()  # Substitua por webdriver.Firefox() ou outro navegador, se necessário
driver.get('file:///C:/Users/loren/Documents/Trabalho%20(Farm%C3%A1cia)/CadastrarMed.html')  # Substitua com a URL do formulário

# Função para incluir medicamento
def incluir_medicamento():
    # Localiza os campos e preenche os dados
    driver.find_element(By.ID, 'nomeComercial').send_keys("Paracetamol")
    driver.find_element(By.ID, 'nomeGenerico').send_keys("Acetaminofeno")
    driver.find_element(By.ID, 'formaFarmaceutica').send_keys("Comprimido")
    driver.find_element(By.ID, 'dosagem').send_keys("500mg")
    driver.find_element(By.ID, 'viaAdministracao').send_keys("Oral")
    driver.find_element(By.ID, 'registroAnvisa').send_keys("123456")
    driver.find_element(By.ID, 'fabricante').send_keys("Farmacêutica ABC")
    driver.find_element(By.ID, 'lote').send_keys("L2024")
    driver.find_element(By.ID, 'validade').send_keys("2025-12-31")
    driver.find_element(By.ID, 'substanciaAtiva').send_keys("Paracetamol")
    driver.find_element(By.ID, 'valor').send_keys("15.99")
    driver.find_element(By.ID, 'quantidade').send_keys("100")

    # Submeter o formulário
    submit_button = driver.find_element(By.CSS_SELECTOR, "button[type='submit']")
    submit_button.click()
    time.sleep(7)  # Aguarda o processamento

# Chamada das funções
try:
    
    incluir_medicamento()
finally:
    # Fecha o navegador após concluir
    driver.quit()
