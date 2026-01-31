import React from 'react';
import { Link } from 'react-router-dom';
import { DashboardLayout } from '../components/DashboardLayout';
import { Button } from '../components/Button';
import { FaPlus, FaSearch, FaChartBar, FaFileAlt } from 'react-icons/fa';
import '../styles/pages/Dashboard.css';

const ClientDashboard = () => {
    // Mock data for surveys
    const surveys = [
        { id: 1, title: 'Gen Z Beverage Preferences', status: 'Completed', responses: 500, date: 'Oct 24, 2025' },
        { id: 2, title: 'Remote Work Tools Feedback', status: 'Active', responses: 124, date: 'Oct 28, 2025' },
        { id: 3, title: 'Sustainable Packaging Study', status: 'Draft', responses: 0, date: 'Nov 01, 2025' },
    ];

    return (
        <DashboardLayout>
            <div className="dashboard-header">
                <div>
                    <h1>Client Dashboard</h1>
                    <p>Manage your surveys and view insights.</p>
                </div>
                <Link to="/client/create-survey">
                    <Button variant="primary" icon={<FaPlus />}>Create New Survey</Button>
                </Link>
            </div>

            <div className="stats-grid">
                <div className="stat-card">
                    <h3>Total Surveys</h3>
                    <div className="stat-value">12</div>
                </div>
                <div className="stat-card">
                    <h3>Active Respondents</h3>
                    <div className="stat-value">1,240</div>
                </div>
                <div className="stat-card">
                    <h3>Credits Balance</h3>
                    <div className="stat-value">$450.00</div>
                </div>
            </div>

            <div className="surveys-section">
                <div className="section-title-row">
                    <h2>Recent Surveys</h2>
                    <div className="search-box">
                        <FaSearch className="search-icon" />
                        <input type="text" placeholder="Search surveys..." />
                    </div>
                </div>

                <div className="surveys-table-container">
                    <table className="surveys-table">
                        <thead>
                            <tr>
                                <th>Survey Name</th>
                                <th>Status</th>
                                <th>Responses</th>
                                <th>Date Created</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {surveys.map((survey) => (
                                <tr key={survey.id}>
                                    <td className="survey-title-cell">
                                        <div className="icon-wrapper"><FaFileAlt /></div>
                                        {survey.title}
                                    </td>
                                    <td>
                                        <span className={`status-badge status-${survey.status.toLowerCase()}`}>
                                            {survey.status}
                                        </span>
                                    </td>
                                    <td>{survey.responses} / 500</td>
                                    <td>{survey.date}</td>
                                    <td>
                                        <Button variant="ghost" size="small">View Report</Button>
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

export default ClientDashboard;
