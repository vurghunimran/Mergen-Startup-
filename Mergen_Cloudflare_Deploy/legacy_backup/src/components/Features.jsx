import React from 'react';
import '../styles/components/Features.css';
import { Button } from './Button';
import { FaChartLine, FaUsers, FaCoins, FaShieldAlt } from 'react-icons/fa';

export const Features = () => {
    return (
        <section className="features-section">
            <div className="container features__container">
                {/* For Clients */}
                <div className="feature-block client-block">
                    <div className="feature-icon icon-client">
                        <FaChartLine />
                    </div>
                    <div className="feature-content">
                        <h2>For Clients</h2>
                        <p>Gain unprecedented access to consumer minds with tools built for scale.</p>

                        <ul className="feature-list">
                            <li><span className="check-icon">✓</span> Precision demographic targeting engine</li>
                            <li><span className="check-icon">✓</span> Zero-delay AI question generation</li>
                            <li><span className="check-icon">✓</span> Interactive dashboard with deep-dive tools</li>
                        </ul>

                        <div className="feature-cta">
                            <Button variant="outline" size="medium">Register as Client</Button>
                        </div>
                    </div>
                </div>

                {/* For Community */}
                <div className="feature-block community-block">
                    <div className="feature-icon icon-community">
                        <FaUsers />
                    </div>
                    <div className="feature-content">
                        <h2>For Community</h2>
                        <p>Turn your unique perspective into rewards and impact global brands.</p>

                        <ul className="feature-list">
                            <li><span className="check-icon">✓</span> Instant payouts for quality feedback</li>
                            <li><span className="check-icon">✓</span> Merit-based trust score system</li>
                            <li><span className="check-icon">✓</span> Mobile-first survey experience</li>
                        </ul>

                        <div className="feature-cta">
                            <Button variant="outline" size="medium" className="btn-community">Join the Community</Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Process Section (How it works) */}
            <div className="container process-section">
                <div className="section-header">
                    <span className="subtitle">THE PROCESS</span>
                    <h3>How Mergen Works</h3>
                    <p>A seamless pipeline from initial query to actionable data visualization.</p>
                </div>

                <div className="process-steps">
                    <div className="step-card">
                        <div className="step-number">1</div>
                        <h4>Define Prompt</h4>
                        <p>Describe your research goal in simple natural language.</p>
                    </div>
                    <div className="step-card">
                        <div className="step-number">2</div>
                        <h4>AI Generation</h4>
                        <p>Our neural engine drafts high-conversion survey flows.</p>
                    </div>
                    <div className="step-card">
                        <div className="step-number">3</div>
                        <h4>Target Match</h4>
                        <p>Surveys are distributed to verified community segments.</p>
                    </div>
                    <div className="step-card">
                        <div className="step-number">4</div>
                        <h4>Real-time Analysis</h4>
                        <p>Get instant visualizations and AI-summarized insights.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};
