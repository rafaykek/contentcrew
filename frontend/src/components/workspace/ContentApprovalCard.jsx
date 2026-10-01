import React, { useState } from 'react';
import { FileCheck, Edit3, RefreshCw, Send, CheckCircle2 } from 'lucide-react';

export default function ContentApprovalCard({ onOpenEditor, onRegenerate, onPublish, isPublished }) {
  const [publishedState, setPublishedState] = useState(isPublished || false);

  const handlePublishClick = async () => {
    setPublishedState(true);
    if (onPublish) {
      await onPublish();
    }
  };

  return (
    <div style={{
      backgroundColor: 'var(--bg-card)',
      border: publishedState ? '1px solid var(--accent-primary)' : '1px solid var(--accent-amber)',
      borderRadius: 'var(--radius-lg)',
      padding: '1.25rem 1.5rem',
      marginBottom: '1.25rem',
      boxShadow: 'var(--shadow-md)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: publishedState ? 'var(--accent-primary-light)' : 'var(--accent-amber-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: publishedState ? 'var(--accent-primary)' : 'var(--accent-amber)'
          }}>
            <FileCheck size={18} />
          </div>
          <div>
            <div style={{ fontSize: '0.875rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              Human Approval Checkpoint 2: Generated Content Ready
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              POST /approval/content & POST /blog
            </div>
          </div>
        </div>

        {publishedState ? (
          <span className="badge badge-emerald">Published</span>
        ) : (
          <span className="badge badge-amber">Ready for Review</span>
        )}
      </div>

      <p style={{ fontSize: '0.84375rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
        The Generation Agent has authored the draft blog according to your approved research strategy. Review the article in the editor, make adjustments, or authorize publication.
      </p>

      {!publishedState ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', flexWrap: 'wrap' }}>
          <button
            onClick={onOpenEditor}
            className="btn btn-secondary"
            style={{ flex: 1 }}
          >
            <Edit3 size={15} />
            <span>Open Blog Editor</span>
          </button>

          <button
            onClick={onRegenerate}
            className="btn btn-outline"
          >
            <RefreshCw size={15} />
            <span>Regenerate</span>
          </button>

          <button
            onClick={handlePublishClick}
            className="btn btn-primary"
            style={{ flex: 1 }}
          >
            <Send size={15} />
            <span>Approve & Publish Blog</span>
          </button>
        </div>
      ) : (
        <div style={{
          fontSize: '0.8125rem',
          color: 'var(--accent-primary)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontWeight: 600
        }}>
          <CheckCircle2 size={16} />
          <span>Blog published successfully! Accessible at /blogs page and POST /blog endpoint.</span>
        </div>
      )}
    </div>
  );
}
