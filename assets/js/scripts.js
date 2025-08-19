document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
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
                // Set to actual height for smooth expand beyond CSS cap
                content.style.maxHeight = content.scrollHeight + 'px';
            } else {
                content.style.maxHeight = null;
            }
        } else {
            content.classList.remove('show');
            content.style.maxHeight = null;
        }
    });
}
