document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Dropdown for project cards: click anywhere on card to expand/collapse
function toggleDropdown(card) {
    // Find dropdown-content inside the card
    const content = card.querySelector('.dropdown-content');
    if (content) {
        content.classList.toggle('hidden');
    }
}
