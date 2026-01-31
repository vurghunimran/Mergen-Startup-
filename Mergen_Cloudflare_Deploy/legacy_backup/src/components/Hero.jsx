import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './Button';
import '../styles/components/Hero.css';
import { FaPlay } from 'react-icons/fa';

export const Hero = () => {
    return (
        <section className="hero">
            <div className="container hero__container">
                <div className="hero__content">
                    <h1 className="hero__title">
                        Wisdom in the <span className="highlight">Data.</span>
                    </h1>
                    <p className="hero__desc">
                        Empowering brands with hyper-targeted audience insights.
                        We bridge the gap between complex questions and precise
                        community wisdom through advanced neural analysis.
                    </p>

                    <div className="hero__actions">
                        <Link to="/create-survey">
                            <Button variant="primary" size="large">Start Survey</Button>
                        </Link>
                        <Link to="/surveys">
                            <Button variant="outline" size="large" icon={<FaPlay />}>Answer Survey</Button>
                        </Link>
                    </div>

                    <div className="hero__trusted">
                        <span>TRUSTED BY INDUSTRY LEADERS</span>
                        <div className="trusted-logos">
                            {/* Placeholders for logos */}
                            <div className="logo-box"></div>
                            <div className="logo-box"></div>
                            <div className="logo-box"></div>
                            <div className="logo-box"></div>
                        </div>
                    </div>
                </div>

                <div className="hero__visual">
                    <div className="monitor-frame">
                        {/* This would ideally be an image or a complex CSS composition 
                             simulating the "Data-driven screen" from the user request */}
                        <div className="monitor-screen">
                            <div className="screen-header">
                                <div className="dot red"></div>
                                <div className="dot yellow"></div>
                                <div className="dot green"></div>
                            </div>
                            <div className="screen-content">
                                <div className="chart-area fly-in">
                                    <div className="graph-line"></div>
                                    <div className="data-point p1"></div>
                                    <div className="data-point p2"></div>
                                    <div className="data-point p3"></div>
                                </div>
                                <div className="stats-card float-anim">
                                    <span>Node Connections</span>
                                    <strong>14,284 Active</strong>
                                </div>
                            </div>
                        </div>
                        <div className="monitor-stand"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};
