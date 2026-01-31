import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Header } from '../components/Header';
import { Input, Select } from '../components/Input';
import { Button } from '../components/Button';
import '../styles/pages/Auth.css';

const CommunityAuth = () => {
    const location = useLocation();
    const [isLogin, setIsLogin] = useState(location.pathname.includes('login'));

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Community auth submit");
    };

    return (
        <div className="page-wrapper">
            <Header />
            <div className="auth-page">
                <div className="auth-container">
                    <div className="auth-header">
                        <h1 className="auth-title">
                            {isLogin ? 'Welcome back, Insight Generator' : 'Join the Community'}
                        </h1>
                        <p className="auth-subtitle">
                            {isLogin
                                ? 'Log in to answer surveys and earn rewards.'
                                : 'Sign up to share your wisdom and get paid.'}
                        </p>
                    </div>

                    <form className="auth-form" onSubmit={handleSubmit}>
                        {!isLogin && (
                            <>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    <Input label="First Name" placeholder="Jane" type="text" />
                                    <Input label="Last Name" placeholder="Smith" type="text" />
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    <Input label="Age" placeholder="25" type="number" />
                                    <Select
                                        label="Gender"
                                        options={[
                                            { value: 'male', label: 'Male' },
                                            { value: 'female', label: 'Female' },
                                            { value: 'non-binary', label: 'Non-binary' },
                                            { value: 'prefer-not', label: 'Prefer not to say' },
                                        ]}
                                    />
                                </div>
                                <Select
                                    label="Annual Salary Range"
                                    fullWidth
                                    options={[
                                        { value: '0-25k', label: 'Under $25k' },
                                        { value: '25k-50k', label: '$25k - $50k' },
                                        { value: '50k-100k', label: '$50k - $100k' },
                                        { value: '100k+', label: '$100k+' },
                                    ]}
                                />
                                <Select
                                    label="Family Status"
                                    fullWidth
                                    options={[
                                        { value: 'single', label: 'Single' },
                                        { value: 'married', label: 'Married' },
                                        { value: 'kids', label: 'Married with Kids' },
                                    ]}
                                />
                                <Input label="Interests (Comma separated)" placeholder="Tech, Gaming, Travel..." type="text" fullWidth />
                            </>
                        )}

                        <Input label="Email Address" placeholder="jane@example.com" type="email" fullWidth />
                        <Input label="Password" placeholder="••••••••" type="password" fullWidth />

                        {!isLogin && (
                            <Input label="Confirm Password" placeholder="••••••••" type="password" fullWidth />
                        )}

                        <Button variant="secondary" size="large" fullWidth type="submit" style={{ marginTop: '0.5rem' }}>
                            {isLogin ? 'Log In' : 'Join Community'}
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

export default CommunityAuth;
