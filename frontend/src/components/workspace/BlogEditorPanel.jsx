import React, { useState, useEffect } from 'react';
import { FileText, Edit3, Eye, RefreshCw, Send, CheckCircle2, Sparkles, Tag, ShieldCheck, Copy } from 'lucide-react';
import { EmptyState } from '../common/EmptyState';
import { generatedBlogMockDraft } from '../../services/mockData';

export default function BlogEditorPanel({ draftBlog, onPublish, onRegenerate }) {
  const [currentDraft, setCurrentDraft] = useState(draftBlog || null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedContent, setEditedContent] = useState('');
  const [isPublished, setIsPublished] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    if (draftBlog) {
      setCurrentDraft(draftBlog);
      setEditedTitle(draftBlog.title || '');
      setEditedContent(draftBlog.content || '');
    }
  }, [draftBlog]);

  const handleSaveEdits = () => {
    setCurrentDraft((prev) => ({
      ...prev,
      title: editedTitle,
      content: editedContent
    }));
    setIsEditing(false);
    showToast('Edits saved successfully!');
  };

  const handlePublishClick = async () => {
    setIsPublished(true);
    if (onPublish) {
      await onPublish(currentDraft || generatedBlogMockDraft);
    }
    showToast('Blog successfully published to POST /blog!');
  };

  const handleLoadDemoDraft = () => {
    setCurrentDraft(generatedBlogMockDraft);
    setEditedTitle(generatedBlogMockDraft.title);
    setEditedContent(generatedBlogMockDraft.content);
    showToast('Loaded demo draft for editor testing!');
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <aside style={{
      borderLeft: '1px solid var(--border-color)',
      backgroundColor: 'var(--bg-secondary)',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      overflow: 'hidden',
      position: 'relative'
    }}>
      {/* Toast notification */}
      {toastMessage && (
        <div style={{
          position: 'absolute',
          top: '72px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: 'var(--accent-primary)',
          color: '#000',
          padding: '0.5rem 1rem',
          borderRadius: 'var(--radius-md)',
          fontWeight: 700,
          fontSize: '0.8125rem',
          boxShadow: 'var(--shadow-lg)',
          zIndex: 60,
          display: 'flex',
          alignItems: 'center',
          gap: '0.375rem'
        }}>
          <CheckCircle2 size={16} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Editor Header */}
      <div style={{
        padding: '1rem 1.25rem',
        borderBottom: '1px solid var(--border-color)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <FileText size={18} style={{ color: 'var(--accent-primary)' }} />
          <h2 style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            Dynamic Blog Editor
          </h2>
        </div>

        {currentDraft && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`btn btn-sm ${isEditing ? 'btn-primary' : 'btn-outline'}`}
            >
              <Edit3 size={13} />
              <span>{isEditing ? 'Preview' : 'Edit'}</span>
            </button>
          </div>
        )}
      </div>

      {/* Main Body */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '1.25rem' }}>
        
        {/* Empty State */}
        {!currentDraft ? (
          <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <EmptyState
              icon={FileText}
              title="Your generated blog will appear here"
              description="Once ContentCrew completes the research and generation workflow, your content will appear in this editor."
              action={
                <button
                  onClick={handleLoadDemoDraft}
                  className="btn btn-sm btn-secondary"
                  style={{ marginTop: '1rem' }}
                >
                  <Sparkles size={14} style={{ color: 'var(--accent-primary)' }} />
                  <span>Preview Demo Draft</span>
                </button>
              }
            />
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            
            {/* Metadata Card */}
            <div style={{
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              padding: '0.875rem 1rem',
              fontSize: '0.75rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="badge badge-emerald">Generation Agent Draft</span>
                <span style={{ color: 'var(--text-muted)' }}>{currentDraft.readTime}</span>
              </div>

              <div style={{ color: 'var(--text-secondary)' }}>
                <strong>Target Keywords: </strong>
                {currentDraft.seoKeywords?.join(', ')}
              </div>

              <div style={{ color: 'var(--text-secondary)' }}>
                <strong>Readability: </strong> {currentDraft.readabilityScore || '94/100 (Grade 11 Technical)'}
              </div>
            </div>

            {/* Editable Title or Static Title */}
            {isEditing ? (
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.375rem' }}>
                  Blog Title
                </label>
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  style={{
                    width: '100%',
                    backgroundColor: 'var(--bg-input)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '0.625rem',
                    color: 'var(--text-primary)',
                    fontSize: '1rem',
                    fontWeight: 700,
                    outline: 'none'
                  }}
                />
              </div>
            ) : (
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.3 }}>
                {currentDraft.title}
              </h2>
            )}

            {/* Subtitle */}
            {currentDraft.subtitle && !isEditing && (
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5, fontStyle: 'italic' }}>
                {currentDraft.subtitle}
              </p>
            )}

            {/* Editable Content Textarea or Formatted Preview */}
            {isEditing ? (
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.375rem' }}>
                  Markdown Content Editor
                </label>
                <textarea
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                  rows={18}
                  style={{
                    width: '100%',
                    backgroundColor: 'var(--bg-input)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '0.75rem',
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.8125rem',
                    lineHeight: 1.6,
                    outline: 'none',
                    resize: 'vertical'
                  }}
                />
                <button
                  onClick={handleSaveEdits}
                  className="btn btn-sm btn-primary"
                  style={{ marginTop: '0.75rem' }}
                >
                  Save Draft Changes
                </button>
              </div>
            ) : (
              <div style={{
                backgroundColor: 'var(--bg-primary)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem',
                fontSize: '0.875rem',
                lineHeight: 1.6,
                color: '#cbd5e1',
                whiteSpace: 'pre-wrap',
                fontFamily: 'var(--font-sans)'
              }}>
                {currentDraft.content}
              </div>
            )}

          </div>
        )}

      </div>

      {/* Editor Bottom Actions Bar */}
      {currentDraft && (
        <div style={{
          padding: '1rem 1.25rem',
          borderTop: '1px solid var(--border-color)',
          backgroundColor: 'var(--bg-primary)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.625rem'
        }}>
          {!isPublished ? (
            <>
              <button
                onClick={handlePublishClick}
                className="btn btn-primary"
                style={{ flex: 1 }}
              >
                <Send size={15} />
                <span>Publish Blog</span>
              </button>

              <button
                onClick={() => {
                  if (onRegenerate) onRegenerate();
                  showToast('Regeneration requested from Generation Agent!');
                }}
                className="btn btn-outline btn-sm"
                title="Regenerate Draft"
              >
                <RefreshCw size={14} />
              </button>
            </>
          ) : (
            <div style={{
              width: '100%',
              padding: '0.625rem',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--accent-primary-light)',
              color: 'var(--accent-primary)',
              textAlign: 'center',
              fontWeight: 700,
              fontSize: '0.8125rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.375rem'
            }}>
              <CheckCircle2 size={16} />
              <span>Published & Saved to Database</span>
            </div>
          )}
        </div>
      )}
    </aside>
  );
}
