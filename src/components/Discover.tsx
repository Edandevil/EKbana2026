import { useState, useRef, useEffect } from 'react';
import { Network, ShoppingBag, Factory, Briefcase } from 'lucide-react';
import './Discover.css';

const industries = [
    {
        id: 'finance',
        name: 'Finance',
        title: 'Future of Finance',
        description: 'Banks, Credit Unions, Financial Institutions',
        image: '/finance.png',
        icon: <Briefcase className="card-icon" />
    },
    {
        id: 'retail',
        name: 'Retail & E-Commerce',
        title: 'Future of Retail',
        description: 'Global Brands, Marketplaces, Direct-to-Consumer',
        image: '/retail.png',
        icon: <ShoppingBag className="card-icon" />
    },
    {
        id: 'manufacturing',
        name: 'Manufacturing',
        title: 'Future of Manufacturing',
        description: 'Automotive, Electronics, Heavy Machinery',
        image: '/manufacturing.png',
        icon: <Factory className="card-icon" />
    },
    {
        id: 'enterprise',
        name: 'Enterprise Operations',
        title: 'Future of Enterprise',
        description: 'Streamlining operations and decision-making across departments.',
        image: '/enterprise.png',
        icon: <Network className="card-icon" />
    }
];

const Discover = () => {
    const [activeTab, setActiveTab] = useState(industries[0].id);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const isManualScroll = useRef(false);

    // Mouse drag state
    const isDragging = useRef(false);
    const startX = useRef(0);
    const scrollLeftRef = useRef(0);

    const handleMouseDown = (e: React.MouseEvent) => {
        isDragging.current = true;
        if (scrollContainerRef.current) {
            scrollContainerRef.current.style.scrollBehavior = 'auto'; // Disable smooth scroll while dragging
            scrollContainerRef.current.style.scrollSnapType = 'none'; // Disable snap while dragging
            scrollContainerRef.current.style.cursor = 'grabbing';
            startX.current = e.pageX - scrollContainerRef.current.offsetLeft;
            scrollLeftRef.current = scrollContainerRef.current.scrollLeft;
        }
    };

    const handleMouseLeave = () => {
        isDragging.current = false;
        if (scrollContainerRef.current) {
            scrollContainerRef.current.style.scrollBehavior = 'smooth';
            scrollContainerRef.current.style.scrollSnapType = 'x mandatory';
            scrollContainerRef.current.style.cursor = 'grab';
        }
    };

    const handleMouseUp = () => {
        isDragging.current = false;
        if (scrollContainerRef.current) {
            scrollContainerRef.current.style.scrollBehavior = 'smooth';
            scrollContainerRef.current.style.scrollSnapType = 'x mandatory';
            scrollContainerRef.current.style.cursor = 'grab';
        }
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging.current) return;
        e.preventDefault();
        if (scrollContainerRef.current) {
            const x = e.pageX - scrollContainerRef.current.offsetLeft;
            const walk = (x - startX.current) * 1.5; // Scroll speed
            scrollContainerRef.current.scrollLeft = scrollLeftRef.current - walk;
        }
    };

    // Update active tab based on scroll position wrapper
    useEffect(() => {
        const handleScroll = () => {
            if (isManualScroll.current) return;
            if (!scrollContainerRef.current) return;

            const container = scrollContainerRef.current;
            const scrollLeft = container.scrollLeft;
            const cards = container.children;
            
            for(let i = 0; i < cards.length; i++) {
                const card = cards[i] as HTMLElement;
                const cardLeft = card.offsetLeft - container.offsetLeft;
                if (scrollLeft >= cardLeft - 50 && scrollLeft < cardLeft + card.offsetWidth / 2) {
                    setActiveTab(industries[i].id);
                    break;
                }
            }
        };

        const container = scrollContainerRef.current;
        if(container) {
            container.addEventListener('scroll', handleScroll, { passive: true });
        }
        return () => {
            if(container) {
                container.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);

    const handleTabClick = (id: string, index: number) => {
        setActiveTab(id);
        isManualScroll.current = true;
        
        if (scrollContainerRef.current) {
            const cards = scrollContainerRef.current.children;
            const targetCard = cards[index] as HTMLElement;
            if (targetCard) {
                scrollContainerRef.current.scrollTo({
                    left: targetCard.offsetLeft - scrollContainerRef.current.offsetLeft,
                    behavior: 'smooth'
                });
            }
        }

        setTimeout(() => {
            isManualScroll.current = false;
        }, 600); // Resume scroll detection after animation
    };

    return (
        <section className="discover-section">
            <div className="discover-layout">
                {/* Left Column */}
                <div className="discover-content-left">
                    <h2 className="discover-main-title">
                        Discover How AI Is Reshaping the Future of Industries
                    </h2>
                    <p className="discover-subtext">
                        Trust us, we've learned from the best.
                    </p>
                    
                    <div className="cta-spacer" style={{ flexGrow: 1}}></div>

                    <p className="discover-description">
                        Discover why hundreds of enterprises use EKbana.
                    </p>

                    <div className="discover-cta-group">
                        <button className="btn-outline-dark">REQUEST A DEMO &rarr;</button>
                        <button className="btn-outline-light">LET'S TALK</button>
                    </div>
                </div>

                {/* Right Column / Top Tabs & Carousel */}
                <div className="discover-content-right">
                    <div className="pill-tabs-container">
                        {industries.map((industry, index) => (
                            <button
                                key={industry.id}
                                className={`pill-tab ${activeTab === industry.id ? 'active' : ''}`}
                                onClick={() => handleTabClick(industry.id, index)}
                            >
                                {industry.name}
                            </button>
                        ))}
                    </div>

                    <div 
                        className="carousel-container" 
                        ref={scrollContainerRef}
                        onMouseDown={handleMouseDown}
                        onMouseLeave={handleMouseLeave}
                        onMouseUp={handleMouseUp}
                        onMouseMove={handleMouseMove}
                    >
                        {industries.map((ind) => (
                            <div className="industry-card" key={ind.id} style={{ backgroundImage: `url(${ind.image})`}}>
                                <div className="card-overlay"></div>
                                <div className="card-content">
                                    <div className="card-top">
                                        <h3>{ind.description}</h3>
                                        <p>{ind.title}</p>
                                    </div>
                                    <div className="card-bottom">
                                        <p className="trusted-text">Trusted by industry leaders:</p>
                                        <div className="logo-row">
                                            {/* Mock Logos */}
                                            <div className="mock-logo">
                                                <Network size={20} /> <span className="logo-text">AuraNet</span>
                                            </div>
                                            <div className="mock-logo">
                                                <Briefcase size={20} /> <span className="logo-text">FinTrust</span>
                                            </div>
                                            <div className="mock-logo">
                                                <Factory size={20} /> <span className="logo-text">CoreInd</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Discover;
