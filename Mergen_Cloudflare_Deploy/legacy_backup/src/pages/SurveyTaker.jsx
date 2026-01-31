import React, { useState } from 'react';
import { DashboardLayout } from '../components/DashboardLayout';
import { Button } from '../components/Button';
import { FaCheckCircle } from 'react-icons/fa';

const SurveyTaker = () => {
    const [currentQ, setCurrentQ] = useState(0);
    const [isFinished, setIsFinished] = useState(false);

    const questions = [
        { text: "How often do you shop online?", options: ["Daily", "Weekly", "Monthly", "Rarely"] },
        { text: "What is your preferred payment method?", options: ["Credit Card", "PayPal", "Apple Pay", "Crypto"] },
        { text: "Do you use price comparison tools?", options: ["Yes, always", "Sometimes", "Never"] }
    ];

    const handleAnswer = () => {
        if (currentQ < questions.length - 1) {
            setCurrentQ(currentQ + 1);
        } else {
            setIsFinished(true);
        }
    };

    return (
        <DashboardLayout>
            <div style={{ maxWidth: '600px', margin: '0 auto', background: 'white', padding: '3rem', borderRadius: '16px', boxShadow: 'var(--shadow-sm)' }}>
                {!isFinished ? (
                    <>
                        <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', color: '#9CA3AF', fontSize: '0.9rem' }}>
                            <span>Question {currentQ + 1} of {questions.length}</span>
                            <span>Shopping Habits 2024</span>
                        </div>

                        <h2 style={{ marginBottom: '2rem', fontSize: '1.5rem' }}>{questions[currentQ].text}</h2>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {questions[currentQ].options.map((opt, i) => (
                                <button
                                    key={i}
                                    onClick={handleAnswer}
                                    style={{
                                        padding: '1rem', border: '1px solid #E5E7EB', borderRadius: '8px',
                                        background: 'white', textAlign: 'left', cursor: 'pointer', transition: 'all 0.2s',
                                        fontSize: '1rem', color: '#374151'
                                    }}
                                    onMouseOver={(e) => { e.target.style.borderColor = 'var(--color-primary)'; e.target.style.background = '#FFF7ED'; }}
                                    onMouseOut={(e) => { e.target.style.borderColor = '#E5E7EB'; e.target.style.background = 'white'; }}
                                >
                                    {opt}
                                </button>
                            ))}
                        </div>
                    </>
                ) : (
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '3rem', color: '#10B981', marginBottom: '1rem' }}><FaCheckCircle /></div>
                        <h2>Survey Completed!</h2>
                        <p style={{ color: '#6B7280', margin: '1rem 0 2rem' }}>
                            Thank you for your valuable feedback. <br />
                            <strong>$2.50</strong> has been added to your balance.
                            <br />
                            <span style={{ fontSize: '0.8rem', color: '#8B5CF6' }}>Trust Score +2</span>
                        </p>
                        <Button variant="primary" onClick={() => window.location.href = '/community/dashboard'}>
                            Back to Dashboard
                        </Button>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};

export default SurveyTaker;
