// ===== SMOOTH SCROLLING & NAVIGATION =====
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// ===== NAVBAR SCROLL EFFECT =====
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 255, 136, 0.1)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// ===== TYPING ANIMATION =====
class TypeWriter {
    constructor(element, words, wait = 3000) {
        this.element = element;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.type();
        this.isDeleting = false;
    }
    
    type() {
        const current = this.wordIndex % this.words.length;
        const fullTxt = this.words[current];
        
        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }
        
        this.element.innerHTML = `<span class="txt">${this.txt}</span>`;
        
        let typeSpeed = 100;
        
        if (this.isDeleting) {
            typeSpeed /= 2;
        }
        
        if (!this.isDeleting && this.txt === fullTxt) {
            typeSpeed = this.wait;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.wordIndex++;
            typeSpeed = 500;
        }
        
        setTimeout(() => this.type(), typeSpeed);
    }
}

// Initialize typing animation
document.addEventListener('DOMContentLoaded', function() {
    const txtElement = document.querySelector('.typing');
    if (txtElement) {
        const words = ['Ready to build the future', 'Creating amazing solutions', 'Transforming ideas into reality'];
        new TypeWriter(txtElement, words, 2000);
    }
});

// ===== SCROLL ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.about-card, .service-card, .project-card, .stat-item, .contact-item');
    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// ===== COUNTER ANIMATION =====
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

// Initialize counter animation
document.addEventListener('DOMContentLoaded', function() {
    const counters = document.querySelectorAll('.stat-number');
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
});

// ===== PARALLAX EFFECT =====
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-elements .element');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
});

// ===== FORM HANDLING =====
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.contact-form form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const name = form.querySelector('input[type="text"]').value;
            const email = form.querySelector('input[type="email"]').value;
            const subject = form.querySelectorAll('input[type="text"]')[1].value;
            const message = form.querySelector('textarea').value;
            
            // Simple validation
            if (!name || !email || !subject || !message) {
                showNotification('Por favor, preencha todos os campos.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Por favor, insira um email válido.', 'error');
                return;
            }
            
            // Simulate form submission
            showNotification('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
            form.reset();
        });
    }
});

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#00ff88' : type === 'error' ? '#ff6b35' : '#8b5cf6'};
        color: #0a0a0a;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
        font-family: 'Source Code Pro', monospace;
        font-weight: 600;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    });
    
    // Auto close after 5 seconds
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }
    }, 5000);
}

// ===== PARTICLE SYSTEM =====
class ParticleSystem {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        
        this.init();
    }
    
    init() {
        this.canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
            opacity: 0.1;
        `;
        
        document.body.appendChild(this.canvas);
        this.resize();
        this.createParticles();
        this.animate();
        
        window.addEventListener('resize', () => this.resize());
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createParticles() {
        const particleCount = 50;
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Wrap around screen
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;
            
            // Mouse interaction
            const dx = this.mouse.x - particle.x;
            const dy = this.mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                const force = (100 - distance) / 100;
                particle.vx += (dx / distance) * force * 0.01;
                particle.vy += (dy / distance) * force * 0.01;
            }
            
            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(0, 255, 136, ${particle.opacity})`;
            this.ctx.fill();
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize particle system
document.addEventListener('DOMContentLoaded', function() {
    new ParticleSystem();
});

// ===== THEME TOGGLE (BONUS) =====
function createThemeToggle() {
    const toggle = document.createElement('button');
    toggle.innerHTML = '🌙';
    toggle.className = 'theme-toggle';
    toggle.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: none;
        background: var(--gradient-primary);
        color: var(--bg-primary);
        font-size: 1.2rem;
        cursor: pointer;
        z-index: 1000;
        transition: var(--transition-normal);
        box-shadow: 0 4px 15px var(--shadow-color);
    `;
    
    toggle.addEventListener('click', function() {
        document.body.classList.toggle('light-theme');
        toggle.innerHTML = document.body.classList.contains('light-theme') ? '☀️' : '🌙';
    });
    
    document.body.appendChild(toggle);
}

// Initialize theme toggle
document.addEventListener('DOMContentLoaded', function() {
    createThemeToggle();
    
    // Initialize GitHub integration
    const projectsUpdater = new ProjectsUpdater();
    projectsUpdater.updateProjects();
});

// ===== PERFORMANCE OPTIMIZATION =====
// Throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(function() {
    // Scroll-based animations here
}, 16)); // ~60fps

// ===== LAZY LOADING =====
const lazyImages = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
        }
    });
});

lazyImages.forEach(img => imageObserver.observe(img));

// ===== GITHUB API INTEGRATION =====
class GitHubAPI {
    constructor() {
        this.username = 'luisfboff1';
        this.apiUrl = 'https://api.github.com';
        this.repositories = [];
    }

    async fetchRepositories() {
        try {
            const response = await fetch(`${this.apiUrl}/users/${this.username}/repos?sort=updated&per_page=100`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const repos = await response.json();
            
            console.log('Total de repositórios encontrados:', repos.length);
            
            // Filtrar repositórios relevantes (não forks, não arquivados)
            this.repositories = repos.filter(repo => 
                !repo.fork && 
                !repo.archived &&
                repo.name !== this.username // Excluir o repositório do próprio site
            );
            
            console.log('Repositórios após filtro:', this.repositories.length);
            console.log('Repositórios filtrados:', this.repositories.map(r => r.name));
            
            return this.repositories;
        } catch (error) {
            console.error('Erro ao buscar repositórios:', error);
            return [];
        }
    }

    async fetchReadme(repoName) {
        try {
            const response = await fetch(`${this.apiUrl}/repos/${this.username}/${repoName}/readme`);
            if (!response.ok) {
                return null;
            }
            const readme = await response.json();
            // Decodificar o conteúdo base64
            return atob(readme.content);
        } catch (error) {
            console.error(`Erro ao buscar README do ${repoName}:`, error);
            return null;
        }
    }

    getLanguageColor(language) {
        const colors = {
            'JavaScript': '#f7df1e',
            'TypeScript': '#3178c6',
            'Python': '#3776ab',
            'Java': '#ed8b00',
            'C++': '#00599c',
            'C#': '#239120',
            'PHP': '#777bb4',
            'Ruby': '#cc342d',
            'Go': '#00add8',
            'Rust': '#000000',
            'Swift': '#fa7343',
            'Kotlin': '#7f52ff',
            'HTML': '#e34f26',
            'CSS': '#1572b6',
            'Vue': '#4fc08d',
            'React': '#61dafb',
            'Angular': '#dd0031',
            'Node.js': '#339933',
            'Docker': '#2496ed',
            'Shell': '#89e051',
            'Outros': '#8b5cf6'
        };
        return colors[language] || '#8b5cf6';
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }
}

// ===== PROJECTS SECTION UPDATER =====
class ProjectsUpdater {
    constructor() {
        this.githubAPI = new GitHubAPI();
        this.projectsContainer = document.querySelector('.projects-grid');
        this.loadingElement = null;
    }

    async updateProjects() {
        this.showLoading();
        
        try {
            const repositories = await this.githubAPI.fetchRepositories();
            this.renderProjects(repositories);
        } catch (error) {
            this.showError();
        } finally {
            this.hideLoading();
        }
    }

    showLoading() {
        this.loadingElement = document.createElement('div');
        this.loadingElement.className = 'loading-projects';
        this.loadingElement.innerHTML = `
            <div class="loading-spinner"></div>
            <p>Carregando projetos do GitHub...</p>
        `;
        this.loadingElement.style.cssText = `
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 2rem;
            color: var(--text-secondary);
            font-family: 'Source Code Pro', monospace;
        `;
        
        this.projectsContainer.innerHTML = '';
        this.projectsContainer.appendChild(this.loadingElement);
    }

    hideLoading() {
        if (this.loadingElement) {
            this.loadingElement.remove();
        }
    }

    showError() {
        this.projectsContainer.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-triangle"></i>
                <p>Erro ao carregar projetos. Tente novamente mais tarde.</p>
            </div>
        `;
    }

    renderProjects(repositories) {
        if (repositories.length === 0) {
            this.projectsContainer.innerHTML = `
                <div class="no-projects">
                    <i class="fas fa-folder-open"></i>
                    <p>Nenhum projeto encontrado.</p>
                </div>
            `;
            return;
        }

        this.projectsContainer.innerHTML = repositories.map(repo => this.createProjectCard(repo)).join('');
        
        // Adicionar event listeners para os modais
        this.addModalListeners();
    }

    createProjectCard(repo) {
        const language = repo.language || 'Outros';
        const languageColor = this.githubAPI.getLanguageColor(language);
        const updatedDate = this.githubAPI.formatDate(repo.updated_at);
        
        console.log('Criando card para:', repo.name, 'Linguagem:', language, 'Descrição:', repo.description);
        
        return `
            <div class="project-card" data-repo="${repo.name}">
                <div class="project-image">
                    <div class="project-overlay">
                        <div class="project-links">
                            <a href="${repo.html_url}" target="_blank" class="project-link" title="Ver no GitHub">
                                <i class="fab fa-github"></i>
                            </a>
                            ${repo.homepage ? `<a href="${repo.homepage}" target="_blank" class="project-link" title="Ver Demo"><i class="fas fa-external-link-alt"></i></a>` : ''}
                            <button class="project-link readme-btn" title="Ver README" data-repo="${repo.name}">
                                <i class="fas fa-book"></i>
                            </button>
                        </div>
                    </div>
                    <div class="project-placeholder">
                        <i class="fab fa-github"></i>
                        <span>${language}</span>
                    </div>
                </div>
                <div class="project-content">
                    <h3>${repo.name}</h3>
                    <p>${repo.description || 'Projeto desenvolvido com ' + language}</p>
                    <div class="project-tech">
                        <span class="tech-tag" style="background-color: ${languageColor}20; color: ${languageColor}; border: 1px solid ${languageColor}40;">
                            ${language}
                        </span>
                        <span class="tech-tag">⭐ ${repo.stargazers_count}</span>
                        <span class="tech-tag">🍴 ${repo.forks_count}</span>
                    </div>
                    <div class="project-meta">
                        <small>Atualizado em ${updatedDate}</small>
                    </div>
                </div>
            </div>
        `;
    }

    addModalListeners() {
        document.querySelectorAll('.readme-btn').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                e.preventDefault();
                const repoName = e.currentTarget.getAttribute('data-repo');
                await this.showReadmeModal(repoName);
            });
        });
    }

    async showReadmeModal(repoName) {
        const modal = document.createElement('div');
        modal.className = 'readme-modal';
        modal.innerHTML = `
            <div class="modal-overlay">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>README - ${repoName}</h3>
                        <button class="modal-close">&times;</button>
                    </div>
                    <div class="modal-body">
                        <div class="loading-readme">
                            <div class="loading-spinner"></div>
                            <p>Carregando README...</p>
                        </div>
                    </div>
                </div>
            </div>
        `;

        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
        `;

        document.body.appendChild(modal);

        // Fechar modal
        modal.querySelector('.modal-close').addEventListener('click', () => {
            document.body.removeChild(modal);
        });

        modal.querySelector('.modal-overlay').addEventListener('click', (e) => {
            if (e.target === modal.querySelector('.modal-overlay')) {
                document.body.removeChild(modal);
            }
        });

        // Carregar README
        try {
            const readme = await this.githubAPI.fetchReadme(repoName);
            const modalBody = modal.querySelector('.modal-body');
            
            if (readme) {
                modalBody.innerHTML = `
                    <div class="readme-content">
                        <pre><code>${this.escapeHtml(readme)}</code></pre>
                    </div>
                `;
            } else {
                modalBody.innerHTML = `
                    <div class="no-readme">
                        <i class="fas fa-file-alt"></i>
                        <p>README não encontrado para este repositório.</p>
                    </div>
                `;
            }
        } catch (error) {
            modal.querySelector('.modal-body').innerHTML = `
                <div class="error-readme">
                    <i class="fas fa-exclamation-triangle"></i>
                    <p>Erro ao carregar README.</p>
                </div>
            `;
        }
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// ===== CONSOLE ART =====
console.log(`
%c
╔══════════════════════════════════════╗
║                                      ║
║    🚀 Luis Fernando Boff 🚀          ║
║                                      ║
║    Desenvolvedor & Engenheiro        ║
║    Especialista em IA & Dados        ║
║                                      ║
║    💻 Full Stack Development         ║
║    🧠 Artificial Intelligence        ║
║    📊 Data Science                   ║
║    ⚡ Solar Energy Projects          ║
║                                      ║
║    🌐 luisfboff.com                  ║
║    📧 luis@luisfboff.com             ║
║                                      ║
╚══════════════════════════════════════╝
`, 'color: #00ff88; font-family: monospace; font-size: 12px;');

console.log('%c👋 Olá! Interessado em trabalhar juntos? Entre em contato!', 'color: #8b5cf6; font-size: 14px; font-weight: bold;');
