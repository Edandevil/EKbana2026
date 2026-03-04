import React from 'react';
import { ArrowRight, Box, CreditCard, Activity } from 'lucide-react';
import './Hero.css';

const Hero: React.FC = () => {
    return (
        <section className="hero">
            <div className="container hero-container">
                {/* Left Column - Content */}
                <div className="hero-content">
                    <div className="hero-badge">
                        <span className="badge-dot"></span>
                        Trusted Digital Innovation Partner
                    </div>

                    <h1 className="hero-title">
                        Empowering Businesses with
                        <span>Intelligent Digital Solutions</span>
                    </h1>

                    <p className="hero-description">
                        Based in Nepal, we shape intelligent products and enterprise solutions that empower companies to scale faster, smarter, and more efficiently in a digital-first world.
                    </p>

                    <a href="#contact" className="hero-cta">
                        Schedule a Consultation
                        <ArrowRight size={18} />
                    </a>
                </div>

                {/* Right Column - Visual Graphic */}
                <div className="hero-visual">
                    {/* Floating Card 1 - Top Left */}
                    <div className="floating-card top-left">
                        <div className="card-icon blue">
                            <Box size={24} />
                        </div>
                        <div className="card-content">
                            <span className="card-title">Enterprise Software</span>
                            <span className="card-value">Built to Scale</span>
                        </div>
                    </div>

                    {/* Dashboard Mockup */}
                    <div className="dashboard-mockup">
                        <div className="mockup-header">
                            <span className="mockup-dot red"></span>
                            <span className="mockup-dot yellow"></span>
                            <span className="mockup-dot green"></span>
                        </div>
                        <div className="mockup-chart">
                            <div className="bar"></div>
                            <div className="bar"></div>
                            <div className="bar"></div>
                            <div className="bar"></div>
                            <div className="bar"></div>
                        </div>
                    </div>

                    {/* Floating Card 2 - Bottom Right */}
                    <div className="floating-card bottom-right">
                        <div className="card-icon blue">
                            <CreditCard size={24} />
                        </div>
                        <div className="card-content">
                            <span className="card-title">Digital Transformation</span>
                            <span className="card-value">Seamless Experience</span>
                        </div>
                    </div>

                    {/* Floating Card 3 - Bottom Left */}
                    <div className="floating-card bottom-left">
                        <div className="card-icon green">
                            <Activity size={24} />
                        </div>
                        <div className="card-content">
                            <span className="card-title">AI & Innovation</span>
                            <span className="card-value">Future Ready</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
