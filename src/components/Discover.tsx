import { useState } from 'react';
import './Discover.css';

const industries = [
    {
        id: 'finance',
        name: 'Finance',
        title: 'Future of Finance',
        description: 'AI is redefining risk management, fraud detection, and financial decision-making. EKbana enables financial institutions to leverage data for smarter, faster, and more secure services.',
        highlights: [
            'Real-time fraud detection systems',
            'Credit risk and predictive scoring models',
            'Intelligent customer insights & personalization'
        ],
        image: '/finance.png'
    },
    {
        id: 'retail',
        name: 'Retail & E-Commerce',
        title: 'Future of Retail',
        description: 'Transforming retail experiences with AI-driven personalization, inventory optimization, and dynamic pricing models.',
        highlights: [
            'Personalized shopping experiences',
            'Automated inventory management',
            'Dynamic pricing algorithms'
        ],
        image: '/retail.png'
    },
    {
        id: 'manufacturing',
        name: 'Manufacturing',
        title: 'Future of Manufacturing',
        description: 'Optimizing production lines, predictive maintenance, and supply chain logistics with advanced AI solutions.',
        highlights: [
            'Predictive maintenance for machinery',
            'Supply chain optimization',
            'Quality control automation'
        ],
        image: '/manufacturing.png'
    },
    {
        id: 'enterprise',
        name: 'Enterprise Operations',
        title: 'Future of Enterprise',
        description: 'Streamlining operations, automating workflows, and enhancing decision-making across all enterprise departments.',
        highlights: [
            'Workflow automation and optimization',
            'Data-driven decision support',
            'Intelligent resource allocation'
        ],
        image: '/enterprise.png'
    }
];

const Discover = () => {
    const [activeTab, setActiveTab] = useState(industries[0].id);

    const activeData = industries.find(ind => ind.id === activeTab) || industries[0];

    return (
        <section className="discover-section">
            <div className="container">
                <h2 className="discover-main-title section-title">
                    Discover How AI Is Reshaping<br />
                    the Future of Industries
                </h2>

                <div className="discover-content-wrapper">
                    <div className="discover-left-col">

                        <div className="discover-tabs">
                            {industries.map(industry => (
                                <button
                                    key={industry.id}
                                    className={`discover-tab-btn ${activeTab === industry.id ? 'active' : ''}`}
                                    onClick={() => setActiveTab(industry.id)}
                                >
                                    {industry.name}
                                </button>
                            ))}
                        </div>

                        <div className="discover-tab-content">
                            <h3 className="discover-tab-title">{activeData.title}</h3>
                            <p className="discover-tab-desc">{activeData.description}</p>

                            <div className="discover-highlights">
                                <h4 className="highlights-title">Highlights:</h4>
                                <ol className="highlights-list">
                                    {activeData.highlights.map((highlight, index) => (
                                        <li key={index}>{highlight}</li>
                                    ))}
                                </ol>
                            </div>

                            <button className="btn-learn-more">
                                LEARN MORE
                            </button>
                        </div>

                    </div>

                    <div className="discover-right-col">
                        <div className="discover-image-wrapper">
                            <img src={activeData.image} alt={activeData.title} className="discover-image" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Discover;
