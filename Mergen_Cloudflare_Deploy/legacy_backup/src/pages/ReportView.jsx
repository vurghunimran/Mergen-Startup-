import React from 'react';
import { DashboardLayout } from '../components/DashboardLayout';
import { Button } from '../components/Button';
import { FaDownload, FaArrowLeft } from 'react-icons/fa';

const ReportView = () => {
    return (
        <DashboardLayout>
            <div style={{ marginBottom: '2rem' }}>
                <Button variant="ghost" size="small" icon={<FaArrowLeft />} onClick={() => window.history.back()}>Back to Dashboard</Button>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1>Gen Z Beverage Preferences - Report</h1>
                <Button variant="outline" icon={<FaDownload />}>Export CSV</Button>
            </div>

            <div style={{ background: 'white', padding: '3rem', borderRadius: '12px', textAlign: 'center', boxShadow: 'var(--shadow-sm)' }}>
                <img src="https://placehold.co/600x400/f3f4f6/a1a1aa?text=Interactive+Charts+Placeholder" alt="Charts" style={{ maxWidth: '100%', borderRadius: '8px', marginBottom: '2rem' }} />
                <h3>Insight & Analysis</h3>
                <p style={{ color: '#6B7280', maxWidth: '600px', margin: '0 auto' }}>
                    Based on 500 responses, 68% of Gen Z respondents prefer plant-based milk alternatives over traditional dairy.
                    The key driver is environmental impact rather than taste.
                </p>
            </div>
        </DashboardLayout>
    );
};

export default ReportView;
