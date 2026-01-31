import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '../components/DashboardLayout';
import { Button } from '../components/Button';
import { Input, Select } from '../components/Input';
import { FaRocket, FaMagic } from 'react-icons/fa';
import '../styles/pages/CreateSurvey.css';

const CreateSurvey = () => {
    const [step, setStep] = useState(1);

    // Form State
    const [formData, setFormData] = useState({
        ageRange: [18, 65],
        financial: 'Upper Mid ($75k - $150k)',
        location: 'Global (All Countries)',
        interests: ['Tech', 'Finance'],
        numQuestions: 10,
        respondents: 500,
        aiPrompt: ''
    });

    const [questions, setQuestions] = useState([]);
    const [isGenerating, setIsGenerating] = useState(false);

    // Cost Calculation
    const [cost, setCost] = useState({
        base: 0,
        targeting: 0,
        discount: 0,
        total: 0
    });

    useEffect(() => {
        const baseRate = 0.20; // per Q per Respondent
        const targetRate = 0.05; // extra per target filter

        const qCost = formData.numQuestions * formData.respondents * baseRate;
        const tCost = formData.respondents * targetRate * 2; // Mock complexity

        setCost({
            base: qCost,
            targeting: tCost,
            discount: 0,
            total: qCost + tCost
        });
    }, [formData]);

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleGenerate = () => {
        setIsGenerating(true);
        setStep(2); // Move to Generate step

        // Mock AI Generation delay
        setTimeout(() => {
            const mockQuestions = [
                { id: 1, text: "How often do you use digital banking apps?", type: "Multiple Choice" },
                { id: 2, text: "What features are missing from your current bank?", type: "Open Ended" },
                { id: 3, text: "Rank these factors by importance: Security, Speed, UI Design.", type: "Ranking" },
                { id: 4, text: "Have you considered switching to a neobank in the last 6 months?", type: "Yes/No" },
                { id: 5, text: "What is your primary motivation for saving money?", type: "Multiple Choice" },
            ];
            setQuestions(mockQuestions);
            setIsGenerating(false);
            setStep(3); // Move to Review
        }, 2000);
    };

    const handleLaunch = () => {
        setStep(4); // Launch
    };

    return (
        <DashboardLayout>
            <div className="create-survey-header">
                <h1>Create New Survey</h1>
                <p>Configure your target audience and survey parameters.</p>
            </div>

            {step === 1 && (
                <div className="create-survey-grid">
                    {/* Left Column: Form */}
                    <div className="survey-form-col">

                        {/* Target Audience */}
                        <div className="form-section">
                            <div className="section-header-row">
                                <div className="section-icon icon-users"></div>
                                <h3>Target Audience</h3>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Age Range</label>
                                    <div className="range-display">{formData.ageRange[0]} - {formData.ageRange[1]}+</div>
                                    <input
                                        type="range"
                                        min="18" max="80"
                                        value={formData.ageRange[1]}
                                        onChange={(e) => handleInputChange('ageRange', [18, parseInt(e.target.value)])}
                                        className="custom-range"
                                    />
                                    <div className="range-labels">
                                        <span>18</span><span>25</span><span>35</span><span>45</span><span>55</span><span>65+</span>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <Select
                                        label="Financial Situation"
                                        value={formData.financial}
                                        onChange={(e) => handleInputChange('financial', e.target.value)}
                                        options={[
                                            { value: 'low', label: 'Average ($25k - $50k)' },
                                            { value: 'mid', label: 'Upper Mid ($75k - $150k)' },
                                            { value: 'high', label: 'High Net Worth ($150k+)' }
                                        ]}
                                        fullWidth
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <Select
                                    label="Location"
                                    value={formData.location}
                                    onChange={(e) => handleInputChange('location', e.target.value)}
                                    options={[
                                        { value: 'global', label: 'Global (All Countries)' },
                                        { value: 'us', label: 'United States' },
                                        { value: 'eu', label: 'Europe' }
                                    ]}
                                    fullWidth
                                />
                                <div className="form-group">
                                    <label>Interests</label>
                                    <div className="tags-input">
                                        {formData.interests.map(tag => (
                                            <span key={tag} className="tag">{tag}</span>
                                        ))}
                                        <span className="add-tag">+</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Survey Scope */}
                        <div className="form-section">
                            <div className="section-header-row">
                                <div className="section-icon icon-settings"></div>
                                <h3>Survey Scope</h3>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Number of Questions</label>
                                    <div className="counter-input">
                                        <button onClick={() => handleInputChange('numQuestions', Math.max(1, formData.numQuestions - 1))}>-</button>
                                        <span>{formData.numQuestions}</span>
                                        <button onClick={() => handleInputChange('numQuestions', formData.numQuestions + 1)}>+</button>
                                    </div>
                                </div>
                                <div className="form-group" style={{ flex: 2 }}>
                                    <label>Required Respondents <span className="highlight-text">{formData.respondents}</span></label>
                                    <input
                                        type="range"
                                        min="50" max="5000" step="50"
                                        value={formData.respondents}
                                        onChange={(e) => handleInputChange('respondents', parseInt(e.target.value))}
                                        className="custom-range"
                                    />
                                    <div className="range-labels">
                                        <span>50</span><span>5,000</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* AI Assistant */}
                        <div className="form-section">
                            <div className="section-header-row">
                                <div className="section-icon icon-ai"><FaMagic /></div>
                                <h3>AI Assistant</h3>
                            </div>
                            <p className="ai-desc">Describe your survey goal and our AI will draft scientifically validated questions for you.</p>
                            <textarea
                                className="ai-textarea"
                                placeholder="Example: I want to understand why Gen Z users are switching from traditional banking apps to neobanks in the European market..."
                                value={formData.aiPrompt}
                                onChange={(e) => handleInputChange('aiPrompt', e.target.value)}
                            ></textarea>
                        </div>

                    </div>

                    {/* Right Column: Summary */}
                    <div className="summary-col">
                        <div className="summary-card">
                            <div className="summary-header">
                                <h3>Summary & Estimate</h3>
                                <span>REAL-TIME COST CALCULATION</span>
                            </div>

                            <div className="audience-match">
                                <div className="match-icon">👥</div>
                                <div>
                                    <strong>Audience Match</strong>
                                    <p>~14,000 users match this profile</p>
                                </div>
                            </div>

                            <div className="cost-breakdown">
                                <div className="cost-row">
                                    <span>Base Cost ({formData.numQuestions} Questions)</span>
                                    <span>${(cost.base / formData.respondents).toFixed(2)} / resp.</span>
                                </div>
                                <div className="cost-row">
                                    <span>Targeting Fee</span>
                                    <span>${(cost.targeting / formData.respondents).toFixed(2)} / resp.</span>
                                </div>
                                <div className="cost-row discount">
                                    <span>Volume Discount</span>
                                    <span>-$0.00</span>
                                </div>
                            </div>

                            <div className="total-cost">
                                <span>TOTAL ESTIMATE</span>
                                <div className="price-tag">
                                    ${cost.total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    <small>INCLUDING TAXES & FEES</small>
                                </div>
                            </div>

                            <Button
                                variant="primary"
                                size="large"
                                fullWidth
                                icon={<FaRocket />}
                                onClick={handleGenerate}
                            >
                                Generate Questions
                            </Button>
                        </div>

                        <div className="pro-tip-card">
                            <div className="bulb-icon">💡</div>
                            <div>
                                <strong>Pro Tip</strong>
                                <p>Narrowing your audience too much might increase the cost per respondent. Try removing "Homeowners" to save approx 15%.</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {step === 2 && (
                <div className="loading-state" style={{ textAlign: 'center', padding: '4rem' }}>
                    <h2 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}><FaMagic className="spin-icon" /> AI is crafting your survey...</h2>
                    <p>Analyzing audience demographics and optimal question patterns.</p>
                </div>
            )}

            {step === 3 && (
                <div className="review-section" style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                        <h2>Review Questions</h2>
                        <Button variant="outline" size="small" onClick={() => setStep(1)}>Back to Edit</Button>
                    </div>

                    {questions.map((q, index) => (
                        <div key={q.id} className="question-card" style={{ background: 'white', padding: '1.5rem', marginBottom: '1rem', borderRadius: '8px', border: '1px solid #E5E7EB' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                <span style={{ fontWeight: 700, color: '#9CA3AF' }}>Q{index + 1}</span>
                                <span style={{ fontSize: '0.8rem', background: '#F3F4F6', padding: '2px 8px', borderRadius: '4px' }}>{q.type}</span>
                            </div>
                            <input
                                value={q.text}
                                onChange={(e) => {
                                    const newQ = [...questions];
                                    newQ[index].text = e.target.value;
                                    setQuestions(newQ);
                                }}
                                style={{ width: '100%', padding: '0.5rem', border: '1px solid #E5E7EB', borderRadius: '4px', fontSize: '1rem' }}
                            />
                        </div>
                    ))}

                    <div style={{ marginTop: '2rem', textAlign: 'right' }}>
                        <Button variant="primary" size="large" onClick={handleLaunch}>
                            Launch Survey & Pay
                        </Button>
                    </div>
                </div>
            )}

            {step === 4 && (
                <div className="success-state" style={{ textAlign: 'center', padding: '4rem', background: 'white', borderRadius: '16px', maxWidth: '600px', margin: '0 auto' }}>
                    <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉</div>
                    <h2>Survey Launched Successfully!</h2>
                    <p style={{ color: '#6B7280', marginBottom: '2rem' }}>Your survey has been sent to the matching audience. You will start receiving results shortly.</p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                        <Button variant="primary" onClick={() => window.location.href = '/client/dashboard'}>
                            Return to Dashboard
                        </Button>
                    </div>
                </div>
            )}

            {/* Stepper */}
            <div className="stepper-container">
                <div className={`step ${step >= 1 ? 'active' : ''}`}>
                    <div className="step-circle">1</div>
                    <span>DEFINE</span>
                </div>
                <div className="step-line"></div>
                <div className={`step ${step >= 2 ? 'active' : ''}`}>
                    <div className="step-circle">2</div>
                    <span>GENERATE</span>
                </div>
                <div className="step-line"></div>
                <div className={`step ${step >= 3 ? 'active' : ''}`}>
                    <div className="step-circle">3</div>
                    <span>REVIEW</span>
                </div>
                <div className="step-line"></div>
                <div className={`step ${step >= 4 ? 'active' : ''}`}>
                    <div className="step-circle">4</div>
                    <span>LAUNCH</span>
                </div>
            </div>

        </DashboardLayout>
    );
};

export default CreateSurvey;
