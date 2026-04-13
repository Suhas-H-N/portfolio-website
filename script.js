/* ═══════════════════════════════════════════════
   Suhas H N Portfolio — script.js v2
   ═══════════════════════════════════════════════ */

// ── 1. SCROLL PROGRESS ──────────────────────────
const scrollProgress = document.getElementById('scrollProgress');
const navbar         = document.getElementById('navbar');
const backToTop      = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    scrollProgress.style.width = pct + '%';
    navbar.classList.toggle('scrolled', window.scrollY > 20);
    backToTop.classList.toggle('visible', window.scrollY > 400);
    highlightNav();
});

// ── 2. BACK TO TOP ───────────────────────────────
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ── 3. ACTIVE NAV ────────────────────────────────
function highlightNav() {
    let current = '';
    document.querySelectorAll('section[id]').forEach(sec => {
        if (window.scrollY >= sec.offsetTop - 130) current = sec.id;
    });
    document.querySelectorAll('.nav-links a').forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
    });
}

// ── 4. MOBILE MENU ───────────────────────────────
const menuToggle = document.getElementById('menuToggle');
const navLinks   = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const icon = menuToggle.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.querySelector('i').className = 'fas fa-bars';
}));

// ── 5. THEME TOGGLE ──────────────────────────────
const themeToggle = document.getElementById('themeToggle');
let isDark = localStorage.getItem('theme') !== 'light';

function applyTheme() {
    document.body.classList.toggle('light', !isDark);
    themeToggle.innerHTML = isDark ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
}
applyTheme();

themeToggle.addEventListener('click', () => {
    isDark = !isDark;
    applyTheme();
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// ── 6. FADE IN ON SCROLL ─────────────────────────
const fadeObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); fadeObs.unobserve(e.target); }
    });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-in').forEach(el => fadeObs.observe(el));

// ── 7. SKILL BARS ────────────────────────────────
const skillObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.querySelectorAll('.bar-fill').forEach(b =>
                setTimeout(() => b.style.width = b.dataset.width + '%', 120)
            );
            skillObs.unobserve(e.target);
        }
    });
}, { threshold: 0.2 });
document.querySelectorAll('.skill-category').forEach(el => skillObs.observe(el));

// ── 8. COUNTER ANIMATION ─────────────────────────
function animateCounter(el) {
    const target = parseInt(el.dataset.target);
    let current  = 0;
    const inc    = target / (1400 / 16);
    const timer  = setInterval(() => {
        current += inc;
        if (current >= target) { current = target; clearInterval(timer); }
        el.textContent = Math.floor(current);
    }, 16);
}

const countObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.querySelectorAll('.stat-number[data-target]').forEach(animateCounter);
            countObs.unobserve(e.target);
        }
    });
}, { threshold: 0.35 });
const aboutSection = document.querySelector('.about');
if (aboutSection) countObs.observe(aboutSection);

// ── 9. PROJECT FILTER ────────────────────────────
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        document.querySelectorAll('.project-card').forEach(card => {
            const show = filter === 'all' || card.dataset.category === filter;
            if (show) {
                card.style.display = '';
                requestAnimationFrame(() => { card.style.opacity = '1'; card.style.transform = 'translateY(0)'; });
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(12px)';
                setTimeout(() => { if (card.style.opacity === '0') card.style.display = 'none'; }, 280);
            }
        });
    });
});

// ── 10. CONTACT FORM ─────────────────────────────
// FIX: original code used 'contactForm' but HTML id is 'contact-form'
const contactForm = document.getElementById('contact-form');
const submitBtn   = document.getElementById('submitBtn');
const formStatus  = document.getElementById('formStatus');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name    = this.from_name?.value.trim()  || '';
        const email   = this.from_email?.value.trim() || '';
        const message = this.message?.value.trim()    || '';

        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending…';
        formStatus.textContent = '';
        formStatus.className   = 'form-status';

        // EmailJS — replace SERVICE_ID and TEMPLATE_ID with your actual IDs
        emailjs.sendForm('SERVICE_ID', 'TEMPLATE_ID', this)
            .then(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';
                formStatus.textContent = '✅ Message sent! I\'ll get back to you soon.';
                formStatus.classList.add('success');

                // Track message count
                const msgCount = parseInt(localStorage.getItem('msgCount') || '0') + 1;
                localStorage.setItem('msgCount', msgCount);

                // Log message to admin dashboard
                logMessage({ name, email, message });

                contactForm.reset();
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
                }, 4000);
            })
            .catch(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
                formStatus.textContent = '❌ Failed to send. Email me directly at suhassuhas3335@gmail.com';
                formStatus.classList.add('error');
            });
    });
}

// ── 11. ANALYTICS (localStorage) ─────────────────
function trackVisit() {
    const visits = parseInt(localStorage.getItem('visits') || '0') + 1;
    localStorage.setItem('visits', visits);
    localStorage.setItem('lastVisit', new Date().toISOString());
}
trackVisit();

// Track resume downloads
document.querySelectorAll('a[download]').forEach(link => {
    link.addEventListener('click', () => {
        const dl = parseInt(localStorage.getItem('downloads') || '0') + 1;
        localStorage.setItem('downloads', dl);
    });
});

// Log a contact message
function logMessage(msg) {
    const msgs = JSON.parse(localStorage.getItem('messages') || '[]');
    msgs.unshift({ ...msg, date: new Date().toLocaleString() });
    localStorage.setItem('messages', JSON.stringify(msgs.slice(0, 10)));
}

// ── 12. ADMIN MODAL ───────────────────────────────
const loginModal = document.getElementById('loginModal');

document.getElementById('adminLogin').addEventListener('click', e => {
    e.preventDefault();
    loginModal.classList.add('open');
    setTimeout(() => document.getElementById('adminUser').focus(), 200);
});
document.getElementById('modalClose').addEventListener('click', () => loginModal.classList.remove('open'));
loginModal.addEventListener('click', e => { if (e.target === loginModal) loginModal.classList.remove('open'); });

document.getElementById('adminForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const u   = document.getElementById('adminUser').value.trim();
    const p   = document.getElementById('adminPass').value;
    const err = document.getElementById('loginError');

    // NOTE: Change credentials in production — this is a client-side demo only
    if (u === 'admin' && p === 'admin123') {
        loginModal.classList.remove('open');
        openDashboard();
    } else {
        err.style.display = 'block';
        document.getElementById('adminPass').value = '';
        setTimeout(() => err.style.display = 'none', 3000);
    }
});

function openDashboard() {
    const dash = document.getElementById('adminDashboard');
    dash.style.display = 'block';
    document.body.style.overflow = 'hidden';

    // Populate stats from localStorage
    document.getElementById('dashDownloads').textContent = localStorage.getItem('downloads') || '0';
    document.getElementById('dashMessages').textContent  = localStorage.getItem('msgCount')  || '0';
    document.getElementById('dashVisits').textContent    = localStorage.getItem('visits')    || '0';

    // Load message log
    const messages = JSON.parse(localStorage.getItem('messages') || '[]');
    const logEl    = document.getElementById('messageLog');
    if (messages.length) {
        logEl.innerHTML = messages.map(m => `
            <div class="msg-entry">
                <div class="msg-meta">
                    <span>📅 ${m.date}</span>
                    <span>✉️ ${m.email}</span>
                </div>
                <div class="msg-name">${m.name}</div>
                <div class="msg-text">${m.message}</div>
            </div>
        `).join('');
    }
}

document.getElementById('logoutBtn').addEventListener('click', () => {
    document.getElementById('adminDashboard').style.display = 'none';
    document.body.style.overflow = '';
});

// ── 13. SMOOTH SCROLL ────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
        }
    });
});

// ── 14. TYPING EFFECT ────────────────────────────
const roles = [
    'Full-Stack Developer',
    'AI/ML Enthusiast',
    'Python Developer',
    'FastAPI Builder',
    'Open Source Contributor',
];
let rIdx = 0, cIdx = 0, deleting = false;

const typingEl = document.createElement('span');
typingEl.setAttribute('aria-live', 'polite');
typingEl.style.cssText = `
    display: block;
    font-size: 1rem;
    color: var(--accent);
    font-weight: 600;
    margin-top: -8px;
    margin-bottom: 18px;
    min-height: 24px;
    letter-spacing: 0.3px;
    font-family: 'JetBrains Mono', monospace;
`;

const heroH1 = document.querySelector('.hero-text h1');
if (heroH1) {
    heroH1.insertAdjacentElement('afterend', typingEl);

    function type() {
        const curr = roles[rIdx];
        typingEl.textContent = (deleting ? curr.substring(0, cIdx - 1) : curr.substring(0, cIdx + 1)) + '▋';
        deleting ? cIdx-- : cIdx++;
        let delay = deleting ? 45 : 85;
        if (!deleting && cIdx === curr.length) { delay = 2200; deleting = true; }
        else if (deleting && cIdx === 0) { deleting = false; rIdx = (rIdx + 1) % roles.length; delay = 350; }
        setTimeout(type, delay);
    }
    setTimeout(type, 1000);
}

// ── 15. CUSTOM CURSOR ────────────────────────────
if (window.matchMedia('(pointer: fine)').matches) {
    const dot = document.createElement('div');
    dot.className = 'cursor-dot';
    document.body.appendChild(dot);

    document.addEventListener('mousemove', e => {
        dot.style.left = e.clientX + 'px';
        dot.style.top  = e.clientY + 'px';
    });

    const hoverTargets = 'a, button, .project-card, .filter-btn, .tech-pill, .cert-card, .contact-item, .stat-box, .tl-card, .edu-card';
    document.querySelectorAll(hoverTargets).forEach(el => {
        el.addEventListener('mouseenter', () => dot.classList.add('hovered'));
        el.addEventListener('mouseleave', () => dot.classList.remove('hovered'));
    });
}

// ── 16. KEYBOARD ACCESSIBILITY ───────────────────
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        loginModal.classList.remove('open');
        document.getElementById('adminDashboard').style.display = 'none';
        document.body.style.overflow = '';
    }
});

// ── 17. PAGE LOAD FADE ───────────────────────────
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease';
window.addEventListener('load', () => { document.body.style.opacity = '1'; });
