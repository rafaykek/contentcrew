import React from 'react';
import { Search, Globe, Key, BarChart3, Check, ExternalLink } from 'lucide-react';

export default function ToolActivityCard({ event }) {
  if (!event || event.type !== 'TOOL_EXECUTION') return null;

  const getToolIcon = () => {
    switch (event.tool) {
      case 'Google Search': return <Search size={15} style={{ color: 'var(--accent-blue)' }} />;
      case 'Web Scraper': return <Globe size={15} style={{ color: 'var(--accent-primary)' }} />;
      case 'Keyword Analysis': return <Key size={15} style={{ color: 'var(--accent-amber)' }} />;
      case 'Competitor Analysis': return <BarChart3 size={15} style={{ color: '#a855f7' }} />;
      default: return <Search size={15} />;
    }
  };

  return (
    <div style={{
      backgroundColor: 'var(--bg-card)',
      border: '1px solid var(--border-color)',
      borderRadius: 'var(--radius-md)',
      padding: '1rem 1.25rem',
      marginBottom: '0.875rem',
      fontSize: '0.8125rem'
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.625rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{
            padding: '0.25rem 0.5rem',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.375rem',
            fontWeight: 700,
            color: 'var(--text-primary)'
          }}>
            {getToolIcon()}
            <span>{event.tool}</span>
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>via {event.agent}</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', color: 'var(--accent-primary)', fontSize: '0.75rem', fontWeight: 600 }}>
          <Check size={14} />
          <span>Completed</span>
        </div>
      </div>

      {/* Tool-specific details */}

      {/* 1. Google Search */}
      {event.tool === 'Google Search' && (
        <div>
          <div style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
            Query: <code style={{ backgroundColor: 'var(--bg-primary)', padding: '0.125rem 0.375rem', borderRadius: '4px', fontFamily: 'var(--font-mono)' }}>{event.query}</code>
          </div>
          <div style={{ backgroundColor: 'var(--bg-primary)', borderRadius: 'var(--radius-sm)', padding: '0.625rem', display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>{event.resultsCount} Top Search Results:</div>
            {event.snippets?.map((snip, idx) => (
              <div key={idx} style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                <span style={{ color: 'var(--accent-blue)' }}>•</span>
                <span>{snip}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. Web Scraper */}
      {event.tool === 'Web Scraper' && (
        <div>
          <div style={{ color: 'var(--text-secondary)', marginBottom: '0.375rem', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
            <span>URL Extracted:</span>
            <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-primary)', fontSize: '0.75rem' }}>{event.url}</span>
          </div>
          <div style={{ backgroundColor: 'var(--bg-primary)', padding: '0.625rem', borderRadius: 'var(--radius-sm)' }}>
            <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
              Title: {event.scrapedTitle}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Word Count: {event.wordCount} words • Headings Extracted: {event.headingsExtracted?.join(', ')}
            </div>
          </div>
        </div>
      )}

      {/* 3. Keyword Analysis */}
      {event.tool === 'Keyword Analysis' && (
        <div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
            Target Topic: <strong style={{ color: 'var(--text-primary)' }}>{event.primaryKeyword}</strong>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.5rem' }}>
            {event.discoveredKeywords?.map((kw, i) => (
              <div key={i} style={{ backgroundColor: 'var(--bg-primary)', padding: '0.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.75rem' }}>{kw.term}</div>
                <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', marginTop: '0.125rem' }}>
                  Vol: {kw.volume} | Diff: {kw.difficulty}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. Competitor Analysis */}
      {event.tool === 'Competitor Analysis' && (
        <div style={{ backgroundColor: 'var(--bg-primary)', padding: '0.625rem', borderRadius: 'var(--radius-sm)' }}>
          <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.375rem', fontSize: '0.75rem' }}>
            Content Gaps Identified:
          </div>
          <ul style={{ paddingLeft: '1.25rem', color: 'var(--text-secondary)', fontSize: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            {event.contentGaps?.map((gap, idx) => (
              <li key={idx}>{gap}</li>
            ))}
          </ul>
        </div>
      )}

    </div>
  );
}
