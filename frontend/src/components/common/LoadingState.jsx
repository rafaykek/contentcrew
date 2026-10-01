import React from 'react';

export function LoadingState({ message = 'Analyzing workflow state...', subtext }) {
  return (
    <div style={{
      padding: '2.5rem 1.5rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      color: 'var(--text-secondary)'
    }}>
      <div style={{
        width: '32px',
        height: '32px',
        border: '3px solid var(--border-color)',
        borderTopColor: 'var(--accent-primary)',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
        marginBottom: '1rem'
      }} />
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
      <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.9375rem' }}>
        {message}
      </div>
      {subtext && (
        <div style={{ fontSize: '0.8125rem', marginTop: '0.375rem', color: 'var(--text-muted)' }}>
          {subtext}
        </div>
      )}
    </div>
  );
}

export function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div style={{
      padding: '3rem 1.5rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      border: '1px dashed var(--border-color)',
      borderRadius: 'var(--radius-lg)',
      backgroundColor: 'rgba(15, 23, 42, 0.4)'
    }}>
      {Icon && (
        <div style={{
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1rem',
          color: 'var(--text-muted)'
        }}>
          <Icon size={22} />
        </div>
      )}
      <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.375rem' }}>
        {title}
      </h3>
      <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', maxWidth: '340px', marginBottom: action ? '1.25rem' : 0 }}>
        {description}
      </p>
      {action}
    </div>
  );
}

export function ErrorAlert({ message, retryAction }) {
  return (
    <div style={{
      padding: '1rem 1.25rem',
      borderRadius: 'var(--radius-md)',
      backgroundColor: 'rgba(244, 63, 94, 0.1)',
      border: '1px solid rgba(244, 63, 94, 0.25)',
      color: 'var(--accent-rose)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '1rem',
      fontSize: '0.875rem',
      margin: '1rem 0'
    }}>
      <div>
        <strong>Error: </strong>{message}
      </div>
      {retryAction && (
        <button 
          onClick={retryAction}
          className="btn btn-sm btn-outline"
          style={{ borderColor: 'rgba(244, 63, 94, 0.3)', color: 'var(--accent-rose)' }}
        >
          Retry
        </button>
      )}
    </div>
  );
}
