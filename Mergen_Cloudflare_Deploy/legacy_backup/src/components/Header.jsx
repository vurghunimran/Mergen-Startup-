import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './Button';
import '../styles/components/Header.css';

export const Header = () => {
    const location = useLocation();
    const isAuthPage = location.pathname.includes('/login') || location.pathname.includes('/signup');

    // Placeholder auth state
    const isLoggedIn = false;

    return (
        <header className="header">
            <div className="container header__container">
                <Link to="/" className="header__logo">
                    <div className="logo-icon">M</div> {/* Placeholder for actual logo */}
                    <span className="logo-text">MERGEN</span>
                </Link>

                {!isAuthPage && (
                    <>
                        <nav className="header__nav">
                            <Link to="/clients" className="nav-link">For Clients</Link>
                            <Link to="/community" className="nav-link">For Community</Link>
                            <Link to="/about" className="nav-link">About Us</Link>
                            <Link to="/pricing" className="nav-link">Pricing</Link>
                        </nav>

                        <div className="header__actions">
                            {isLoggedIn ? (
                                <Link to="/dashboard">
                                    <Button variant="outline" size="small">Dashboard</Button>
                                </Link>
                            ) : (
                                <>
                                    <Link to="/login/client">
                                        <Button variant="ghost" size="medium">Log in</Button>
                                    </Link>
                                    <Link to="/signup/client">
                                        <Button variant="primary" size="medium">Sign up</Button>
                                    </Link>
                                </>
                            )}
                        </div>
                    </>
                )}
            </div>
        </header>
    );
};
