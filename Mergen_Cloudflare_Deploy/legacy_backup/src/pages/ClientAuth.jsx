import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Header } from '../components/Header';
import { Input, Select } from '../components/Input';
import { Button } from '../components/Button';
import '../styles/pages/Auth.css';

const ClientAuth = () => {
    const location = useLocation();
    const [isLogin, setIsLogin] = useState(location.pathname.includes('login'));

    // Mock form handler
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Client auth submit");
    };

    return (
        <div className="page-wrapper">
            <Header />
            <div className="auth-page">
                <div className="auth-container">
                    <div className="auth-header">
                        <h1 className="auth-title">
                            {isLogin ? 'Welcome back, Client' : 'Partner with Mergen'}
                        </h1>
                        <p className="auth-subtitle">
                            {isLogin
                                ? 'Log in to access your surveys and insights.'
                                : 'Create an account to start generating AI-powered surveys.'}
                        </p>
                    </div>

                    <form className="auth-form" onSubmit={handleSubmit}>
                        {!isLogin && (
                            <>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    <Input label="First Name" placeholder="John" type="text" />
                                    <Input label="Last Name" placeholder="Doe" type="text" />
                                </div>
                                <Input label="Company Name" placeholder="Acme Inc." type="text" fullWidth />
                                <Select
                                    label="Industry"
                                    fullWidth
                                    options={[
                                        { value: 'tech', label: 'Technology' },
                                        { value: 'finance', label: 'Finance' },
                                        { value: 'health', label: 'Healthcare' },
                                        { value: 'retail', label: 'Retail' },
                                        { value: 'other', label: 'Other' },
                                    ]}
                                />
                                <Input label="Job Position" placeholder="Marketing Manager" type="text" fullWidth />
                            </>
                        )}

                        <Input label="Work Email" placeholder="name@company.com" type="email" fullWidth />
                        <Input label="Password" placeholder="••••••••" type="password" fullWidth />

                        {!isLogin && (
                            <Input label="Confirm Password" placeholder="••••••••" type="password" fullWidth />
                        )}

                        <Button variant="primary" size="large" fullWidth type="submit" style={{ marginTop: '0.5rem' }}>
                            {isLogin ? 'Log In' : 'Create Account'}
                        </Button>
                    </form>

                    <div className="auth-footer">
                        {isLogin ? "Don't have an account? " : "Already have an account? "}
                        <span className="auth-link" onClick={() => setIsLogin(!isLogin)}>
                            {isLogin ? 'Sign up' : 'Log in'}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClientAuth;
