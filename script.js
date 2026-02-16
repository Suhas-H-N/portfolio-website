const toggle = document.getElementById("theme-toggle");

toggle.onclick = () => {
    document.body.classList.toggle("light");

    if (document.body.classList.contains("light")) {
        toggle.textContent = "☀️";
    } else {
        toggle.textContent = "🌙";
    }
};
