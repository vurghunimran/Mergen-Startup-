document.addEventListener('DOMContentLoaded', () => {
    // Parse URL params
    const params = new URLSearchParams(window.location.search);
    const mode = params.get('mode') || 'login';

    // Initial setup
    switchTab(mode);

    // Form Subject
    const form = document.getElementById('auth-form');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const isLogin = mode === 'login';
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // Visual feedback
            const btn = document.getElementById('submit-btn');
            const originalText = btn.innerText;
            btn.innerText = 'Verifying...';
            btn.style.opacity = '0.7';

            // --- SAFETY FALLBACK ---
            if (typeof MergenAuth === 'undefined') {
                console.warn("MergenAuth not loaded. Using offline fallback.");
                setTimeout(() => {
                    localStorage.setItem('mergen_user', JSON.stringify({
                        email: email,
                        type: 'client', // Default
                        name: 'Offline User'
                    }));
                    window.location.href = 'client-dashboard.html';
                }, 1000);
                return;
            }

            let result;
            try {
                if (isLogin) {
                    // LOGIN
                    result = await MergenAuth.signIn(email, password);
                } else {
                    // SIGN UP
                    // SIGN UP
                    // Determine user type and name
                    let userType = 'client';

                    const clientSelect = document.getElementById('client-type-select');
                    if (clientSelect) {
                        userType = clientSelect.value; // e.g., 'startup', 'sme', 'enterprise'
                    } else if (window.location.pathname.includes('community')) {
                        userType = 'community';
                    }

                    const name = document.getElementById('company-name') ? document.getElementById('company-name').value : 'New Member';

                    // Metadata payload
                    const metadata = {
                        user_type: userType,
                        full_name: name
                    };

                    result = await MergenAuth.signUp(email, password, metadata);
                }

                // Handle Result
                if (result.error) {
                    alert("Error: " + result.error.message);
                    btn.innerText = originalText;
                    btn.style.opacity = '1';
                } else {
                    // Success
                    // Save session locally for UI helpers if mostly relying on Supabase session not being synced yet?
                    // MergenAuth handles session persistence automatically via Supabase client, but our UI reads localStorage 'mergen_user' in some places.
                    // We should sync them if using real backend.
                    // Success
                    // Always save session locally for UI consistency (both Mock and Real)
                    if (result.user) {
                        const meta = result.user.user_metadata || result.user; // Handle Supabase vs Mock structure
                        const uType = meta.user_type || meta.type || 'client';
                        const uName = meta.full_name || meta.name || 'User';

                        localStorage.setItem('mergen_user', JSON.stringify({
                            email: result.user.email,
                            type: uType,
                            name: uName
                        }));
                    }

                    // Redirect based on type
                    const user = result.user;
                    const type = user?.user_metadata?.user_type || 'client';

                    setTimeout(() => {
                        if (type === 'community') window.location.href = 'community-dashboard.html';
                        else window.location.href = 'client-dashboard.html';
                    }, 500);
                }
            } catch (err) {
                console.error("Auth Error:", err);
                alert("Authentication failed. Please check console.");
                btn.innerText = originalText;
                btn.style.opacity = '1';
            }
        });
    }
});

function switchTab(mode) {
    const isLogin = mode === 'login';

    // Header Text
    const headerTitle = document.getElementById('auth-header-title');
    const headerDesc = document.getElementById('auth-header-desc');
    const submitBtn = document.getElementById('submit-btn');

    if (isLogin) {
        headerTitle.innerText = "Welcome back";
        headerDesc.innerText = "Please enter your details.";
        submitBtn.innerText = "Log In";

        // Hide Signup Fields
        document.querySelectorAll('.signup-only').forEach(el => el.style.display = 'none');

        // Update Tabs
        document.getElementById('tab-login').classList.add('active');
        document.getElementById('tab-signup').classList.remove('active');
    } else {
        headerTitle.innerText = "Create client account";
        headerDesc.innerText = "Start gathering data-driven insights in minutes.";
        submitBtn.innerText = "Continue to Audience Setup →";

        // Show Signup Fields
        document.querySelectorAll('.signup-only').forEach(el => el.style.display = 'grid');
        // Note: We use 'grid' or 'flex' depending on container, but for rows with multiple inputs we often used flex/grid in HTML.
        // Let's check specifics. .form-grid is grid. .dark-input-group is block.
        // To be safe, we can reset display property or set to null so CSS takes over.
        document.querySelectorAll('.signup-only').forEach(el => {
            // Check if it's a grid container or regular div
            if (el.classList.contains('form-grid')) {
                el.style.display = 'grid';
            } else {
                el.style.display = 'block';
            }
        });

        // Update Tabs
        document.getElementById('tab-login').classList.remove('active');
        document.getElementById('tab-signup').classList.add('active');
    }
}

function selectType(element) {
    // Remove selected from all siblings
    const parent = element.parentElement;
    Array.from(parent.children).forEach(child => child.classList.remove('selected'));

    // Add selected to clicked
    element.classList.add('selected');
}
