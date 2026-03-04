import { Monitor, Smartphone, Cpu, ShoppingCart } from 'lucide-react';
import './DigitalCapabilities.css';

const capabilities = [
    {
        id: 'web',
        title: 'Web Development',
        icon: <Monitor size={24} />,
        tags: ['Responsive Web Design', 'E-commerce Web Design', 'Landing Page Design', 'CMS Design']
    },
    {
        id: 'mobile',
        title: 'Mobile App Development',
        icon: <Smartphone size={24} />,
        tags: ['iOS App Development', 'Android App Development', 'Flutter / React Native Apps', 'UI/UX for Mobile']
    },
    {
        id: 'ml',
        title: 'ML Development',
        icon: <Cpu size={24} />,
        tags: ['Machine Learning Models', 'Computer Vision', 'AI Integration', 'NLP Solutions']
    },
    {
        id: 'commerce',
        title: 'E-Commerce Solutions',
        icon: <ShoppingCart size={24} />,
        tags: ['Custom E-Commerce', 'Inventory Management', 'Payment Gateway Integration']
    }
];

const DigitalCapabilities = () => {
    return (
        <section className="capabilities-section">
            <div className="container">
                <div className="capabilities-wrapper">

                    {/* Left Column (Text & CTA) */}
                    <div className="capabilities-left">
                        <span className="capabilities-subtitle">Digital Capabilities</span>
                        <h2 className="capabilities-title">
                            Powered by AI at<br />
                            heart
                        </h2>
                        <p className="capabilities-desc">
                            We place AI at the core of innovation—building
                            smarter, scalable solutions that blend technology
                            with human connection.
                        </p>
                        <button className="btn-explore">EXPLORE MORE</button>

                        {/* Abstract background shape for the left side */}
                        <div className="abstract-shape">
                            <img src="/abstract-shape.png" alt="" />
                        </div>
                    </div>

                    {/* Right Column (Cards Grid) */}
                    <div className="capabilities-right">
                        <div className="capabilities-grid">
                            {capabilities.map((cap) => (
                                <div key={cap.id} className="capability-card">
                                    <div className="capability-icon">
                                        {cap.icon}
                                    </div>
                                    <h3 className="capability-card-title">{cap.title}</h3>
                                    <div className="capability-tags">
                                        {cap.tags.map((tag, idx) => (
                                            <span key={idx} className="capability-tag">{tag}</span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default DigitalCapabilities;
