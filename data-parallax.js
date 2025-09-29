// Efeito parallax de gráficos de dados para página de ciência de dados
document.addEventListener('DOMContentLoaded', function() {
    const dataParallax = document.getElementById('data-parallax');
    const chartContainers = document.querySelectorAll('.chart-container');
    
    if (!dataParallax || chartContainers.length === 0) return;
    
    // Função para controlar visibilidade baseada no scroll
    function updateDataParallax() {
        const scrollTop = window.pageYOffset;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        
        // COMEÇAR COM POUCOS GRÁFICOS E AUMENTAR GRADUALMENTE
        // Começar com apenas 2-3 gráficos e aumentar conforme scroll
        const minVisibleCharts = Math.max(2, Math.floor(chartContainers.length * 0.2));
        
        // Calcular progresso baseado na posição atual
        const scrollProgress = Math.min(scrollTop / (documentHeight - windowHeight), 1);
        
        // Mostrar mais gráficos conforme rola
        const additionalCharts = Math.floor(scrollProgress * (chartContainers.length - minVisibleCharts));
        const totalChartsToShow = Math.min(chartContainers.length, minVisibleCharts + additionalCharts);
        
        // Mostrar/esconder gráficos baseado no scroll
        chartContainers.forEach((chart, index) => {
            if (index < totalChartsToShow) {
                chart.classList.add('visible');
            } else {
                chart.classList.remove('visible');
            }
        });
        
        // OPACIDADE MAIS SUTIL
        dataParallax.style.opacity = '0.3'; // Mais sutil
    }
    
    // Event listener para scroll
    window.addEventListener('scroll', updateDataParallax);
    
    // INICIALIZAÇÃO SUTIL
    // Garantir que os gráficos apareçam de forma mais sutil
    dataParallax.style.opacity = '0.3';
    dataParallax.style.display = 'block';
    
    // Mostrar apenas 2 gráficos inicialmente
    const initialCharts = Math.min(2, chartContainers.length);
    for (let i = 0; i < initialCharts; i++) {
        if (chartContainers[i]) {
            chartContainers[i].classList.add('visible');
        }
    }
    
    // Inicializar
    updateDataParallax();
    
    // Animação de dados fluindo
    function animateDataFlow() {
        chartContainers.forEach((chart, index) => {
            if (chart.classList.contains('visible')) {
                // Adicionar animação de pulsação aos gráficos visíveis
                chart.style.animation = `dataPulse ${2 + index * 0.5}s ease-in-out infinite`;
            }
        });
    }
    
    // Adicionar animação de pulsação de dados
    const style = document.createElement('style');
    style.textContent = `
        @keyframes dataPulse {
            0%, 100% { 
                transform: scale(1);
                opacity: 0.3;
            }
            50% { 
                transform: scale(1.05);
                opacity: 0.5;
            }
        }
        
        @keyframes barGrow {
            from { height: 0; }
            to { height: var(--target-height); }
        }
        
        @keyframes pointAppear {
            from { 
                opacity: 0;
                transform: scale(0);
            }
            to { 
                opacity: 1;
                transform: scale(1);
            }
        }
        
        @keyframes lineDraw {
            from { stroke-dasharray: 1000; stroke-dashoffset: 1000; }
            to { stroke-dasharray: 1000; stroke-dashoffset: 0; }
        }
    `;
    document.head.appendChild(style);
    
    // Atualizar animações a cada 500ms
    setInterval(animateDataFlow, 500);
});
