import React from 'react';
import { Hero } from '../components/Hero';
import { Features } from '../components/Features';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

const Home = () => {
    return (
        <div className="page-wrapper">
            <Header />
            <main>
                <Hero />
                <Features />
            </main>
            <Footer />
        </div>
    );
};

export default Home;
