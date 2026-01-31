function loadHeader() {
    // Simple check to see if we are in a "logged in" state (mock)
    const isLoggedIn = localStorage.getItem('mergen_user');

    let authSection = `
        <div class="auth-buttons">
            <a href="client-auth.html?mode=login" class="btn btn-ghost" style="color:#374151">Log In</a>
            <a href="client-auth.html?mode=signup" class="btn btn-primary btn-medium">Sign Up</a>
        </div>
    `;

    if (isLoggedIn) {
        authSection = `
        <div class="auth-buttons">
            <a href="client-dashboard.html" class="btn btn-ghost">Dashboard</a>
            <button onclick="logout()" class="btn btn-outline btn-medium">Log Out</button>
        </div>
        `;
    }

    const headerHTML = `
    <header class="header">
        <a href="index.html" class="logo">
            <img src="images/logo.svg" alt="Mergen Logo">
            <span style="color: #E05D3A;">MERGEN</span>
        </a>
        <nav class="nav-links">
            <a href="client-auth.html?mode=signup" class="nav-item">For Clients</a>
            <a href="community-auth.html?mode=signup" class="nav-item">For Community</a>
            <a href="index.html#how-it-works" class="nav-item">How It Works</a>
            <a href="#" class="nav-item" onclick="openPricingModal(); return false;">Pricing</a>
        </nav>
        ${authSection}
    </header>
    `;

    // Insert at start of body
    document.body.insertAdjacentHTML('afterbegin', headerHTML);
}

function loadFooter() {
    const footerHTML = `
    <footer class="footer">
        <div class="footer-top">
            <div class="footer-col">
                <a href="index.html" class="footer-logo">
                    <img src="images/logo.svg" alt="Mergen Logo">
                    MERGEN
                </a>
                <p class="footer-desc">Redefining human-data connection through ethical AI and community-centric research infrastructure.</p>
                <div style="margin-top: 1.5rem; display: flex; gap: 1rem; color: #9CA3AF;">
                    <!-- Simple Social SVGs -->
                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </div>
            </div>
            
            <div class="footer-col">
                <h4>SOLUTIONS</h4>
                <ul>
                    <li><a href="#">Consumer Insights</a></li>
                    <li><a href="#">Market Segmentation</a></li>
                    <li><a href="#">Brand Tracking</a></li>
                    <li><a href="#">API Access</a></li>
                </ul>
            </div>

            <div class="footer-col">
                <h4>PLATFORM</h4>
                <ul>
                    <li><a href="index.html#how-it-works">How It Works</a></li>
                    <li><a href="#">Success Stories</a></li>
                    <li><a href="#">Trust & Safety</a></li>
                    <li><a href="#">Community Rewards</a></li>
                </ul>
            </div>

            <div class="footer-col">
                <h4>NEWSLETTER</h4>
                <p style="color:#6B7280; font-size: 0.85rem; margin-bottom: 1rem;">Stay ahead with the latest market data wisdom.</p>
                <div class="newsletter-box">
                    <input type="email" placeholder="Email address" class="newsletter-input">
                    <button class="btn btn-primary" style="padding: 0.5rem; width: 40px; display: flex; align-items: center; justify-content: center;">→</button>
                </div>
            </div>
        </div>

        <div class="footer-bottom-row">
            <div>&copy; 2026 MERGEN GLOBAL. ALL RIGHTS RESERVED.</div>
            <div style="display: flex; gap: 2rem;">
                <a href="#">PRIVACY</a>
                <a href="#">TERMS</a>
                <a href="#">COOKIES</a>
            </div>
        </div>
    </footer>
    `;
    document.body.insertAdjacentHTML('beforeend', footerHTML);
}

function loadPricingModal() {
    const modalHTML = `
    <div id="pricing-modal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 2000; align-items: center; justify-content: center; backdrop-filter: blur(5px);">
        <div style="background: white; padding: 2.5rem; border-radius: 24px; width: 90%; max-width: 500px; position: relative; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);">
            <button onclick="closePricingModal()" style="position: absolute; top: 1.5rem; right: 1.5rem; font-size: 1.5rem; line-height: 1; color: #9CA3AF; cursor: pointer;">&times;</button>
            
            <div style="text-align: center; margin-bottom: 2rem;">
                <h2 style="font-size: 1.8rem; font-weight: 800; color: #111827; margin-bottom: 0.5rem;">Pricing Calculator</h2>
                <p style="color: #6B7280;">Estimate your campaign cost instantly.</p>
            </div>

            <div style="display: flex; flex-direction: column; gap: 1.5rem;">
                <!-- Client Type -->
                <div>
                    <label style="display: block; font-size: 0.85rem; font-weight: 700; color: #374151; margin-bottom: 0.5rem;">CLIENT TYPE</label>
                    <select id="calc-client-type" onchange="calculatePrice()" style="width: 100%; padding: 0.75rem 1rem; border: 1px solid #D1D5DB; border-radius: 12px; font-size: 1rem; outline: none; background: #F9FAFB;">
                        <option value="student">Students, Researchers, Universities</option>
                        <option value="startup">Startups</option>
                        <option value="sme">SMEs</option>
                        <option value="gov">Governmental Agencies, Int. Institutions</option>
                        <option value="corp">Companies, Cooperation</option>
                    </select>
                </div>

                <!-- Number of Respondents -->
                <div>
                    <label style="display: block; font-size: 0.85rem; font-weight: 700; color: #374151; margin-bottom: 0.5rem;">NUMBER OF RESPONDENTS</label>
                    <select id="calc-respondents" onchange="calculatePrice()" style="width: 100%; padding: 0.75rem 1rem; border: 1px solid #D1D5DB; border-radius: 12px; font-size: 1rem; outline: none; background: #F9FAFB;">
                        <option value="50">50 Respondents</option>
                        <option value="100">100 Respondents</option>
                        <option value="250">250 Respondents</option>
                        <option value="500">500 Respondents</option>
                        <option value="1000">1000 Respondents</option>
                    </select>
                </div>

                <!-- Result -->
                <div style="background: #FFF7ED; padding: 1.5rem; border-radius: 16px; text-align: center; margin-top: 0.5rem; border: 1px solid #FED7AA;">
                    <div style="font-size: 0.85rem; font-weight: 600; color: #EA580C; margin-bottom: 0.5rem;">ESTIMATED COST</div>
                    <div id="calc-result" style="font-size: 2.5rem; font-weight: 800; color: #111827;">$120</div>
                </div>

                 <a href="client-auth.html?mode=signup" class="btn btn-primary btn-full" style="justify-content: center; padding: 1rem;">Launch Campaign</a>
            </div>
        </div>
    </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

function openPricingModal() {
    const modal = document.getElementById('pricing-modal');
    if (modal) {
        modal.style.display = 'flex';
        calculatePrice(); // Init
    }
}

function closePricingModal() {
    const modal = document.getElementById('pricing-modal');
    if (modal) modal.style.display = 'none';
}

function calculatePrice() {
    const type = document.getElementById('calc-client-type').value;
    const count = parseInt(document.getElementById('calc-respondents').value);
    const resultEl = document.getElementById('calc-result');

    // Data Matrix
    const pricing = {
        'student': { 50: 120, 100: 200, 250: 400, 500: 600, 1000: 800 },
        'startup': { 50: 120, 100: 200, 250: 400, 500: 600, 1000: 800 },
        'sme': { 50: 200, 100: 300, 250: 500, 500: 800, 1000: 1300 },
        'gov': { 50: 250, 100: 400, 250: 600, 500: 900, 1000: 1500 },
        'corp': { 50: 250, 100: 400, 250: 600, 500: 900, 1000: 1500 }
    };

    let price = 0;
    if (pricing[type] && pricing[type][count]) {
        price = pricing[type][count];
    }

    resultEl.innerText = '$' + price;
}

function logout() {
    localStorage.removeItem('mergen_user');
    window.location.href = 'index.html';
}

// Auto-load on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
    // Only load if not already present
    if (!document.querySelector('.header')) loadHeader();
    if (!document.querySelector('.footer')) loadFooter();
    loadPricingModal();
});
