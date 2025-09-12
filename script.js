// Japanese Portfolio Interactive JavaScript
class JapanesePortfolio {
    constructor() {
        this.init();
        this.bindEvents();
        this.createParticles();
        this.setupScrollAnimations();
        this.setupCursor();
    }

    init() {
        // Remove loading screen after page load
        window.addEventListener('load', () => {
            setTimeout(() => {
                const loadingScreen = document.getElementById('loadingScreen');
                if (loadingScreen) {
                    loadingScreen.classList.add('hidden');
                }
                this.animateHero();
            }, 1000);
        });

        // Initialize theme
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.body.setAttribute('data-theme', savedTheme);
    }

    bindEvents() {
        // Theme toggle
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }

        // Smooth scrolling for navigation
        const navLinks = document.querySelectorAll('[data-scroll]');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = e.target.getAttribute('data-scroll') || 
                               e.target.closest('[data-scroll]').getAttribute('data-scroll');
                this.smoothScrollTo(target);
            });
        });
    }

    toggleTheme() {
        const currentTheme = document.body.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    }

    smoothScrollTo(targetId) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 60,
                behavior: 'smooth'
            });
        }
    }

    animateHero() {
        const heroText = document.querySelector('.hero-content h1');
        if (heroText) {
            heroText.classList.add('fade-in');
        }
    }

    createParticles() {
        const canvas = document.getElementById('particles');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let particles = [];

        class Particle {
            constructor(x, y, size, speedX, speedY) {
                this.x = x;
                this.y = y;
                this.size = size;
                this.speedX = speedX;
                this.speedY = speedY;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.size > 0.2) this.size -= 0.02;
            }
            draw() {
                ctx.fillStyle = 'rgba(255,255,255,0.6)';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fill();
            }
        }

        function initParticles() {
            particles = [];
            for (let i = 0; i < 100; i++) {
                const size = Math.random() * 3 + 1;
                const x = Math.random() * canvas.width;
                const y = Math.random() * canvas.height;
                const speedX = (Math.random() - 0.5) * 1.5;
                const speedY = (Math.random() - 0.5) * 1.5;
                particles.push(new Particle(x, y, size, speedX, speedY));
            }
        }

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach((p, i) => {
                p.update();
                p.draw();
                if (p.size <= 0.3) {
                    particles.splice(i, 1);
                    particles.push(new Particle(
                        Math.random() * canvas.width,
                        Math.random() * canvas.height,
                        Math.random() * 3 + 1,
                        (Math.random() - 0.5) * 1.5,
                        (Math.random() - 0.5) * 1.5
                    ));
                }
            });
            requestAnimationFrame(animateParticles);
        }

        initParticles();
        animateParticles();
    }

    setupScrollAnimations() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                }
            });
        }, { threshold: 0.2 });

        elements.forEach(el => observer.observe(el));
    }

    setupCursor() {
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
    });

    document.querySelectorAll('a, button').forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('active'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('active'));
    });
}
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    new JapanesePortfolio();
});

