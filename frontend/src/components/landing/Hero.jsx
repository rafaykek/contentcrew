import React from 'react';
import { ArrowRight, Sparkles, CheckCircle2, ShieldCheck, Cpu } from 'lucide-react';

export default function Hero({ onStartCreating, onExploreBlogs }) {
  return (
    <section style={{ padding: '4rem 0 3rem 0', position: 'relative', overflow: 'hidden' }}>
      <div className="container" style={{ textAlign: 'center', maxWidth: '860px' }}>
        
        {/* Top Badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.375rem 0.875rem',
          borderRadius: 'var(--radius-full)',
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          fontSize: '0.8125rem',
          color: 'var(--text-secondary)',
          marginBottom: '1.5rem'
        }}>
          <Sparkles size={14} style={{ color: 'var(--accent-primary)' }} />
          <span>Agentic AI Marketing Platform</span>
          <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'var(--border-highlight)' }} />
          <span style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>Multi-Agent Workflow Engine</span>
        </div>

        {/* Primary Headline */}
        <h1 style={{
          fontSize: '3.25rem',
          fontWeight: 800,
          lineHeight: 1.15,
          letterSpacing: '-0.03em',
          color: 'var(--text-primary)',
          marginBottom: '1.25rem'
        }}>
          Research. Analyze.<br />
          <span style={{
            background: 'linear-gradient(135deg, var(--accent-primary) 0%, #34d399 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Generate. Publish.
          </span>
        </h1>

        {/* Supporting Message */}
        <p style={{
          fontSize: '1.1875rem',
          color: 'var(--text-secondary)',
          lineHeight: 1.6,
          marginBottom: '2.25rem',
          fontWeight: 400
        }}>
          Turn market research into publish-ready content with AI agents working alongside your marketing team.
        </p>

        {/* Call to Actions */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <button 
            onClick={onStartCreating}
            className="btn btn-primary btn-lg"
          >
            <span>Start Creating</span>
            <ArrowRight size={18} />
          </button>

          <button 
            onClick={onExploreBlogs}
            className="btn btn-secondary btn-lg"
          >
            <span>View Sample Blogs</span>
          </button>
        </div>

        {/* Trust Chips */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1.75rem',
          marginTop: '2.5rem',
          fontSize: '0.8125rem',
          color: 'var(--text-muted)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
            <CheckCircle2 size={15} style={{ color: 'var(--accent-primary)' }} />
            <span>Human-in-the-Loop Approval</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
            <ShieldCheck size={15} style={{ color: 'var(--accent-blue)' }} />
            <span>Live Competitor Web Scraping</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
            <Cpu size={15} style={{ color: 'var(--accent-amber)' }} />
            <span>Multi-Agent LangGraph State</span>
          </div>
        </div>

      </div>
    </section>
  );
}
