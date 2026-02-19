// Theme Toggle with Persistence
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

const currentTheme = localStorage.getItem('theme') || 'dark';
if (currentTheme === 'light') {
    body.classList.add('light');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('light');
    const isLight = body.classList.contains('light');
    themeToggle.innerHTML = isLight ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
});

// Mobile Menu
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('show');
});

// Scroll Progress
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.offsetHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    document.querySelector('.scroll-progress').style.width = progress + '%';
});

// Fade-in Observer
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// Skills Progress Bars
const animateSkills = () => {
    document.querySelectorAll('.progress').forEach(bar => {
        const width = bar.getAttribute('data-width');
        setTimeout(() => bar.style.width = width + '%', 500);
    });
};

window.addEventListener('scroll', () => {
    if (document.getElementById('skills').getBoundingClientRect().top < window.innerHeight) {
        animateSkills();
    }
});

// Project Filters
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;

        projectCards.forEach(card => {
            if (filter === 'all' || card.dataset.category === filter) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
                card.classList.add('visible');
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                card.classList.remove('visible');
            }
        });
    });
});

// Email Form
const form = document.getElementById('contact-form');
const loader = document.getElementById('loader');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    loader.style.display = 'inline-block';
    form.querySelector('button').disabled = true;

    emailjs.sendForm('service_mf8cz8k', 'template_5w1lm6f', form)
        .then(() => {
            alert('Message sent! 🚀');
            form.reset();
        })
        .catch(error => {
            alert('Oops! Try again.');
            console.error('EmailJS:', error);
        })
        .finally(() => {
            loader.style.display = 'none';
            form.querySelector('button').disabled = false;
        });
});

// Smooth Scroll for Nav Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        target.scrollIntoView({ behavior: 'smooth' });
        navLinks.classList.remove('show'); // Close mobile menu
    });
});
