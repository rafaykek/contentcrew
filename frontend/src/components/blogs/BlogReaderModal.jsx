import React from 'react';
import { X, Calendar, Clock, Tag, CheckCircle2, Share2, Sparkles } from 'lucide-react';

export default function BlogReaderModal({ blog, onClose }) {
  if (!blog) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(9, 13, 22, 0.85)',
      backdropFilter: 'blur(8px)',
      zIndex: 100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem 1rem'
    }}
    onClick={onClose}
    >
      <div style={{
        backgroundColor: 'var(--bg-secondary)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-lg)',
        width: '100%',
        maxWidth: '760px',
        maxHeight: '90vh',
        overflowY: 'auto',
        boxShadow: 'var(--shadow-lg)',
        position: 'relative'
      }}
      onClick={(e) => e.stopPropagation()}
      >
        {/* Top Sticky Header */}
        <div style={{
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          backgroundColor: 'var(--bg-secondary)',
          zIndex: 10
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span className="badge badge-emerald">Published Blog</span>
            <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>ID: {blog.id}</span>
          </div>

          <button 
            onClick={onClose}
            className="btn btn-sm btn-outline"
            style={{ borderRadius: '50%', padding: '0.375rem', width: '32px', height: '32px' }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Content Container */}
        <div style={{ padding: '2rem 2.5rem' }}>
          
          {/* Article Header Meta */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
            <span className="badge badge-blue">{blog.category}</span>
            <span>•</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
              <Calendar size={14} />
              <span>{blog.date}</span>
            </div>
            <span>•</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
              <Clock size={14} />
              <span>{blog.readTime}</span>
            </div>
          </div>

          {/* Title */}
          <h1 style={{
            fontSize: '2rem',
            fontWeight: 800,
            lineHeight: 1.25,
            color: 'var(--text-primary)',
            marginBottom: '1.25rem'
          }}>
            {blog.title}
          </h1>

          {/* Author Badge */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.625rem',
            padding: '0.75rem 1rem',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            marginBottom: '2rem',
            fontSize: '0.8125rem'
          }}>
            <Sparkles size={16} style={{ color: 'var(--accent-primary)' }} />
            <div>
              <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                Authored & Published by {blog.author || 'ContentCrew Generation Agent'}
              </div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                Verified by Human Marketing Supervisor Checkpoint
              </div>
            </div>
          </div>

          {/* Target Keywords */}
          {blog.seoKeywords && (
            <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Keywords:</span>
              {blog.seoKeywords.map((kw, idx) => (
                <span key={idx} className="badge badge-slate" style={{ fontSize: '0.75rem' }}>
                  {kw}
                </span>
              ))}
            </div>
          )}

          {/* Article Text Rendering */}
          <div style={{
            fontSize: '0.9375rem',
            lineHeight: 1.7,
            color: '#cbd5e1',
            whiteSpace: 'pre-wrap',
            fontFamily: 'var(--font-sans)'
          }}>
            {blog.content}
          </div>

        </div>

        {/* Modal Footer */}
        <div style={{
          padding: '1.25rem 2.5rem',
          borderTop: '1px solid var(--border-color)',
          backgroundColor: 'var(--bg-primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-primary)', fontSize: '0.8125rem' }}>
            <CheckCircle2 size={16} />
            <span>Public API Endpoint: GET /blog/{blog.id}</span>
          </div>

          <button onClick={onClose} className="btn btn-sm btn-secondary">
            Close Article
          </button>
        </div>

      </div>
    </div>
  );
}
