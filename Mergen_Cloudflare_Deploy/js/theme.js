document.addEventListener('DOMContentLoaded', () => {
    // Check for saved theme
    const savedTheme = localStorage.getItem('mergen_theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        updateThemeToggles(true);
    } else {
        updateThemeToggles(false);
    }

    // Attach click handlers to theme buttons if they exist
    const themeBtns = document.querySelectorAll('.theme-btn');
    themeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.innerText.includes('Dark')) {
                enableDarkMode();
            } else {
                disableDarkMode();
            }
        });
    });
});

function enableDarkMode() {
    document.body.classList.add('dark-mode');
    localStorage.setItem('mergen_theme', 'dark');
    updateThemeToggles(true);
}

function disableDarkMode() {
    document.body.classList.remove('dark-mode');
    localStorage.setItem('mergen_theme', 'light');
    updateThemeToggles(false);
}

function updateThemeToggles(isDark) {
    const themeBtns = document.querySelectorAll('.theme-btn');
    themeBtns.forEach(btn => {
        // Reset
        btn.classList.remove('active');

        // Active logic
        if (isDark && btn.innerText.includes('Dark')) {
            btn.classList.add('active');
        } else if (!isDark && btn.innerText.includes('Light')) {
            btn.classList.add('active');
        }
    });

    // Also update any icons or images if needed (advanced)
}
