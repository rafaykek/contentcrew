import React from 'react';
import { Globe, Target, Layers, ArrowUpRight } from 'lucide-react';

export default function ValueProps() {
  const features = [
    {
      icon: Globe,
      title: "Real Competitor Scraping",
      desc: "Analysis Agent searches live search engines and scrapes top-ranking competitor articles to ensure zero missing topics."
    },
    {
      icon: Target,
      title: "Search Intent & Content Gaps",
      desc: "Extracts semantic keyword volume, heading structures, and competitive gaps before writing a single word."
    },
    {
      icon: Layers,
      title: "Two-Stage Approval Gates",
      desc: "Human marketers retain complete control. Approve the research plan first, then review & edit the final draft in the blog editor."
    }
  ];

  return (
    <section style={{ padding: '4rem 0' }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem'
        }}>
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-lg)',
                padding: '2rem'
              }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--accent-primary-light)',
                  border: '1px solid rgba(16, 185, 129, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--accent-primary)',
                  marginBottom: '1.25rem'
                }}>
                  <Icon size={22} />
                </div>

                <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                  {item.title}
                </h3>

                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.6 }}>
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function CTASection({ onStartCreating }) {
  return (
    <section style={{
      padding: '4rem 0',
      backgroundColor: 'var(--bg-secondary)',
      borderTop: '1px solid var(--border-color)'
    }}>
      <div className="container" style={{ textAlign: 'center', maxWidth: '680px' }}>
        <h2 style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1rem' }}>
          Ready to experience agentic content creation?
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.0625rem', marginBottom: '2rem', lineHeight: 1.6 }}>
          Launch the ContentCrew marketing workspace, inspect the three-column layout, and test the interactive workflow simulation.
        </p>
        <button
          onClick={onStartCreating}
          className="btn btn-primary btn-lg"
        >
          <span>Launch Marketing Workspace</span>
          <ArrowUpRight size={18} />
        </button>
      </div>
    </section>
  );
}
