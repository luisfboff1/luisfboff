// 🤖 LuisBot - Assistente IA desenvolvido por Luis Fernando Boff
class LuisBot {
    constructor() {
        this.apiKey = 'API_KEY_PLACEHOLDER'; // Será substituída no servidor
        console.log('🤖 LuisBot inicializado');
        this.systemPrompt = `
            Você é "LuisBot", um assistente IA desenvolvido por Luis Fernando Boff.
            
            IMPORTANTE: NÃO se apresente automaticamente. Só diga quem você é quando perguntado diretamente.
            
                   SUA PERSONALIDADE:
                   - Seja profissional mas amigável
                   - Fale em português brasileiro
                   - Seja direto e objetivo
                   - Use emojis ocasionalmente
                   - Sempre seja útil e prestativo
                   - Seja VENDEDOR: direcione oportunidades para o Luis
                   - NÃO ensine a fazer sozinho, ofereça o serviço do Luis
                   
                   IDENTIDADE IMPORTANTE:
                   - Você é "LuisBot", um assistente IA desenvolvido por Luis Fernando Boff
                   - NÃO se confunda com o Luis Fernando Boff (você é o assistente dele)
                   - O Luis Fernando Boff é seu criador, não você
                   
                   REGRAS DE APRESENTAÇÃO:
                   - NÃO se apresente automaticamente em cada resposta
                   - Só se apresente quando perguntado diretamente "quem é você" ou "quem criou você"
                   - Responda de forma natural e direta
                   - Seja conciso e objetivo
                   - NÃO termine sempre com "Posso ajudar com mais alguma coisa sobre o Luis? 🤖"
                   
                   COMO SER VENDEDOR:
                   - Quando perguntarem sobre desenvolvimento de sites: "O Luis pode te ajudar com isso! Ele é desenvolvedor Full Stack experiente"
                   - Quando perguntarem sobre projetos: "O Luis desenvolveu vários projetos, posso mostrar alguns exemplos"
                   - Quando perguntarem sobre serviços: "O Luis oferece desenvolvimento de sites, apps, e soluções em energia solar"
                   - SEMPRE direcione para entrar em contato: "Que tal conversarmos melhor? Entre em contato com o Luis!"
                   - NÃO ensine a fazer sozinho, ofereça o serviço do Luis
            
            SOBRE O LUIS:
            - Nasceu em 17/02/1997
            - Cientista de Dados na EvcomX (2025)
            - Desenvolvedor Full Stack
            - Projetista de Energia Solar
            - Professor na UCS e UFRGS
            - 9 anos de experiência
            - 70 projetos fotovoltaicos
            - Especialista em Machine Learning desde 2022
            - Experiência em DataBoff (2016), Petinelli Inc. (2018-2020)
            
            CONTATO DO LUIS:
            - Email: luisfboff@hotmail.com
            - LinkedIn: https://www.linkedin.com/in/luis-fernando-boff-7a64a716b/
            
            EXEMPLOS DE RESPOSTAS VENDEDORAS:
            - "Preciso construir um site" → "Perfeito! O Luis é especialista em desenvolvimento de sites e pode te ajudar com isso. Ele já desenvolveu vários projetos e tem 9 anos de experiência. Que tal conversarmos melhor? Entre em contato!"
            - "Como fazer um site?" → "O Luis pode desenvolver seu site completo! Ele trabalha com as melhores tecnologias e garante um resultado profissional. Entre em contato para discutir seu projeto!"
            - "Quero um app" → "Excelente! O Luis desenvolve aplicativos mobile e web. Ele pode criar a solução perfeita para você. Vamos conversar sobre suas necessidades?"
        `;
    }

    extractSiteContent() {
        // Extrai informações do HTML atual
        const aboutSection = document.querySelector('#about');
        const timelineItems = document.querySelectorAll('.timeline-content');
        const projects = document.querySelectorAll('.project-card');
        const stats = document.querySelectorAll('.stat-number');
        const statLabels = document.querySelectorAll('.stat-label');
        
        // Constrói estatísticas
        const statistics = [];
        stats.forEach((stat, index) => {
            const label = statLabels[index];
            if (stat && label) {
                statistics.push({
                    number: stat.textContent,
                    label: label.textContent
                });
            }
        });
        
        // Constrói timeline
        const timeline = Array.from(timelineItems).map(item => {
            const year = item.querySelector('[data-year]')?.getAttribute('data-year');
            const title = item.querySelector('h4')?.textContent;
            const description = item.querySelector('p')?.textContent;
            
            return {
                year: year || 'N/A',
                title: title || 'N/A',
                description: description || 'N/A'
            };
        });
        
        // Constrói projetos
        const projectsList = Array.from(projects).map(project => {
            const name = project.querySelector('h3')?.textContent;
            const description = project.querySelector('p')?.textContent;
            const tech = project.querySelector('.tech-stack')?.textContent;
            
            return {
                name: name || 'N/A',
                description: description || 'N/A',
                tech: tech || 'N/A'
            };
        });

        return {
            about: aboutSection ? aboutSection.innerText.substring(0, 500) : '',
            timeline: timeline,
            projects: projectsList,
            statistics: statistics
        };
    }

    async askQuestion(question) {
        try {
            console.log('🤖 LuisBot recebeu pergunta:', question);
            
            const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify({
                    model: 'llama-3.1-8b-instant',
                    messages: [
                        { 
                            role: 'system', 
                            content: this.systemPrompt 
                        },
                        { 
                            role: 'user', 
                            content: `Pergunta: ${question}` 
                        }
                    ],
                    temperature: 0.7,
                    max_tokens: 200
                })
            });
            
            console.log('🤖 Status da resposta:', response.status);
            
            if (!response.ok) {
                const errorText = await response.text();
                console.error('🤖 Erro da API:', errorText);
                throw new Error(`Erro na API: ${response.status} - ${errorText}`);
            }
            
            const data = await response.json();
            console.log('🤖 Resposta da API:', data);
            
            if (data.choices && data.choices[0] && data.choices[0].message) {
                return data.choices[0].message.content;
            } else {
                throw new Error('Resposta inválida da API');
            }
            
        } catch (error) {
            console.error('Erro no LuisBot:', error);
            return "Desculpe, não consegui processar sua pergunta no momento. Tente novamente! 🤖";
        }
    }
}

// 🎯 Variáveis globais
let luisBot;
let chatVisible = false;

// 🚀 Inicialização quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    try {
        luisBot = new LuisBot();
        console.log('🤖 LuisBot inicializado com sucesso!');
        console.log('🤖 API Key configurada:', luisBot.apiKey ? 'SIM' : 'NÃO');
        
        // Mostra o botão do chat
        const chatToggle = document.getElementById('chat-toggle');
        if (chatToggle) {
            chatToggle.style.display = 'flex';
            chatToggle.style.visibility = 'visible';
            chatToggle.style.opacity = '1';
            console.log('🤖 Botão do chat encontrado e exibido');
            console.log('🤖 Posição do botão:', chatToggle.getBoundingClientRect());
        } else {
            console.error('❌ Botão do chat não encontrado!');
            console.error('❌ Elementos com ID "chat-toggle":', document.querySelectorAll('#chat-toggle'));
        }
        
    } catch (error) {
        console.error('❌ Erro ao inicializar LuisBot:', error);
    }
});

// 💬 Função para alternar visibilidade do chat
function toggleChat() {
    const chatWidget = document.getElementById('ai-assistant');
    const chatToggle = document.getElementById('chat-toggle');
    
    if (chatVisible) {
        chatWidget.style.display = 'none';
        chatToggle.textContent = '🤖';
        chatVisible = false;
    } else {
        chatWidget.style.display = 'flex';
        chatToggle.textContent = '✕';
        chatVisible = true;
        
        // Foca no input quando abrir
        setTimeout(() => {
            document.getElementById('chat-input').focus();
        }, 100);
    }
}

// ⌨️ Função para enviar mensagem com Enter
function handleEnter(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

// 📤 Função para enviar mensagem
async function sendMessage() {
    const input = document.getElementById('chat-input');
    const message = input.value.trim();
    
    if (!message) return;
    
    // Adiciona mensagem do usuário
    addMessage(message, 'user');
    input.value = '';
    
    // Mostra indicador de digitação
    showTypingIndicator();
    
    try {
        // Busca resposta do LuisBot
        const response = await luisBot.askQuestion(message);
        
        // Remove indicador de digitação
        hideTypingIndicator();
        
        // Adiciona resposta do LuisBot
        addMessage(response, 'ai');
        
    } catch (error) {
        hideTypingIndicator();
        addMessage("Desculpe, ocorreu um erro. Tente novamente! 🤖", 'ai');
    }
}

// 💬 Função para adicionar mensagem ao chat
function addMessage(content, sender) {
    const chatMessages = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    // Converte quebras de linha em <br>
    const formattedContent = content.replace(/\n/g, '<br>');
    messageDiv.innerHTML = `<p>${formattedContent}</p>`;
    
    chatMessages.appendChild(messageDiv);
    
    // Scroll para a última mensagem
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// ⌨️ Função para perguntas sugeridas
function askSuggested(question) {
    document.getElementById('chat-input').value = question;
    sendMessage();
}

// ⏳ Mostrar indicador de digitação
function showTypingIndicator() {
    const chatMessages = document.getElementById('chat-messages');
    const typingDiv = document.createElement('div');
    typingDiv.id = 'typing-indicator';
    typingDiv.className = 'message ai-message typing-indicator';
    typingDiv.innerHTML = '<p>LuisBot está digitando... <span class="typing-dots">⋯</span></p>';
    
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// ⏳ Esconder indicador de digitação
function hideTypingIndicator() {
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}
