// Sol universal que funciona em todas as páginas
document.addEventListener('DOMContentLoaded', function() {
    const simpleSun = document.getElementById('simple-sun');
    
    // Usar sempre o sol simples (emoji)
    let activeSun = simpleSun;
    if (simpleSun) {
        simpleSun.style.display = 'block';
        simpleSun.style.opacity = '1';
    }
    
    function updateSunPosition() {
        const scrollTop = window.pageYOffset;
        const windowHeight = window.innerHeight;
        
        // Progresso baseado na altura da viewport (mais consistente)
        const scrollProgress = Math.min(scrollTop / (windowHeight * 2), 1); // 2x a altura da tela
        
                // Posições fixas baseadas na viewport
                // Início: esquerda mais para cima
                // Meio: centro no topo da tela  
                // Fim: direita mais para cima
                const sunLeft = 10 + (scrollProgress * 80); // De 10% a 90%
                const sunTop = 30 - (Math.sin(scrollProgress * Math.PI) * 20); // De 30% a 10% (meio-dia)
        
        // Tamanho do sol (maior no meio do dia)
        const sunSize = 100 + (Math.sin(scrollProgress * Math.PI) * 40);
        
        // Opacidade (mais brilhante no meio do dia)
        const opacity = Math.sin(scrollProgress * Math.PI);
        
        if (activeSun) {
            activeSun.style.left = sunLeft + '%';
            activeSun.style.top = sunTop + '%';
            activeSun.style.width = sunSize + 'px';
            activeSun.style.height = sunSize + 'px';
            activeSun.style.opacity = 0.4 + (opacity * 0.6);
        }
        
        // Aplicar filtros de cor conforme o "horário" para o emoji
        if (activeSun === simpleSun) {
            const sunEmoji = simpleSun.querySelector('.sun-emoji');
            if (sunEmoji) {
                if (scrollProgress < 0.3) {
                    // Amanhecer - tons laranja
                    sunEmoji.style.filter = 'drop-shadow(0 0 25px rgba(255, 140, 0, 0.9)) hue-rotate(30deg)';
                } else if (scrollProgress > 0.7) {
                    // Entardecer - tons vermelhos
                    sunEmoji.style.filter = 'drop-shadow(0 0 25px rgba(255, 69, 0, 0.9)) hue-rotate(60deg)';
                } else {
                    // Meio-dia - amarelo brilhante
                    sunEmoji.style.filter = 'drop-shadow(0 0 30px rgba(255, 215, 0, 1))';
                }
            }
        }
    }
    
    // Atualizar posição do sol no scroll
    window.addEventListener('scroll', updateSunPosition);
    
    // Atualizar posição inicial
    updateSunPosition();
});
