class Chatbox {
    constructor() {
        // Inicialização das propriedades e elementos HTML associados
        this.args = {
            openButton: document.querySelector('.chatbox__button'), // Botão de abertura do chat
            chatBox: document.querySelector('.chatbox__support'), // Caixa de chat
            enviarBotao: document.querySelector('.enviar__button'), // Botão de envio
        }

        // Estado inicial do chat e matriz para armazenar mensagens
        this.state = false;
        this.messages = [];
    }

    // Configuração de ouvintes de eventos
    display () {
        const {openButton, chatBox, enviarBotao} = this.args;

        // Ouvinte de clique no botão de abertura para alternar a visibilidade da caixa de chat
        openButton.addEventListener('click', () => this.toggleState(chatbox));

        // Ouvinte de clique no botão de envio para enviar mensagens
        enviarBotao.addEventListener('click', () => this.onEnviarBotao(chatbox));

        const node = chatBox.querySelector('input');        

        // Ouvinte de tecla para "Enter" no campo de entrada de texto
        node.addEventListener("keyup", ({key}) => {
            if(key === "Enter") {
                this.onEnviarBotao(chatbox);
            }
        })
    }

    // Método para alternar o estado da caixa de chat
    toggleState(chatBox) 
    {
        this.state = !this.state;

        if(this.state) 
        {
            chatBox.classList.add('chatbox-active'); 
            // Torna a caixa de chat visível
        } 
        else 
        {
            chatBox.classList.remove('chatbox-active'); 
            // Oculta a caixa de chat
        }
    }

    // Método para lidar com o envio de mensagens
    onEnviarBotao(chatbox)
    {
        var textField = chatbox.querySelector('input');
        let text1 = textField.value;

        // Verifica se o campo de texto está vazio e retorna se for o caso
        if (text1 === "")
        {
            return;
        }

        // Cria uma mensagem do usuário e a adiciona à matriz de mensagens
        let msg1 = {name: "User", message: text1};
        this.messages.push(msg1);
        
        // Envia uma solicitação POST provavelmente para obter uma resposta do servidor
        fetch($SCRIPT_ROOT + '/predict', {
            method: 'POST',
            body: JSON.stringify({message: text1}),
            mode: 'cors',
            headers: {
                'Content-Type' : 'application/json'
            },
        })
        .then(r => r.json())
        .then(r => {
            // Cria uma mensagem de "Sam" com a resposta e a adiciona à matriz de mensagens
            let msg2 = { name: "Sam", message: r.answer };
            this.messages.push(msg2);
            this.updateChatText(chatbox); // Atualiza o conteúdo do chat
            textField.value = ''; // Limpa o campo de entrada de texto
        })
        .catch((error) => {
            console.error('Error: ', error);
            this.updateChatText(chatbox); // Atualiza o conteúdo do chat em caso de erro
            textField.value = ''; // Limpa o campo de entrada de texto em caso de erro
        });
    } 

    updateChatText(chatBox)
    {
        var html = '';
        this.messages.slice().reserve().forEach(function(item, index)
        {
            if (item.name === "Sam")
            {
                html += '<div class="messages__item messages__item--visitor">'+ item.message + '</div>'
            } else
            {
                html += '<div class="messages__item messages__item--operator">'+ item.message + '</div>'
            }
        });

        const chatMessage = chatbox.querySelector('.chatbox__messages');
        chatmessage.innerHTML = html;
    }
}

const chatbox = new Chatbox();
chatbox.display();