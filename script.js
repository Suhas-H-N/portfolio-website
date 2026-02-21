// 1. SCROLL PROGRESS
const scrollProgress = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
    const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    scrollProgress.style.width = pct + '%';
    document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 20);
    highlightNav();
});

// 2. ACTIVE NAV
function highlightNav() {
    let current = '';
    document.querySelectorAll('section[id]').forEach(sec => {
        if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
    });
    document.querySelectorAll('.nav-links a').forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
    });
}

// 3. MOBILE MENU
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
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

// 4. THEME TOGGLE
const themeToggle = document.getElementById('themeToggle');
let isDark = localStorage.getItem('theme') !== 'light';
if (!isDark) { document.body.classList.add('light'); themeToggle.innerHTML = '<i class="fas fa-sun"></i>'; }
themeToggle.addEventListener('click', () => {
    isDark = !isDark;
    document.body.classList.toggle('light', !isDark);
    themeToggle.innerHTML = isDark ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// 5. FADE IN ON SCROLL
const fadeObs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); fadeObs.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.fade-in').forEach(el => fadeObs.observe(el));

// 6. SKILL BARS
const skillObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.querySelectorAll('.bar-fill').forEach(b => setTimeout(() => b.style.width = b.dataset.width + '%', 100));
            skillObs.unobserve(e.target);
        }
    });
}, { threshold: 0.3 });
document.querySelectorAll('.skill-category').forEach(el => skillObs.observe(el));

// 7. COUNTER ANIMATION
function animateCounter(el) {
    const target = parseInt(el.dataset.target);
    let current = 0;
    const inc = target / (1600 / 16);
    const timer = setInterval(() => {
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
}, { threshold: 0.4 });
const aboutSection = document.querySelector('.about');
if (aboutSection) countObs.observe(aboutSection);

// 8. PROJECT FILTER
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        document.querySelectorAll('.project-card').forEach(card => {
            const show = filter === 'all' || card.dataset.category === filter;
            if (show) { card.style.display = ''; setTimeout(() => card.style.opacity = '1', 10); }
            else { card.style.opacity = '0'; setTimeout(() => card.style.display = 'none', 300); }
        });
    });
});

// 9. CONTACT FORM
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const formStatus = document.getElementById('formStatus');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        formStatus.textContent = '';
        formStatus.className = 'form-status';
        // Replace 'SERVICE_ID' and 'TEMPLATE_ID' with your EmailJS IDs
        emailjs.sendForm('SERVICE_ID', 'TEMPLATE_ID', this)
            .then(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';
                formStatus.textContent = '✅ Message sent! I\'ll get back to you soon.';
                formStatus.classList.add('success');
                contactForm.reset();
                setTimeout(() => { submitBtn.disabled = false; submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message'; }, 4000);
            })
            .catch(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
                formStatus.textContent = '❌ Failed to send. Try emailing directly.';
                formStatus.classList.add('error');
            });
    });
}

// 10. ADMIN MODAL
const loginModal = document.getElementById('loginModal');
document.getElementById('adminLogin').addEventListener('click', e => { e.preventDefault(); loginModal.classList.add('open'); });
document.getElementById('modalClose').addEventListener('click', () => loginModal.classList.remove('open'));
loginModal.addEventListener('click', e => { if (e.target === loginModal) loginModal.classList.remove('open'); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') loginModal.classList.remove('open'); });

document.getElementById('adminForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const u = document.getElementById('adminUser').value.trim();
    const p = document.getElementById('adminPass').value;
    const err = document.getElementById('loginError');
    // Change 'admin' and 'admin123' to your own credentials
    if (u === 'admin' && p === 'admin123') {
        loginModal.classList.remove('open');
        document.getElementById('adminDashboard').style.display = 'block';
        document.body.style.overflow = 'hidden';
    } else {
        err.style.display = 'block';
    }
});

document.getElementById('logoutBtn').addEventListener('click', () => {
    document.getElementById('adminDashboard').style.display = 'none';
    document.body.style.overflow = '';
});

// 11. SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) { e.preventDefault(); window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' }); }
    });
});

// 12. TYPING EFFECT
const roles = ['Full-Stack Developer', 'AI/ML Enthusiast', 'Python Developer', 'Open Source Contributor'];
let rIdx = 0, cIdx = 0, deleting = false;
const typingEl = document.createElement('span');
typingEl.style.cssText = 'display:block;font-size:1rem;color:var(--accent);font-weight:500;margin-top:-8px;margin-bottom:18px;min-height:24px;letter-spacing:0.5px;';
const heroH1 = document.querySelector('.hero-text h1');
if (heroH1) {
    heroH1.insertAdjacentElement('afterend', typingEl);
    function type() {
        const curr = roles[rIdx];
        typingEl.textContent = deleting ? curr.substring(0, cIdx - 1) : curr.substring(0, cIdx + 1);
        deleting ? cIdx-- : cIdx++;
        let delay = deleting ? 50 : 90;
        if (!deleting && cIdx === curr.length) { delay = 2000; deleting = true; }
        else if (deleting && cIdx === 0) { deleting = false; rIdx = (rIdx + 1) % roles.length; delay = 400; }
        setTimeout(type, delay);
    }
    setTimeout(type, 1000);
}

// 13. CUSTOM CURSOR
if (window.matchMedia('(pointer: fine)').matches) {
    const cursor = document.createElement('div');
    cursor.style.cssText = 'position:fixed;width:8px;height:8px;background:#6c63ff;border-radius:50%;pointer-events:none;z-index:99999;transition:transform 0.15s ease,opacity 0.2s ease;transform:translate(-50%,-50%);mix-blend-mode:difference;';
    document.body.appendChild(cursor);
    document.addEventListener('mousemove', e => { cursor.style.left = e.clientX + 'px'; cursor.style.top = e.clientY + 'px'; });
    document.querySelectorAll('a,button,.project-card,.filter-btn').forEach(el => {
        el.addEventListener('mouseenter', () => { cursor.style.transform = 'translate(-50%,-50%) scale(3)'; cursor.style.opacity = '0.5'; });
        el.addEventListener('mouseleave', () => { cursor.style.transform = 'translate(-50%,-50%) scale(1)'; cursor.style.opacity = '1'; });
    });
}

// 14. PAGE LOAD FADE
document.body.style.cssText += 'opacity:0;transition:opacity 0.5s ease;';
window.addEventListener('load', () => document.body.style.opacity = '1');