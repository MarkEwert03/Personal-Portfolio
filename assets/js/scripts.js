document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Theme toggle functionality
const themeToggle = document.getElementById('theme-toggle');
const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');

// Check if user has a stored theme preference or default to dark mode
function getStoredTheme() {
    return localStorage.getItem('theme') || 'dark';
}

// Set theme based on preference
function setTheme(theme) {
    if (theme === 'dark') {
        document.documentElement.classList.add('dark');
        themeToggleLightIcon.classList.remove('hidden');
        themeToggleDarkIcon.classList.add('hidden');
    } else {
        document.documentElement.classList.remove('dark');
        themeToggleLightIcon.classList.add('hidden');
        themeToggleDarkIcon.classList.remove('hidden');
    }
    localStorage.setItem('theme', theme);
}

// Initialize theme on page load
document.addEventListener('DOMContentLoaded', function() {
    setTheme(getStoredTheme());
});

// Theme toggle event listener
themeToggle.addEventListener('click', function() {
    const currentTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
});

// Dropdown for project cards: only expand clicked card, collapse others, and animate height
function toggleDropdown(event, el) {
    event.stopPropagation();
    const currentCard = el.closest('.project-card');
    document.querySelectorAll('.project-card').forEach((card) => {
        const content = card.querySelector('.dropdown-content');
        if (!content) return;
        if (card === currentCard) {
            const isOpen = content.classList.toggle('show');
            if (isOpen) {
                // Set to actual height for smooth expand
                content.style.maxHeight = content.scrollHeight + 'px';
                // After transition, allow natural height (auto) to accommodate dynamic content
                const onTransitionEnd = (e) => {
                    if (e.propertyName === 'max-height') {
                        content.style.maxHeight = 'none';
                        content.removeEventListener('transitionend', onTransitionEnd);
                    }
                };
                content.addEventListener('transitionend', onTransitionEnd);
            } else {
                content.style.maxHeight = null;
            }
        } else {
            content.classList.remove('show');
            content.style.maxHeight = null;
        }
    });
}
