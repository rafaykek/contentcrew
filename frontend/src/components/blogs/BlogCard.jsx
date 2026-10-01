import React from 'react';
import { Calendar, Clock, Tag, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export default function BlogCard({ blog, onReadMore }) {
  return (
    <article style={{
      backgroundColor: 'var(--bg-card)',
      border: '1px solid var(--border-color)',
      borderRadius: 'var(--radius-lg)',
      padding: '1.5rem',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      transition: 'all var(--transition-normal)',
      cursor: 'pointer'
    }}
    onClick={() => onReadMore(blog)}
    className="blog-card-item"
    >
      <div>
        {/* Card Header Tags */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1rem',
          fontSize: '0.75rem'
        }}>
          <span className="badge badge-emerald">
            <Tag size={12} />
            <span>{blog.category || 'Marketing'}</span>
          </span>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', color: 'var(--text-muted)' }}>
            <Clock size={13} />
            <span>{blog.readTime || '5 min read'}</span>
          </div>
        </div>

        {/* Title */}
        <h3 style={{
          fontSize: '1.1875rem',
          fontWeight: 700,
          color: 'var(--text-primary)',
          lineHeight: 1.4,
          marginBottom: '0.75rem'
        }}>
          {blog.title}
        </h3>

        {/* Excerpt */}
        <p style={{
          fontSize: '0.875rem',
          color: 'var(--text-secondary)',
          lineHeight: 1.6,
          marginBottom: '1.25rem',
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {blog.excerpt}
        </p>
      </div>

      {/* Footer Info */}
      <div style={{
        borderTop: '1px solid var(--border-subtle)',
        paddingTop: '1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: '0.75rem',
        color: 'var(--text-muted)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
          <Calendar size={13} />
          <span>{blog.date}</span>
        </div>

        <button 
          className="btn btn-sm btn-outline"
          style={{ padding: '0.25rem 0.625rem', fontSize: '0.75rem' }}
          onClick={(e) => {
            e.stopPropagation();
            onReadMore(blog);
          }}
        >
          <span>Read Article</span>
          <ArrowUpRight size={13} />
        </button>
      </div>
    </article>
  );
}
