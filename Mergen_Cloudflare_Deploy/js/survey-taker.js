document.addEventListener('DOMContentLoaded', () => {
    initSurvey();
});

let currentSurvey = null;
let currentQuestionIndex = 0;
let responses = {};

function initSurvey() {
    // 1. Get ID
    const params = new URLSearchParams(window.location.search);
    const surveyId = params.get('id');

    if (!surveyId) {
        alert("Survey not found.");
        window.location.href = 'community-dashboard.html';
        return;
    }

    // 2. Load Data
    const surveys = JSON.parse(localStorage.getItem('mergen_surveys') || '[]');
    currentSurvey = surveys.find(s => s.id === surveyId);

    if (!currentSurvey) {
        // Fallback or Error
        console.error("Survey ID not found in local storage.");
        alert("Survey not found.");
        window.location.href = 'community-dashboard.html';
        return;
    }

    // 2b. Fallback Mock Questions if survey was created before we fixed persistence
    if (!currentSurvey.questions || currentSurvey.questions.length === 0) {
        currentSurvey.questions = [
            { text: "How likely are you to recommend " + currentSurvey.title + "?", type: "NPS" },
            { text: "What do you value most in this product?", type: "Choice" },
            { text: "Any other feedback?", type: "Text" }
        ];
    }

    // 3. UI Init
    document.getElementById('q-total').innerText = currentSurvey.questions.length;
    document.getElementById('survey-loading').style.display = 'none';
    document.getElementById('question-container').style.display = 'block';

    renderQuestion();

    // Bind Nav
    document.getElementById('btn-next').addEventListener('click', handleNext);
    document.getElementById('btn-prev').addEventListener('click', handlePrev);
}

function renderQuestion() {
    const q = currentSurvey.questions[currentQuestionIndex];
    const container = document.getElementById('options-area');

    // Update Text
    document.getElementById('q-current').innerText = currentQuestionIndex + 1;
    document.getElementById('q-text').innerText = q.text;
    document.getElementById('q-category').innerText = guessCategory(q.type);

    // Update Progress
    const pct = ((currentQuestionIndex) / currentSurvey.questions.length) * 100;
    document.getElementById('progress-fill').style.width = `${pct}%`;

    // Render Inputs
    container.innerHTML = '';

    if (isScale(q.type)) {
        renderScale(container, q);
    } else if (isChoice(q.type)) {
        renderChoice(container, q);
    } else {
        renderText(container, q);
    }

    // Restore answer if exists
    const existing = responses[currentQuestionIndex];
    if (existing) {
        // Simple restore logic could be added here, currently skipping for MVP speed
        // If needed, we'd select the right element
    }

    updateButtons();
}

function guessCategory(type) {
    if (typeof type !== 'string') return 'QUESTION';
    if (type.includes('NPS') || type.includes('Scale')) return 'RATING';
    if (type.includes('Choice')) return 'PREFERENCE';
    return 'FEEDBACK';
}

function isScale(type) { return type && (type.includes('NPS') || type.includes('Scale')); }
function isChoice(type) { return type && (type.includes('Choice') || type.includes('Select')); }

/* -- Renderers -- */

function renderScale(container, q) {
    const wrapper = document.createElement('div');
    wrapper.className = 'scale-options';

    // 1-5 Scale
    for (let i = 1; i <= 5; i++) {
        const btn = document.createElement('div');
        btn.className = 'scale-btn';
        btn.innerText = i;
        btn.onclick = () => selectScale(i, btn);
        wrapper.appendChild(btn);
    }

    const labels = document.createElement('div');
    labels.style.display = 'flex';
    labels.style.justifyContent = 'space-between';
    labels.style.marginTop = '0.5rem';
    labels.style.color = '#9CA3AF';
    labels.style.fontSize = '0.8rem';
    labels.innerHTML = '<span>Not Likely</span><span>Very Likely</span>';

    container.appendChild(wrapper);
    container.appendChild(labels);
}

function selectScale(val, btn) {
    // Clear styles
    document.querySelectorAll('.scale-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    responses[currentQuestionIndex] = val;
}

function renderChoice(container, q) {
    // Mock Options if not provided in structure
    const opts = q.options || ["Quality", "Price", "Brand Reputation", "Convenience"];

    opts.forEach(opt => {
        const row = document.createElement('div');
        row.className = 'option-card';
        row.innerHTML = `<div class="radio-circle"></div> <span>${opt}</span>`;
        row.onclick = () => {
            selectChoice(opt, row);
        };
        container.appendChild(row);
    });
}

function selectChoice(val, row) {
    document.querySelectorAll('.option-card').forEach(r => r.classList.remove('selected'));
    row.classList.add('selected');
    responses[currentQuestionIndex] = val;
}

function renderText(container, q) {
    const area = document.createElement('textarea');
    area.className = 'text-answer-input';
    area.placeholder = "Type your answer here...";
    area.oninput = (e) => {
        responses[currentQuestionIndex] = e.target.value;
    };
    container.appendChild(area);
}

/* -- Handling -- */

function handleNext() {
    // Validate
    if (!responses[currentQuestionIndex]) {
        // Optional: Block progress? For demo, we allow skipping or prompt
        // alert("Please answer first.");
        // return;
    }

    if (currentQuestionIndex < currentSurvey.questions.length - 1) {
        currentQuestionIndex++;
        renderQuestion();
    } else {
        submitSurvey();
    }
}

function handlePrev() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        renderQuestion();
    }
}

function updateButtons() {
    document.getElementById('btn-prev').disabled = (currentQuestionIndex === 0);
    const isLast = (currentQuestionIndex === currentSurvey.questions.length - 1);
    document.getElementById('btn-next').innerText = isLast ? 'Finish Survey' : 'Next →';
}

function submitSurvey() {
    document.getElementById('question-container').style.display = 'none';
    document.getElementById('completion-screen').style.display = 'block';
    document.getElementById('progress-fill').style.width = '100%';

    // Save Response Mock
    // In a real app, we'd push this response to the survey's 'responses' array in localStorage
    saveResponseToSurvey();
}

function saveResponseToSurvey() {
    const surveys = JSON.parse(localStorage.getItem('mergen_surveys') || '[]');
    const idx = surveys.findIndex(s => s.id === currentSurvey.id);
    if (idx !== -1) {
        // Initialize responses array if missing
        if (!surveys[idx].responsesList) surveys[idx].responsesList = [];

        surveys[idx].responsesList.push({
            user: 'Community Member',
            date: new Date().toISOString(),
            answers: responses
        });

        // Update stats
        surveys[idx].responsesCount = (surveys[idx].responsesCount || 0) + 1; // Explicit count

        localStorage.setItem('mergen_surveys', JSON.stringify(surveys));
    }
}

function exitSurvey() {
    window.location.href = 'community-dashboard.html';
}
