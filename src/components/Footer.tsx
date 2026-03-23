import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, Facebook, Instagram, Github, Linkedin, Twitter, MessageSquare } from 'lucide-react';
import logoFull from '../assets/logo-full.png';
import './Footer.css';

const Footer: React.FC = () => {
    const [isLangOpen, setIsLangOpen] = useState(false);
    const [currentLang, setCurrentLang] = useState('English');
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsLangOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const languages = [
        { name: 'English', code: 'en' },
        { name: 'Japanese', code: 'jp' }
    ];

    return (
        <footer className="footer-wrapper">
            <div className="footer-container">
                {/* --- Top Bar --- */}
                <div className="footer-top-bar">
                    <div className="footer-top-left">
                        <div className="footer-logo">
                            <img src={logoFull} alt="EKbana Logo" className="footer-logo-img" />
                        </div>
                        <span className="footer-tagline">Reimagine your enterprise with EKbana.ai</span>
                    </div>

                    <div className="footer-top-right">
                        <div className="lang-selector-container" ref={dropdownRef}>
                            <button 
                                className={`lang-selector ${isLangOpen ? 'active' : ''}`}
                                onClick={() => setIsLangOpen(!isLangOpen)}
                            >
                                <Globe size={16} className="lang-icon" />
                                <span>{currentLang}</span>
                                <ChevronDown size={16} className={`lang-chevron ${isLangOpen ? 'rotate' : ''}`} />
                            </button>

                            {isLangOpen && (
                                <div className="lang-dropdown">
                                    {languages.map((lang) => (
                                        <button
                                            key={lang.code}
                                            className={`lang-option ${currentLang === lang.name ? 'selected' : ''}`}
                                            onClick={() => {
                                                setCurrentLang(lang.name);
                                                setIsLangOpen(false);
                                            }}
                                        >
                                            {lang.name}
                                            {currentLang === lang.name && (
                                                <span className="selected-dot" />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* --- Main Grid --- */}
                <div className="footer-main-grid">
                    {/* Left Side Links Area */}
                    <div className="footer-links-area">
                        {/* Column 1 */}
                        <div className="footer-col">
                            <h4 className="footer-col-title">GET STARTED</h4>
                            <ul className="footer-links">
                                <li><a href="#explore">Explore AI for Work</a></li>
                                <li><a href="#service">AI for Service</a></li>
                                <li><a href="#optimize">Optimize AI for Process</a></li>
                                <li><a href="#demo">Try a Demo</a></li>
                                <li><a href="#consultation">Request a Free Consultation</a></li>
                            </ul>
                        </div>

                        {/* Column 2 */}
                        <div className="footer-col">
                            <h4 className="footer-col-title">SERVICES</h4>
                            <ul className="footer-links">
                                <li><a href="#web">Web Technology</a></li>
                                <li><a href="#mobile">Mobile App Development</a></li>
                                <li><a href="#frontend">Front End Development</a></li>
                                <li><a href="#qa">Quality Assurance</a></li>
                                <li><a href="#ux">User Centered Design</a></li>
                                <li><a href="#devops">Devops/Security</a></li>
                                <li><a href="#cloud">Cloud Computing</a></li>
                            </ul>
                        </div>

                        {/* Column 3 */}
                        <div className="footer-col">
                            <h4 className="footer-col-title">AI SERVICES</h4>
                            <ul className="footer-links">
                                <li><a href="#data">Data Analytics</a></li>
                                <li><a href="#workflow">Workflow Automation</a></li>
                                <li><a href="#consulting">AI Consulting</a></li>
                                <li><a href="#ml">ML Development</a></li>
                                <li><a href="#cloud-ai">Cloud-based AI</a></li>
                                <li><a href="#nlp">ML models, NLP, vision APIs</a></li>
                            </ul>
                        </div>

                        {/* Column 4 */}
                        <div className="footer-col">
                            <h4 className="footer-col-title">COMPANY</h4>
                            <ul className="footer-links">
                                <li><a href="#about">About Company</a></li>
                                <li><a href="#activities">Our Activities</a></li>
                                <li><a href="#privacy">Privacy Policy</a></li>
                                <li><a href="#contact">Contact Us</a></li>
                                <li><a href="#careers">Careers</a></li>
                            </ul>
                        </div>

                        {/* Column 5 */}
                        <div className="footer-col">
                            <h4 className="footer-col-title">RESOURCES</h4>
                            <ul className="footer-links">
                                <li><a href="#research">AI Research Reports</a></li>
                                <li><a href="#docs">Documentation</a></li>
                                <li><a href="#insights">Insights</a></li>
                                <li><a href="#cases">Case Studies</a></li>
                                <li><a href="#company-profile">Company Profile</a></li>
                            </ul>
                        </div>

                        {/* Column 6 & 7 (Industries + CTA area) */}
                        <div className="footer-col footer-col-industries">
                            <h4 className="footer-col-title">INDUSTRIES</h4>
                            <ul className="footer-links">
                                <li><a href="#ecommerce">Ecommerce</a></li>
                                <li><a href="#food">Food & Beverage</a></li>
                                <li><a href="#geospatial">Geospatial</a></li>
                                <li><a href="#insurance">Insurance</a></li>
                                <li><a href="#nonprofit">Non-Profit</a></li>
                                <li><a href="#retail">Retail</a></li>
                            </ul>
                        </div>
                    </div>

                    {/* Right Side CTA Area */}
                    <div className="footer-right-area">
                        {/* Floating CTA Column (Right Side) */}
                        <div className="footer-cta-col">
                            <div className="footer-cta-card">
                                <MessageSquare size={32} strokeWidth={1.5} className="cta-icon" />
                                <h3 className="cta-title">Let's work together</h3>
                                <p className="cta-desc">Get answers and a customized quote for your projects</p>
                                <a href="#rfp" className="cta-btn">SUBMIT RFP</a>
                            </div>
                        </div>

                        {/* Socials - sits under the last links column on desktop */}
                        <div className="footer-social-wrapper">
                            <h4 className="footer-col-title">FOLLOW US</h4>
                            <div className="footer-social-icons">
                                <a href="#facebook" aria-label="Facebook"><Facebook size={20} /></a>
                                <a href="#instagram" aria-label="Instagram"><Instagram size={20} /></a>
                                <a href="#github" aria-label="Github"><Github size={20} /></a>
                                <a href="#linkedin" aria-label="LinkedIn"><Linkedin size={20} /></a>
                                <a href="#twitter" aria-label="Twitter"><Twitter size={20} /></a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- Bottom Bar --- */}
                <div className="footer-bottom-bar">
                    <div className="footer-logo-muted">
                        <img src={logoFull} alt="EKbana Logo Muted" className="footer-logo-img grayscale" />
                    </div>
                    <div className="footer-copyright">
                        &copy; EKbana {new Date().getFullYear()}. All Rights Reserved
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
