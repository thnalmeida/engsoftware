from selenium import webdriver
from selenium.webdriver.common.by import By
import time

# Inicializa o driver do navegador
driver = webdriver.Chrome()  # Certifique-se de ter o ChromeDriver configurado corretamente
driver.get("file:///C:/Users/loren/Documents/Trabalho%20(Farm%C3%A1cia)/relatoriodeestoque.html")  # Substitua pelo caminho correto do arquivo HTML

try:
    # Preencher os campos de filtro (opcional, para simular interação com o formulário)
    data_inicial = driver.find_element(By.ID, "dataInicial")
    data_inicial.send_keys("01-11-2024")

    data_final = driver.find_element(By.ID, "dataFinal")
    data_final.send_keys("31-12-2024")

    validade = driver.find_element(By.ID, "validade")
    validade.send_keys("31-01-2025")

    # Clicar no botão "Gerar Relatório"
    gerar_relatorio_button = driver.find_element(By.XPATH, "//button[contains(text(), 'Gerar Relatório')]")
    gerar_relatorio_button.click()

    # Pausa para garantir que o relatório seja gerado (simulando tempo de processamento)
    time.sleep(10)

    # Verificar se a div "relatorio" está visível
    relatorio_div = driver.find_element(By.ID, "relatorio")
    if relatorio_div.is_displayed():
        print("A div do relatório foi exibida com sucesso!")
    else:
        print("A div do relatório não está visível.")

    # (Opcional) Capturar e exibir os dados do relatório
    total_entrada = driver.find_element(By.ID, "totalEntrada").text
    total_saida = driver.find_element(By.ID, "totalSaida").text
    saldo_final = driver.find_element(By.ID, "saldoFinal").text

    print(f"Total de Entradas: R$ {total_entrada}")
    print(f"Total de Saídas: R$ {total_saida}")
    print(f"Saldo Final: R$ {saldo_final}")

except Exception as e:
    print(f"Ocorreu um erro: {e}")

finally:
    # Fechar o navegador
    driver.quit()
