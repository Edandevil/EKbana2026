import React, { useState, useEffect } from 'react';
import logoFull from '../assets/logo-full.png';
import logoIcon from '../assets/logo-icon.png';

const Navbar: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`navbar ${isScrolled ? 'is-scrolled' : ''}`}>
            <div className="navbar-brand">
                <div className="logo-container">
                    <img
                        src={logoFull}
                        alt="Logo Full"
                        className="navbar-logo logo-full"
                    />
                    <img
                        src={logoIcon}
                        alt="Logo Icon"
                        className="navbar-logo logo-icon"
                    />
                </div>
            </div>
            <div className="navbar-links">
                <a href="#about">About</a>
                <a href="#work" className="btn-work">Work with us</a>
            </div>
        </nav>
    );
};

export default Navbar;
