import React from 'react';
import { ArrowRight } from 'lucide-react';
import './NewsSection.css';

interface NewsItem {
    id: number;
    tag: string;
    date: string;
    title: string;
    colorClass: string;
}

const newsData: NewsItem[] = [
    {
        id: 1,
        tag: 'EKBANA TEAM',
        date: 'DEC 11, 2025',
        title: "Introducing Rerank 4: EKbana's most powerful reranker yet",
        colorClass: 'news-img-purple'
    },
    {
        id: 2,
        tag: 'EKBANA TEAM',
        date: 'NOV 27, 2025',
        title: 'EKbana expands partnership with SAP to provide Europe sovereign AI solutions',
        colorClass: 'news-img-orange'
    },
    {
        id: 3,
        tag: 'EKBANA TEAM',
        date: 'OCT 07, 2025',
        title: 'Announcing the EKbana Partner Program: Boosting enterprise AI',
        colorClass: 'news-img-dark'
    }
];

const NewsSection: React.FC = () => {
    return (
        <section className="news-section">
            <div className="news-container">
                {/* Header */}
                <div className="news-header">
                    <h2 className="news-section-title">Latest Insights</h2>
                    <a href="#insights" className="news-insights-link">
                        See more on the Insights <ArrowRight size={16} />
                    </a>
                </div>

                {/* Grid */}
                <div className="news-grid">
                    {newsData.map((news) => (
                        <div key={news.id} className="news-card">
                            <div className={`news-card-image ${news.colorClass}`}></div>
                            <div className="news-card-content">
                                <div className="news-meta">
                                    {news.tag} - {news.date}
                                </div>
                                <h3 className="news-card-title">{news.title}</h3>
                                <div className="news-card-footer">
                                    <span className="read-more">Read more</span>
                                </div>
                            </div>
                            <div className="news-card-arrow-zone">
                                <ArrowRight size={20} className="arrow-icon" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default NewsSection;
