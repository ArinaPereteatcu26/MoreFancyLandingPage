window.addEventListener('scroll', function() {
    var scrollPosition = window.scrollY;
    var hero = document.getElementById('hero');
    var about = document.getElementById('about');

    // Get the height of the sections
    var heroHeight = hero.offsetHeight;
    var aboutHeight = about.offsetHeight;

    // Adjust the background position based on scroll
    hero.style.backgroundPosition = 'center ' + (scrollPosition * 0.3) + 'px'; // Adjust multiplier for smooth parallax
    about.style.backgroundPosition = 'center ' + (scrollPosition * 0.2) + 'px'; // Smooth transition to About section

    // Add fade-in effect to About section when it scrolls into view
    if (scrollPosition > heroHeight - aboutHeight) {
        about.style.opacity = 1;
    } else {
        about.style.opacity = 0;
    }
});
