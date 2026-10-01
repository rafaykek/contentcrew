import React from 'react';
import { Search, BarChart2, ShieldCheck, PenTool, Eye, SendHorizontal } from 'lucide-react';

export default function WorkflowSection() {
  const steps = [
    {
      num: '01',
      title: 'Research',
      icon: Search,
      agent: 'Analysis Agent',
      desc: 'Executes live web searches and extracts public competitor content, headings, and topic structures.',
      color: 'var(--accent-blue)'
    },
    {
      num: '02',
      title: 'Analyze',
      icon: BarChart2,
      agent: 'Analysis Agent',
      desc: 'Identifies keyword search intent, content coverage gaps, and structural recommendations.',
      color: 'var(--accent-blue)'
    },
    {
      num: '03',
      title: 'Approve',
      icon: ShieldCheck,
      agent: 'Supervisor Gate',
      desc: 'Human-in-the-loop checkpoint: Review target keywords, outline, and strategy before writing.',
      color: 'var(--accent-amber)',
      highlight: true
    },
    {
      num: '04',
      title: 'Generate',
      icon: PenTool,
      agent: 'Generation Agent',
      desc: 'Transforms approved research into a comprehensive, high-intent technical blog draft.',
      color: 'var(--accent-primary)'
    },
    {
      num: '05',
      title: 'Review',
      icon: Eye,
      agent: 'Supervisor Gate',
      desc: 'Inspect generated content in the dynamic editor, adjust sections, or trigger targeted regeneration.',
      color: 'var(--accent-amber)',
      highlight: true
    },
    {
      num: '06',
      title: 'Publish',
      icon: SendHorizontal,
      agent: 'Publishing Tool',
      desc: 'One-click authorization sends the finalized blog to CMS endpoints and public listing.',
      color: 'var(--accent-primary)'
    }
  ];

  return (
    <section style={{
      padding: '4rem 0',
      backgroundColor: 'var(--bg-secondary)',
      borderTop: '1px solid var(--border-color)',
      borderBottom: '1px solid var(--border-color)'
    }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 3.5rem auto' }}>
          <div style={{
            fontSize: '0.75rem',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--accent-primary)',
            marginBottom: '0.5rem'
          }}>
            Agentic Orchestration Model
          </div>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
            How ContentCrew Operates
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', lineHeight: 1.6 }}>
            ContentCrew is not a simple chatbot. It is a multi-agent workflow system designed with human verification built directly into the loop.
          </p>
        </div>

        {/* Workflow Diagram Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.25rem'
        }}>
          {steps.map((step) => {
            const IconComponent = step.icon;
            return (
              <div key={step.num} style={{
                backgroundColor: 'var(--bg-card)',
                border: step.highlight ? '1px solid rgba(245, 158, 11, 0.4)' : '1px solid var(--border-color)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.5rem',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'transform var(--transition-fast)'
              }}>
                <div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '1rem'
                  }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid var(--border-color)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: step.color
                    }}>
                      <IconComponent size={20} />
                    </div>

                    <span style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.875rem',
                      fontWeight: 700,
                      color: 'var(--text-muted)'
                    }}>
                      {step.num}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.375rem' }}>
                    {step.title}
                  </h3>

                  <div style={{
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: step.color,
                    marginBottom: '0.75rem',
                    display: 'inline-block',
                    padding: '0.15rem 0.5rem',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'rgba(255, 255, 255, 0.03)'
                  }}>
                    {step.agent}
                  </div>

                  <p style={{ fontSize: '0.84375rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
