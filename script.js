// Theme toggle
const toggle = document.getElementById("theme-toggle");

if (toggle) {
    toggle.onclick = () => {
        document.body.classList.toggle("light");
        toggle.textContent = document.body.classList.contains("light") ? "☀️" : "🌙";
    };
}

// Scroll fade-in animation
const faders = document.querySelectorAll(".fade-in");

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, {
    threshold: 0.2
});

faders.forEach((el) => observer.observe(el));
// Mobile menu toggle
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

menuToggle.onclick = () => {
    navLinks.classList.toggle("show");
};
