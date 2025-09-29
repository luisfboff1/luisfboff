// ===== LUISBOT - ASSISTENTE IA =====
// Chatbot desenvolvido por Luis Fernando Boff
// Disponível em todas as páginas do site

class LuisBot {
    constructor() {
        this.isOpen = false;
        this.chatContainer = null;
        this.toggleButton = null;
        this.messagesContainer = null;
        this.inputField = null;
        this.init();
    }

    init() {
        this.createChatWidget();
        this.createToggleButton();
        this.bindEvents();
        this.addInitialMessage();
    }

    createChatWidget() {
        // Criar container do chat
        this.chatContainer = document.createElement('div');
        this.chatContainer.id = 'ai-assistant';
        this.chatContainer.className = 'ai-chat-widget';
        this.chatContainer.style.display = 'none';

        this.chatContainer.innerHTML = `
            <div class="chat-header">
                <h3>🤖 LuisBot</h3>
                <p>IA desenvolvida por Luis Fernando Boff</p>
                <button class="close-chat" onclick="luisBot.toggleChat()">×</button>
            </div>
            
            <div class="suggested-questions">
                <p>💡 <span class="suggested-title">Perguntas:</span></p>
                <button onclick="luisBot.askSuggested('Experiência do Luis?')">Experiência</button>
                <button onclick="luisBot.askSuggested('Projetos desenvolvidos?')">Projetos</button>
                <button onclick="luisBot.askSuggested('Contato?')">Contato</button>
                <button onclick="luisBot.askSuggested('Energia solar?')">Energia Solar</button>
                <button onclick="luisBot.askSuggested('Ciência de dados?')">Ciência de Dados</button>
            </div>
            
            <div class="chat-messages" id="chat-messages">
            </div>
            
            <div class="chat-input">
                <input type="text" id="chat-input" placeholder="Faça sua pergunta..." 
                       onkeypress="luisBot.handleEnter(event)">
                <button onclick="luisBot.sendMessage()">Enviar</button>
            </div>
        `;

        document.body.appendChild(this.chatContainer);
        this.messagesContainer = this.chatContainer.querySelector('#chat-messages');
        this.inputField = this.chatContainer.querySelector('#chat-input');
    }

    createToggleButton() {
        this.toggleButton = document.createElement('button');
        this.toggleButton.id = 'chat-toggle';
        this.toggleButton.className = 'chat-toggle';
        this.toggleButton.innerHTML = '🤖';
        this.toggleButton.onclick = () => this.toggleChat();

        document.body.appendChild(this.toggleButton);
    }

    bindEvents() {
        // Fechar chat ao clicar fora
        document.addEventListener('click', (e) => {
            if (this.isOpen && !this.chatContainer.contains(e.target) && !this.toggleButton.contains(e.target)) {
                this.closeChat();
            }
        });

        // Foco no input quando abrir
        this.inputField.addEventListener('focus', () => {
            this.inputField.scrollIntoView({ behavior: 'smooth' });
        });
    }

    addInitialMessage() {
        this.addMessage('ai', `
            <p>Olá! Sou o LuisBot, assistente IA desenvolvido por Luis Fernando Boff! 🤖</p>
            <p>Posso responder perguntas sobre:</p>
            <ul>
                <li>📊 Experiência e habilidades do Luis</li>
                <li>💻 Projetos de desenvolvimento</li>
                <li>⚡ Projetos de energia solar</li>
                <li>🧠 Ciência de dados e IA</li>
                <li>📞 Informações de contato</li>
            </ul>
            <p>Como posso ajudar você hoje?</p>
        `);
    }

    toggleChat() {
        if (this.isOpen) {
            this.closeChat();
        } else {
            this.openChat();
        }
    }

    openChat() {
        this.isOpen = true;
        this.chatContainer.style.display = 'flex';
        this.toggleButton.style.display = 'none';
        
        // Focar no input após animação
        setTimeout(() => {
            this.inputField.focus();
        }, 300);
    }

    closeChat() {
        this.isOpen = false;
        this.chatContainer.style.display = 'none';
        this.toggleButton.style.display = 'flex';
    }

    handleEnter(event) {
        if (event.key === 'Enter') {
            this.sendMessage();
        }
    }

    sendMessage() {
        const message = this.inputField.value.trim();
        if (!message) return;

        this.addMessage('user', message);
        this.inputField.value = '';

        // Mostrar indicador de digitação
        this.showTypingIndicator();

        // Simular processamento
        setTimeout(() => {
            this.hideTypingIndicator();
            this.processMessage(message);
        }, 1000 + Math.random() * 1000);
    }

    askSuggested(question) {
        this.inputField.value = question;
        this.sendMessage();
    }

    addMessage(type, content) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}-message`;
        messageDiv.innerHTML = content;
        
        this.messagesContainer.appendChild(messageDiv);
        this.scrollToBottom();
    }

    showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message ai-message typing-indicator';
        typingDiv.innerHTML = '<p class="typing-dots">LuisBot está digitando...</p>';
        typingDiv.id = 'typing-indicator';
        
        this.messagesContainer.appendChild(typingDiv);
        this.scrollToBottom();
    }

    hideTypingIndicator() {
        const typingDiv = document.getElementById('typing-indicator');
        if (typingDiv) {
            typingDiv.remove();
        }
    }

    scrollToBottom() {
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }

    processMessage(message) {
        const lowerMessage = message.toLowerCase();
        let response = '';

        // Respostas baseadas em palavras-chave
        if (lowerMessage.includes('experiência') || lowerMessage.includes('experiencia')) {
            response = `
                <p><strong>Experiência do Luis Fernando Boff:</strong></p>
                <ul>
                    <li>📊 <strong>Cientista de Dados</strong> na EvcomX (2025 - Atual)</li>
                    <li>👨‍🏫 <strong>Professor</strong> na UCS (2023 - Atual)</li>
                    <li>🔬 <strong>Pesquisador</strong> na UFRGS (2023 - Atual)</li>
                    <li>⚡ <strong>Projetista Solar</strong> Independente (2021 - Atual)</li>
                    <li>🏢 <strong>Engenheiro</strong> na Petinelli Inc. (2018-2020)</li>
                </ul>
                <p>Mais de <strong>70 projetos fotovoltaicos</strong> aprovados e <strong>9 anos</strong> de experiência!</p>
            `;
        } else if (lowerMessage.includes('projeto') || lowerMessage.includes('desenvolvido')) {
            response = `
                <p><strong>Projetos do Luis:</strong></p>
                <ul>
                    <li>💻 <strong>Desenvolvimento Full Stack:</strong> React, Node.js, Python</li>
                    <li>🧠 <strong>IA e Machine Learning:</strong> TensorFlow, PyTorch</li>
                    <li>⚡ <strong>Energia Solar:</strong> Mais de 70 projetos aprovados</li>
                    <li>📊 <strong>Ciência de Dados:</strong> Análises e visualizações</li>
                    <li>🏠 <strong>Casas Inteligentes:</strong> Pesquisa em IA para automação</li>
                </ul>
                <p>Veja os projetos no GitHub: <a href="https://github.com/luisfboff1" target="_blank">github.com/luisfboff1</a></p>
            `;
        } else if (lowerMessage.includes('contato') || lowerMessage.includes('contatar')) {
            response = `
                <p><strong>Informações de Contato:</strong></p>
                <ul>
                    <li>📧 <strong>Email:</strong> <a href="mailto:luisfboff@hotmail.com">luisfboff@hotmail.com</a></li>
                    <li>💼 <strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/luis-fernando-boff-7a64a716b/" target="_blank">linkedin.com/in/luis-fernando-boff-7a64a716b</a></li>
                    <li>🐙 <strong>GitHub:</strong> <a href="https://github.com/luisfboff1" target="_blank">github.com/luisfboff1</a></li>
                </ul>
                <p>Luis está sempre disponível para novos projetos e colaborações! 🚀</p>
            `;
        } else if (lowerMessage.includes('energia') || lowerMessage.includes('solar') || lowerMessage.includes('fotovoltaico')) {
            response = `
                <p><strong>Especialização em Energia Solar:</strong></p>
                <ul>
                    <li>⚡ <strong>Mais de 70 projetos</strong> fotovoltaicos aprovados</li>
                    <li>🏢 <strong>4 concessionárias</strong> aprovadas (CEEE, RGE, CPFL, ENEL)</li>
                    <li>📐 <strong>Ferramentas:</strong> AutoCAD, PVSyst, HelioScope</li>
                    <li>💰 <strong>Análises financeiras</strong> e viabilidade</li>
                    <li>🏠 <strong>Geração distribuída</strong> e autoconsumo remoto</li>
                </ul>
                <p>Luis é especialista em transformar ideias em projetos solares viáveis! ☀️</p>
            `;
        } else if (lowerMessage.includes('dados') || lowerMessage.includes('ciência') || lowerMessage.includes('ciencia') || lowerMessage.includes('ia') || lowerMessage.includes('inteligência')) {
            response = `
                <p><strong>Ciência de Dados e IA:</strong></p>
                <ul>
                    <li>📊 <strong>Cientista de Dados</strong> na EvcomX</li>
                    <li>🧠 <strong>Machine Learning:</strong> Python, TensorFlow, PyTorch</li>
                    <li>🔬 <strong>Pesquisa:</strong> IA para casas inteligentes (UFRGS)</li>
                    <li>📈 <strong>Análise de dados:</strong> Pandas, NumPy, Scikit-learn</li>
                    <li>🎯 <strong>Visualização:</strong> Tableau, Power BI, Matplotlib</li>
                </ul>
                <p>Luis transforma dados em insights valiosos para tomada de decisões! 📊</p>
            `;
        } else if (lowerMessage.includes('desenvolvimento') || lowerMessage.includes('programação') || lowerMessage.includes('programacao') || lowerMessage.includes('código') || lowerMessage.includes('codigo')) {
            response = `
                <p><strong>Desenvolvimento Full Stack:</strong></p>
                <ul>
                    <li>💻 <strong>Frontend:</strong> React, Next.js, TypeScript, HTML/CSS</li>
                    <li>⚙️ <strong>Backend:</strong> Node.js, Python, PHP</li>
                    <li>🗄️ <strong>Banco de dados:</strong> MySQL, PostgreSQL, MongoDB</li>
                    <li>📱 <strong>Mobile:</strong> React Native, Flutter</li>
                    <li>☁️ <strong>Cloud:</strong> AWS, Azure, Hostinger, Vercel</li>
                </ul>
                <p>Luis cria soluções completas do frontend ao backend! 💻</p>
            `;
        } else if (lowerMessage.includes('habilidade') || lowerMessage.includes('skill') || lowerMessage.includes('tecnologia')) {
            response = `
                <p><strong>Principais Habilidades:</strong></p>
                <ul>
                    <li>💻 <strong>Desenvolvimento:</strong> JavaScript, Python, React, Node.js</li>
                    <li>🧠 <strong>IA/ML:</strong> TensorFlow, PyTorch, Scikit-learn</li>
                    <li>📊 <strong>Dados:</strong> Pandas, NumPy, SQL, Tableau</li>
                    <li>⚡ <strong>Energia Solar:</strong> AutoCAD, PVSyst, HelioScope</li>
                    <li>☁️ <strong>DevOps:</strong> Docker, Kubernetes, CI/CD</li>
                </ul>
                <p>Mais de <strong>25 tecnologias</strong> dominadas! 🚀</p>
            `;
        } else {
            response = `
                <p>Desculpe, não entendi completamente sua pergunta. 😅</p>
                <p>Posso ajudar com informações sobre:</p>
                <ul>
                    <li>📊 Experiência e habilidades</li>
                    <li>💻 Projetos de desenvolvimento</li>
                    <li>⚡ Energia solar</li>
                    <li>🧠 Ciência de dados</li>
                    <li>📞 Contato</li>
                </ul>
                <p>Tente fazer uma pergunta mais específica! 😊</p>
            `;
        }

        this.addMessage('ai', response);
    }
}

// Inicializar o LuisBot quando a página carregar
let luisBot;
document.addEventListener('DOMContentLoaded', function() {
    luisBot = new LuisBot();
});

// Funções globais para compatibilidade
function toggleChat() {
    if (luisBot) {
        luisBot.toggleChat();
    }
}

function askSuggested(question) {
    if (luisBot) {
        luisBot.askSuggested(question);
    }
}

function sendMessage() {
    if (luisBot) {
        luisBot.sendMessage();
    }
}

function handleEnter(event) {
    if (luisBot) {
        luisBot.handleEnter(event);
    }
}
