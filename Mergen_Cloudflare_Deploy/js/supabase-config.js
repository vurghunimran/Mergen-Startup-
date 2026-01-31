// Mergen Supabase Connection Client

// --- CONFIGURATION ---
// REPLACE THESE WITH YOUR KEYS FROM SUPABASE DASHBOARD
const SUPABASE_URL = 'YOUR_SUPABASE_PROJECT_URL';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';

let supabase = null;
let isRealBackend = false;

if (typeof createClient !== 'undefined' && SUPABASE_URL.includes('https')) {
    supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    isRealBackend = true;
    console.log("Mergen: Supabase Client Initialized");
} else {
    console.warn("Mergen: Supabase SDK not loaded or keys missing. Falling back to mock data.");
}

/* --- AUTHENTICATION HELPERS --- */
const MergenAuth = {
    // Register
    signUp: async (email, password, metadata = {}) => {
        if (!isRealBackend) return mockAuthResponse(email, metadata);

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: { data: metadata } // Saves name, type, etc.
        });

        // Auto-create profile record if successful (Trigger usually does this, but we can double check)
        if (data.user && !error) {
            await MergenDB.createProfile(data.user.id, email, metadata);
        }

        return { user: data.user, error };
    },

    // Login
    signIn: async (email, password) => {
        if (!isRealBackend) return mockAuthResponse(email);

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });
        return { user: data.user, error };
    },

    // Logout
    signOut: async () => {
        if (isRealBackend) await supabase.auth.signOut();
        localStorage.removeItem('mergen_user');
        window.location.href = 'index.html';
    },

    // Get Current Session
    getCurrentUser: async () => {
        if (!isRealBackend) return JSON.parse(localStorage.getItem('mergen_user'));
        const { data: { user } } = await supabase.auth.getUser();
        return user;
    }
};

/* --- DATABASE HELPERS --- */
const MergenDB = {
    // PROFILE
    createProfile: async (id, email, meta) => {
        if (!isRealBackend) return;
        // Insert into 'profiles' table
        const { error } = await supabase.from('profiles').insert({
            id: id,
            email: email,
            full_name: meta.full_name || 'New User',
            user_type: meta.user_type || 'client',
            credits: 0,
            trust_score: 65
        });
        if (error) console.error("Profile creation failed:", error);
    },

    // SURVEYS
    createSurvey: async (surveyData) => {
        if (!isRealBackend) return { error: { message: "Backend not connected" } };

        const user = await MergenAuth.getCurrentUser();
        if (!user) return { error: { message: "Not logged in" } };

        const { data, error } = await supabase.from('surveys').insert({
            user_id: user.id,
            title: surveyData.title,
            description: surveyData.description,
            target_audience: surveyData.target,
            question_count: 5, // Default for now
            status: 'Active'
        }).select();

        return { data, error };
    },

    getUserSurveys: async () => {
        if (!isRealBackend) return { data: [], error: null };
        const user = await MergenAuth.getCurrentUser();
        if (!user) return { data: [], error: "No user" };

        const { data, error } = await supabase.from('surveys').select('*').eq('user_id', user.id);
        return { data, error };
    },

    getCommunitySurveys: async () => {
        if (!isRealBackend) return { data: [], error: null };
        // Get all active surveys
        const { data, error } = await supabase.from('surveys').select('*').eq('status', 'Active');
        return { data, error };
    }
};


// MOCK FALLBACK (Keeps site working for user if they don't add keys)
function mockAuthResponse(email, meta) {
    console.log("Mock Auth Success for", email);
    const mockUser = { id: 'mock-123', email, ...meta };
    localStorage.setItem('mergen_user', JSON.stringify(mockUser));
    return Promise.resolve({ user: mockUser, error: null });
}
