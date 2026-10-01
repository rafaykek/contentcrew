import React from 'react';
import { Sparkles } from 'lucide-react';

export default function Footer({ onNavigate }) {
  return (
    <footer style={{
      borderTop: '1px solid var(--border-color)',
      backgroundColor: 'var(--bg-secondary)',
      padding: '3rem 0 2rem 0',
      color: 'var(--text-secondary)',
      fontSize: '0.875rem'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2.5rem',
          marginBottom: '2.5rem'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <div style={{
                width: '28px',
                height: '28px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--accent-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#000'
              }}>
                <Sparkles size={16} />
              </div>
              <span style={{ fontWeight: 800, color: 'var(--text-primary)', fontSize: '1rem' }}>ContentCrew</span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.8125rem', lineHeight: 1.6 }}>
              Turn market research into publish-ready technical content with AI agents working alongside your marketing team.
            </p>
          </div>

          <div>
            <h4 style={{ color: 'var(--text-primary)', fontSize: '0.875rem', fontWeight: 700, marginBottom: '0.875rem' }}>
              Product Navigation
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.8125rem' }}>
              <li><a href="#hero" onClick={(e) => { e.preventDefault(); onNavigate('landing'); }}>Landing Page</a></li>
              <li><a href="#blogs" onClick={(e) => { e.preventDefault(); onNavigate('blogs'); }}>Published Blogs</a></li>
              <li><a href="#workspace" onClick={(e) => { e.preventDefault(); onNavigate('workspace'); }}>Marketing Workspace</a></li>
            </ul>
          </div>

          <div>
            <h4 style={{ color: 'var(--text-primary)', fontSize: '0.875rem', fontWeight: 700, marginBottom: '0.875rem' }}>
              Workflow Architecture
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
              <li>Research & Context Extraction</li>
              <li>Competitor & SEO Gap Analysis</li>
              <li>Human-in-the-Loop Strategy Gate</li>
              <li>Generation Agent Draft Builder</li>
              <li>Dynamic Editor & CMS Publishing</li>
            </ul>
          </div>

          <div>
            <h4 style={{ color: 'var(--text-primary)', fontSize: '0.875rem', fontWeight: 700, marginBottom: '0.875rem' }}>
              Architecture Phase
            </h4>
            <div style={{
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--bg-primary)',
              border: '1px solid var(--border-color)',
              fontSize: '0.8125rem'
            }}>
              <span style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>Phase 1 Complete</span>
              <p style={{ color: 'var(--text-muted)', marginTop: '0.25rem', fontSize: '0.75rem' }}>
                Frontend foundation & visual workflow engine ready for LangGraph backend integration.
              </p>
            </div>
          </div>
        </div>

        <div style={{
          borderTop: '1px solid var(--border-subtle)',
          paddingTop: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '0.75rem',
          color: 'var(--text-muted)'
        }}>
          <div>© {new Date().getFullYear()} ContentCrew. Built for Agentic AI Engineering.</div>
          <div>React + Vite + Modern Vanilla CSS</div>
        </div>
      </div>
    </footer>
  );
}
