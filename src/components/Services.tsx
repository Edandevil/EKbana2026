
import {
    Network,
    Briefcase,
    Settings,
    UserCog,
    Cloud,
    Lightbulb
} from 'lucide-react';
import './Services.css';

const services = [
    {
        icon: <Network size={20} />,
        title: 'AI Native System',
        description: 'Create intelligent platforms that learn, adapt, and automate — driving smarter enterprise performance at scale.'
    },
    {
        icon: <Briefcase size={20} />,
        title: 'Enterprise Applications',
        description: 'Develop secure, high-performance web and mobile applications tailored to complex enterprise needs.'
    },
    {
        icon: <Settings size={20} />,
        title: 'AI Strategy & Consulting',
        description: 'Define a clear roadmap for AI adoption aligned with your business goals and operational maturity.'
    },
    {
        icon: <UserCog size={20} />,
        title: 'Intelligent Automation',
        description: 'Optimize workflows and reduce manual effort with AI-powered systems.'
    },
    {
        icon: <Cloud size={20} />,
        title: 'Cloud & DevOps',
        description: 'Accelerate delivery with modern infrastructure and continuous deployment pipelines.'
    },
    {
        icon: <Lightbulb size={20} />,
        title: 'Product Innovation',
        description: 'Design and build user-centric digital products that drive measurable impact.'
    }
];

const Services = () => {
    return (
        <section className="services-section">
            <div className="container">

                <div className="services-header">
                    <div className="services-header-left section-header-center-mobile">
                        <span className="services-subtitle section-subtitle">WHAT WE OFFER</span>
                        <h2 className="services-title section-title">Engineering the<br />Future with AI</h2>
                    </div>
                    <div className="services-header-right">
                        <p className="services-description">
                            Modern businesses require adaptable platforms, intelligent automation, and strong solutions to ensure a secure and effective digital transformation.
                        </p>
                    </div>
                </div>

                <div className="services-grid">
                    {services.map((service, index) => (
                        <div className="service-card" key={index}>
                            <div className="service-icon-wrapper">
                                {service.icon}
                            </div>
                            <h3 className="service-card-title">{service.title}</h3>
                            <p className="service-card-desc">{service.description}</p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Services;
