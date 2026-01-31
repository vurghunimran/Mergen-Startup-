import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export const DashboardLayout = ({ children }) => {
    return (
        <div className="dashboard-layout">
            <Header />
            <main className="dashboard-content" style={{ minHeight: '80vh', padding: '2rem 0', backgroundColor: '#F9FAFB' }}>
                <div className="container">
                    {children}
                </div>
            </main>
            <Footer />
        </div>
    );
};
