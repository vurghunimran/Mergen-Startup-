document.addEventListener('DOMContentLoaded', () => {
    // Auth Check
    const user = localStorage.getItem('mergen_user');
    if (!user && !window.location.href.includes('client-auth.html')) {
        // Optional: Redirect if strict auth needed
        // window.location.href = 'client-auth.html';
    }

    // ----------------------------------------------------
    // Notification Bell Logic
    // ----------------------------------------------------
    const bell = document.getElementById('notification-bell');
    const dropdown = document.getElementById('notification-dropdown');

    if (bell && dropdown) {
        bell.addEventListener('click', (e) => {
            e.stopPropagation();
            if (dropdown.style.display === 'none' || dropdown.style.display === '') {
                dropdown.style.display = 'block';
            } else {
                dropdown.style.display = 'none';
            }
        });

        // Close on outside click
        document.addEventListener('click', (e) => {
            if (!dropdown.contains(e.target) && !bell.contains(e.target)) {
                dropdown.style.display = 'none';
            }
        });

        // Prevent closing when clicking inside dropdown
        dropdown.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }

    // ----------------------------------------------------
    // Legacy Table Logic (Safe to keep if targeted elements exist)
    // ----------------------------------------------------
    const tbody = document.getElementById('surveys-body');
    if (tbody) {
        // ... (Old mock logic or dynamic if needed)
    }
});
