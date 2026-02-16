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
