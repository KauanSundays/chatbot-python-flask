# Importa as bibliotecas necessárias do Flask
from flask import Flask, render_template, request, jsonify

# Importa a função get_response do módulo chat (você deve ter esse módulo no mesmo diretório)
from chat import get_response

# Cria uma instância do Flask, chamada "app"
app = Flask(__name__)

# Define uma rota para o método GET na URL raiz ("/")
@app.get("/")
def index_get():
    # Renderiza um modelo HTML chamado "base.html" (deve estar na pasta de templates)
    return render_template("base.html")

# Define uma rota para o método POST na URL "/predict"
@app.post("/predict")
def predict():
    # Obtém o conteúdo JSON da solicitação POST e extrai o valor associado à chave "message"
    text = request.get_json().get("message")
    
    # Chama a função get_response com o texto da mensagem e obtém uma resposta
    response = get_response(text)
    
    # Cria um dicionário com a resposta e a chave "answer"
    message = {"answer": response}
    
    # Converte o dicionário em JSON e o retorna como resposta à solicitação POST
    return jsonify(message)

# Verifica se o script está sendo executado diretamente (não importado como um módulo)
if __name__ == "__main__":
    # Inicia o servidor Flask em modo de depuração (debug) na porta padrão 5000
    app.run(debug=True)
