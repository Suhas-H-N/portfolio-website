# 👨‍💻 Suhas H N — Portfolio v2

A fully custom, professional portfolio website built from scratch with vanilla HTML, CSS, and JavaScript.

🌐 **Live:** https://Suhas-H-N.github.io/portfolio-website/

---

## ✨ What's New in v2

| Feature | v1 | v2 |
|---------|----|----|
| Sections | 6 | **9** |
| Experience / Timeline | ❌ | ✅ |
| Education section | ❌ | ✅ |
| Certifications | ❌ | ✅ |
| Quick info card (About) | ❌ | ✅ |
| Floating tech chips (Hero) | ❌ | ✅ |
| Back-to-top button | ❌ | ✅ |
| Tech pill cloud | ❌ | ✅ |
| Availability card | ❌ | ✅ |
| Admin message log | ❌ | ✅ |
| localStorage analytics | Basic | ✅ Visits + Downloads + Messages |
| Projects | 2 | **5** |
| Project filter tags | 3 | **4 (+ Full-Stack)** |
| Skills grid | 3 cols | **6 cols** |
| Footer nav links | ❌ | ✅ |
| GitHub: Top Languages | ❌ | ✅ |
| Contact form ID bug | 🐛 | ✅ Fixed |
| SEO meta tags | Basic | ✅ OG + Keywords |
| `rel="noopener"` on links | ❌ | ✅ |
| ARIA labels | Partial | ✅ |
| JetBrains Mono font | ❌ | ✅ (typing + code) |

---

## 🗂 File Structure

```
portfolio/
├── index.html        ← Main portfolio (single-page)
├── style.css         ← All styles (design system + all sections)
├── script.js         ← All interactivity
├── assets/
│   └── resume.pdf    ← Downloadable resume
└── images/
    └── profile.png   ← Profile photo
```

---

## 🚀 How to Use

1. **GitHub Pages (recommended)**
   - Push to a GitHub repo named `portfolio-website`
   - Go to Settings → Pages → Deploy from `main` branch
   - Your site will be live at `https://YOUR_USERNAME.github.io/portfolio-website/`

2. **Local development**
   - Open `index.html` directly in a browser, or use VS Code Live Server

---

## ⚙️ Customization

### EmailJS (Contact Form)
1. Create account at [emailjs.com](https://emailjs.com)
2. Add your Email Service and Template
3. Replace in `index.html`:
   ```js
   emailjs.init("YOUR_PUBLIC_KEY");
   ```
4. Replace in `script.js`:
   ```js
   emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this)
   ```

### Admin Credentials
In `script.js`, find:
```js
if (u === 'admin' && p === 'admin123') {
```
Change to your own credentials. ⚠️ This is client-side only — do not use sensitive passwords.

---

## 🛠 Tech Stack

- **HTML5** — Semantic markup, accessibility attributes
- **CSS3** — CSS variables, Grid, Flexbox, animations, dark/light theme
- **JavaScript (ES2020+)** — IntersectionObserver, localStorage, async/await
- **EmailJS** — Contact form email delivery
- **Font Awesome 6** — Icons
- **Google Fonts** — Syne, DM Sans, JetBrains Mono

---

## 👤 Author

**Suhas H N**
- GitHub: [github.com/Suhas-H-N](https://github.com/Suhas-H-N)
- LinkedIn: [linkedin.com/in/suhas-h-n-987a432a](https://www.linkedin.com/in/suhas-h-n-987a432a/)
- Email: suhassuhas3335@gmail.com
