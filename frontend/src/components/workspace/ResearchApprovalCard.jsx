import React, { useState } from 'react';
import { ShieldAlert, CheckCircle2, Sliders, ArrowRight, Check } from 'lucide-react';

export default function ResearchApprovalCard({ event, onApprove, onModify }) {
  const [isApproved, setIsApproved] = useState(false);
  const [isModifying, setIsModifying] = useState(false);

  if (!event || event.approvalType !== 'RESEARCH_STRATEGY') return null;

  const summary = event.summary || {};

  const handleApprove = () => {
    setIsApproved(true);
    if (onApprove) onApprove(summary);
  };

  return (
    <div style={{
      backgroundColor: 'var(--bg-card)',
      border: isApproved ? '1px solid var(--accent-primary)' : '1px solid var(--accent-amber)',
      borderRadius: 'var(--radius-lg)',
      padding: '1.5rem',
      marginBottom: '1.25rem',
      boxShadow: 'var(--shadow-md)'
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: isApproved ? 'var(--accent-primary-light)' : 'var(--accent-amber-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: isApproved ? 'var(--accent-primary)' : 'var(--accent-amber)'
          }}>
            {isApproved ? <CheckCircle2 size={18} /> : <ShieldAlert size={18} />}
          </div>
          <div>
            <div style={{ fontSize: '0.875rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              Human Approval Checkpoint 1: Research Strategy
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              POST /approval/research
            </div>
          </div>
        </div>

        {isApproved ? (
          <span className="badge badge-emerald">
            <Check size={12} /> Approved
          </span>
        ) : (
          <span className="badge badge-amber">Action Required</span>
        )}
      </div>

      {/* Strategy Details Summary */}
      <div style={{
        backgroundColor: 'var(--bg-primary)',
        borderRadius: 'var(--radius-md)',
        padding: '1rem',
        marginBottom: '1.25rem',
        fontSize: '0.8125rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem'
      }}>
        <div>
          <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Topic: </span>
          <span style={{ color: 'var(--text-primary)', fontWeight: 700 }}>{summary.topic}</span>
        </div>

        <div>
          <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Target Keywords: </span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem', marginTop: '0.25rem' }}>
            {summary.primaryKeywords?.map((kw, i) => (
              <span key={i} className="badge badge-blue" style={{ fontSize: '0.75rem' }}>
                {kw}
              </span>
            ))}
          </div>
        </div>

        <div>
          <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Recommended Content Structure: </span>
          <ol style={{ paddingLeft: '1.25rem', marginTop: '0.375rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            {summary.recommendedOutline?.map((heading, idx) => (
              <li key={idx}>{heading}</li>
            ))}
          </ol>
        </div>
      </div>

      {/* Action Buttons */}
      {!isApproved ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            onClick={handleApprove}
            className="btn btn-primary"
            style={{ flex: 1 }}
          >
            <span>Approve & Continue to Generation</span>
            <ArrowRight size={16} />
          </button>

          <button
            onClick={() => {
              setIsModifying(!isModifying);
              if (onModify) onModify();
            }}
            className="btn btn-outline"
          >
            <Sliders size={15} />
            <span>Modify Plan</span>
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
          <span>Research strategy approved! Delegating draft creation to Generation Agent...</span>
        </div>
      )}
    </div>
  );
}
