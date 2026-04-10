import React, { useState, useEffect } from 'react';
import BlobCanvas from './BlobCanvas';
import './Hero.css';

const Hero: React.FC = () => {
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScrollIndicator(false);
      } else {
        setShowScrollIndicator(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      {/* Fixed 3D Canvas spanning both folds */}
      <BlobCanvas />

      {/* First Fold / Hero Section */}
      <div className="hero-wrapper">
        <section className="hero-section text-center-hero">
          <div className="hero-text">
            <h1>
              <strong>AI</strong>-Native Enterprise Systems<br />
              Built for <strong>Real Business Outcomes</strong>
            </h1>
          </div>

          <div className={`scroll-indicator ${showScrollIndicator ? '' : 'hidden'}`}>
            <svg width="24" height="40" viewBox="0 0 24 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="0.5" y="0.5" width="23" height="35" rx="11.5" stroke="#111" strokeWidth="1" />
              <path d="M12 9V15" stroke="#111" strokeWidth="2" strokeLinecap="round" />
              <path d="M8 39L12 42L16 39" stroke="#111" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </section>
      </div>

      {/* Second Fold */}
      <section className="second-fold">
        <div className="container fold2-content">
          <h2 className="fold2-title">
            <strong>95%</strong> of GenAI projects fail<br />
            we are among the <strong>5%</strong> that deliver.
          </h2>
          <p className="fold2-desc">
            Because we don't build AI demos. We build AI-powered enterprise systems <br />
            that actually get adopted.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Hero;
