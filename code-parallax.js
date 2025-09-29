// Efeito parallax de código para página de desenvolvimento
document.addEventListener('DOMContentLoaded', function() {
    const codeParallax = document.getElementById('code-parallax');
    const codeLines = document.querySelectorAll('.code-line');
    
    if (!codeParallax || codeLines.length === 0) return;
    
    // Função para controlar visibilidade baseada no scroll
    function updateCodeParallax() {
        const scrollTop = window.pageYOffset;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        
        // COMEÇAR COM POUCAS LINHAS E AUMENTAR GRADUALMENTE
        // Começar com apenas 3-5 linhas e aumentar conforme scroll
        const minVisibleLines = Math.max(3, Math.floor(codeLines.length * 0.1));
        
        // Calcular progresso baseado na posição atual
        const scrollProgress = Math.min(scrollTop / (documentHeight - windowHeight), 1);
        
        // Mostrar mais linhas conforme rola - garantir que apareça até o final
        const additionalLines = Math.floor(scrollProgress * (codeLines.length - minVisibleLines));
        const totalLinesToShow = Math.min(codeLines.length, minVisibleLines + additionalLines);
        
        // Mostrar/esconder linhas baseado no scroll
        codeLines.forEach((line, index) => {
            if (index < totalLinesToShow) {
                line.classList.add('visible');
            } else {
                line.classList.remove('visible');
            }
        });
        
        // OPACIDADE MAIS SUTIL
        codeParallax.style.opacity = '0.3'; // Mais sutil
    }
    
    // Event listener para scroll
    window.addEventListener('scroll', updateCodeParallax);
    
    // INICIALIZAÇÃO SUTIL
    // Garantir que o código apareça de forma mais sutil
    codeParallax.style.opacity = '0.3';
    codeParallax.style.display = 'block';
    
    // Mostrar apenas 3 linhas inicialmente
    const initialLines = Math.min(3, codeLines.length);
    for (let i = 0; i < initialLines; i++) {
        if (codeLines[i]) {
            codeLines[i].classList.add('visible');
        }
    }
    
    // Inicializar
    updateCodeParallax();
    
    // Efeito de cursor piscando na última linha visível
    function addCursorEffect() {
        // Remover cursor anterior
        const existingCursor = codeParallax.querySelector('.cursor');
        if (existingCursor) {
            existingCursor.remove();
        }
        
        // Adicionar cursor à última linha visível
        const visibleLines = document.querySelectorAll('.code-line.visible');
        if (visibleLines.length > 0) {
            const lastLine = visibleLines[visibleLines.length - 1];
            const cursor = document.createElement('span');
            cursor.innerHTML = '|';
            cursor.classList.add('cursor');
            cursor.style.color = '#569cd6';
            cursor.style.animation = 'blink 1s infinite';
            cursor.style.marginLeft = '2px';
            lastLine.appendChild(cursor);
        }
    }
    
    // Adicionar animação de cursor piscando
    const style = document.createElement('style');
    style.textContent = `
        @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    // Atualizar cursor a cada 200ms
    setInterval(addCursorEffect, 200);
});
