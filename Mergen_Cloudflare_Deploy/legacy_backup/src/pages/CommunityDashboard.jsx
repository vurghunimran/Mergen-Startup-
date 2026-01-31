import React from 'react';
import { Link } from 'react-router-dom';
import { DashboardLayout } from '../components/DashboardLayout';
import { Button } from '../components/Button';
import { FaWallet, FaStar, FaCheckCircle, FaClipboardList, FaArrowRight } from 'react-icons/fa';
import '../styles/pages/Dashboard.css'; // Reuse dashboard styles

const CommunityDashboard = () => {
    const surveys = [
        { id: 101, title: 'Shopping Habits 2024', reward: '$2.50', duration: '5 min', match: '98%' },
        { id: 102, title: 'EV Car Ownership', reward: '$5.00', duration: '10 min', match: '95%' },
        { id: 103, title: 'Streaming Services', reward: '$1.75', duration: '3 min', match: '90%' },
    ];

    return (
        <DashboardLayout>
            <div className="dashboard-header">
                <div>
                    <h1>Community Dashboard</h1>
                    <p>Answer questions, earn rewards, and build your trust score.</p>
                </div>
            </div>

            <div className="stats-grid">
                <div className="stat-card">
                    <h3>Current Balance</h3>
                    <div className="stat-value" style={{ color: '#10B981' }}>$42.50</div>
                </div>
                <div className="stat-card">
                    <h3>Trust Score</h3>
                    <div className="stat-value" style={{ color: '#8B5CF6' }}>94/100</div>
                </div>
                <div className="stat-card">
                    <h3>Surveys Completed</h3>
                    <div className="stat-value">28</div>
                </div>
            </div>

            <div className="surveys-section">
                <div className="section-title-row">
                    <h2>Available Surveys</h2>
                </div>

                <div className="surveys-table-container">
                    <table className="surveys-table">
                        <thead>
                            <tr>
                                <th>Survey Name</th>
                                <th>Reward</th>
                                <th>Est. Duration</th>
                                <th>Match Score</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {surveys.map((survey) => (
                                <tr key={survey.id}>
                                    <td className="survey-title-cell">
                                        <div className="icon-wrapper"><FaClipboardList /></div>
                                        {survey.title}
                                    </td>
                                    <td style={{ fontWeight: 700, color: '#10B981' }}>{survey.reward}</td>
                                    <td>{survey.duration}</td>
                                    <td>
                                        <span style={{
                                            background: '#ECFDF5', color: '#059669',
                                            padding: '2px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 600
                                        }}>
                                            {survey.match}
                                        </span>
                                    </td>
                                    <td>
                                        <Link to={`/community/survey/${survey.id}`}>
                                            <Button variant="primary" size="small" icon={<FaArrowRight />}>Start</Button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default CommunityDashboard;
