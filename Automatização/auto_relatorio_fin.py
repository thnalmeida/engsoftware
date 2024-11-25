from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select
import time

# Inicializa o driver do navegador
driver = webdriver.Chrome()  # Certifique-se de ter o ChromeDriver configurado corretamente
driver.get("file:///C:/Users/loren/Documents/Trabalho%20(Farm%C3%A1cia)/relat%C3%B3riofinanceiro.html")  # Substitua pelo caminho correto do arquivo HTML

try:
    # Preencher os campos do formulário
    data_inicial = driver.find_element(By.ID, "data-inicial")
    data_inicial.send_keys("01-01-2024")

    data_final = driver.find_element(By.ID, "data-final")
    data_final.send_keys("24-09-2024")

    tipo_transacao = Select(driver.find_element(By.ID, "tipo-transacao"))
    tipo_transacao.select_by_value("entrada")  # Escolha o tipo de transação (entrada/saída/todos)

    categoria_transacao = Select(driver.find_element(By.ID, "categoria-transacao"))
    categoria_transacao.select_by_value("todos")  # Escolha a categoria (ou ajuste conforme necessário)

    # Clicar no botão "Gerar Relatório"
    gerar_relatorio_button = driver.find_element(By.ID, "gerar-relatorio")
    gerar_relatorio_button.click()

    # Pausa para garantir o processamento do relatório
    time.sleep(7)

    # Verificar se a div "relatorio" está visível
    relatorio_div = driver.find_element(By.ID, "relatorio")
    if relatorio_div.is_displayed():
        print("A div do relatório foi exibida com sucesso!")

        # (Opcional) Capturar a descrição do relatório
        descricao_relatorio = driver.find_element(By.ID, "descricao-relatorio").text
        print(f"Descrição do Relatório: {descricao_relatorio}")
    else:
        print("A div do relatório não foi exibida.")

except Exception as e:
    print(f"Ocorreu um erro: {e}")

finally:
    # Fechar o navegador
    driver.quit()
