// 1. DATA STORAGE & RETRIEVAL (LocalStorage)
window.loadData = function(key, defaultValue) {
    const stored = localStorage.getItem(key);
    if (stored) {
        return JSON.parse(stored);
    }
    return defaultValue;
};

window.saveData = function(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
};

document.addEventListener("DOMContentLoaded", () => {
    // 2. HIGHLIGHT ACTIVE NAV LINK
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
});