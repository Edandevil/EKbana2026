import React from 'react';
import { Rocket, Calendar, PhoneCall, Clock, ShieldCheck, Headset } from 'lucide-react';
import './CTASection.css';

const CTASection: React.FC = () => {
    return (
        <section className="cta-section">
            <div className="cta-container">
                {/* Main Content */}
                <div className="cta-content">
                    <div className="cta-badge">
                        <Rocket size={16} className="badge-icon" />
                        <span>Start Your AI Transformation</span>
                    </div>

                    <h2 className="cta-title section-title">
                        AI Is No Longer an Upgrade. It's a Business Requirement.
                    </h2>

                    <p className="cta-description">
                        Join 500+ leading enterprises that trust EKbana to power their AI-driven transformation. Schedule a personalized demo today.
                    </p>

                    <div className="cta-actions">
                        <a href="#demo" className="cta-btn cta-btn-primary">
                            <Calendar size={18} className="cta-btn-icon" />
                            <span className="cta-btn-text">REQUEST A DEMO</span>
                        </a>
                        <a href="#consultation" className="cta-btn cta-btn-secondary">
                            <PhoneCall size={18} className="cta-btn-icon" />
                            <span className="cta-btn-text">SCHEDULE CONSULTATION</span>
                        </a>
                    </div>
                </div>

                {/* Features Footer */}
                <div className="cta-features-wrapper">
                    <div className="cta-features-grid">
                        <div className="cta-feature-item">
                            <Clock size={24} className="feature-icon" />
                            <h4 className="feature-title">Quick Setup</h4>
                            <p className="feature-desc">Deploy in weeks, not months</p>
                        </div>
                        <div className="cta-feature-item">
                            <ShieldCheck size={24} className="feature-icon" />
                            <h4 className="feature-title">Enterprise Security</h4>
                            <p className="feature-desc">SOC 2 & ISO certified</p>
                        </div>
                        <div className="cta-feature-item">
                            <Headset size={24} className="feature-icon" />
                            <h4 className="feature-title">24/7 Support</h4>
                            <p className="feature-desc">Dedicated success team</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTASection;
