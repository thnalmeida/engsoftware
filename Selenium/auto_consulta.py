from selenium import webdriver  # type: ignore
from selenium.webdriver.common.by import By  # type: ignore
from selenium.webdriver.support.ui import Select  # type: ignore
import time

# Função para digitar de forma lenta
def digitar_lento(elemento, texto, intervalo=0.2):
    for caractere in texto:
        elemento.send_keys(caractere)
        time.sleep(intervalo)

# Iniciar o navegador
driver = webdriver.Chrome()  # ou webdriver.Firefox() se estiver usando o Firefox

# Abrir a página com o formulário
driver.get("file:///C:/Users/loren/Documents/Trabalho%20(Farm%C3%A1cia)/ConsultaUsu.html")  # Substitua pelo URL da sua página de consulta

# Função para realizar o teste de consulta de usuário
def testar_consulta_usuario():
    try:
        # Preencher o campo Nome para consulta
        nome = driver.find_element(By.ID, "nomeConsultar")
        digitar_lento(nome, "Maria Oliveira")

        # Selecionar Nível de Acesso para consulta
        nivel = Select(driver.find_element(By.ID, "nivelConsultar"))
        nivel.select_by_value("assistente")  # Seleciona o valor 'assistente'

        # Preencher o campo CPF para consulta
        cpf = driver.find_element(By.ID, "cpfConsultar")
        digitar_lento(cpf, "234.567.890-12")

        # Clicar no botão "Consultar"
        consultar_button = driver.find_element(By.XPATH, "//button[text()='Consultar']")
        consultar_button.click()

        # Pausar para aguardar a exibição dos resultados (ajuste o tempo se necessário)
        time.sleep(2)

        # Verificar se a tabela de resultados está visível
        consulta_resultado = driver.find_element(By.ID, "consultaResultado")
        if consulta_resultado.is_displayed():
            print("Tabela de resultados exibida com sucesso.")

            # Capturar os dados da tabela (exemplo: capturando as linhas de resultado)
            resultado_tabela = driver.find_element(By.ID, "resultadoConsultaTable")
            linhas = resultado_tabela.find_elements(By.TAG_NAME, "tr")
            for linha in linhas:
                colunas = linha.find_elements(By.TAG_NAME, "td")
                dados_linha = [coluna.text for coluna in colunas]
                print("Dados da linha:", dados_linha)
        else:
            print("Erro: Tabela de resultados não exibida.")

    except Exception as e:
        print("Erro durante o teste de consulta:", e)

        # Pausar para observar o resultado do teste
        time.sleep(5)

    finally:
        # Fechar o navegador
        driver.quit()

# Executar a função de teste
testar_consulta_usuario()