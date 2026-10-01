import React from 'react';
import { ShieldCheck, CheckCircle2, Clock, Circle, ArrowRight } from 'lucide-react';

export default function SupervisorPlanCard({ event }) {
  if (!event || event.type !== 'SUPERVISOR_PLAN') return null;

  return (
    <div style={{
      backgroundColor: 'var(--bg-card)',
      border: '1px solid var(--border-color)',
      borderRadius: 'var(--radius-md)',
      padding: '1.25rem',
      marginBottom: '1rem',
      boxShadow: 'var(--shadow-sm)'
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.875rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{
            width: '24px',
            height: '24px',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: 'var(--accent-primary-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--accent-primary)'
          }}>
            <ShieldCheck size={14} />
          </div>
          <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            SUPERVISOR AGENT
          </span>
        </div>
        <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
          {event.timestamp}
        </span>
      </div>

      <h4 style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
        {event.title}
      </h4>

      {/* Steps List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {event.plan?.map((item) => {
          let statusIcon = <Circle size={14} style={{ color: 'var(--text-muted)' }} />;
          let statusStyle = { color: 'var(--text-muted)' };

          if (item.status === 'completed') {
            statusIcon = <CheckCircle2 size={15} style={{ color: 'var(--accent-primary)' }} />;
            statusStyle = { color: 'var(--text-primary)', textDecoration: 'none' };
          } else if (item.status === 'in_progress') {
            statusIcon = <Clock size={15} style={{ color: 'var(--accent-blue)', animation: 'pulseGlow 1.5s infinite' }} />;
            statusStyle = { color: 'var(--accent-blue)', fontWeight: 600 };
          }

          return (
            <div key={item.step} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.625rem',
              fontSize: '0.8125rem',
              padding: '0.25rem 0'
            }}>
              <div>{statusIcon}</div>
              <div style={statusStyle}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', marginRight: '0.375rem', opacity: 0.7 }}>
                  Step {item.step}:
                </span>
                {item.text}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
