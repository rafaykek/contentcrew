import React, { useState } from 'react';
import { Building2, Users, Search, RefreshCw, ExternalLink, ChevronDown, ChevronUp, Edit3 } from 'lucide-react';
import OnboardingModal from '../onboarding/OnboardingModal';

export default function MarketingContextPanel({ context, onContextUpdated }) {
  const [activeTab, setActiveTab] = useState('company');
  const [expandedComp, setExpandedComp] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  if (!context) return null;

  const { company, competitors, researchSummary } = context;

  const handleEditComplete = (updatedContext) => {
    setIsEditModalOpen(false);
    if (onContextUpdated) {
      onContextUpdated(updatedContext);
    }
  };

  return (
    <aside style={{
      borderRight: '1px solid var(--border-color)',
      backgroundColor: 'var(--bg-secondary)',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      overflow: 'hidden'
    }}>
      {/* Panel Header */}
      <div style={{
        padding: '1rem 1.25rem',
        borderBottom: '1px solid var(--border-color)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Building2 size={18} style={{ color: 'var(--accent-primary)' }} />
          <h2 style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            Marketing Context
          </h2>
        </div>

        <button
          onClick={() => setIsEditModalOpen(true)}
          className="btn btn-sm btn-outline"
          style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}
          title="Edit Company & Competitor Context"
        >
          <Edit3 size={12} />
          <span>Edit</span>
        </button>
      </div>

      {/* Tabs */}
      <div style={{
        display: 'flex',
        borderBottom: '1px solid var(--border-color)',
        backgroundColor: 'var(--bg-primary)'
      }}>
        <button
          onClick={() => setActiveTab('company')}
          style={{
            flex: 1,
            padding: '0.625rem 0.5rem',
            fontSize: '0.75rem',
            fontWeight: 600,
            color: activeTab === 'company' ? 'var(--accent-primary)' : 'var(--text-muted)',
            borderBottom: activeTab === 'company' ? '2px solid var(--accent-primary)' : '2px solid transparent'
          }}
        >
          Company
        </button>

        <button
          onClick={() => setActiveTab('competitors')}
          style={{
            flex: 1,
            padding: '0.625rem 0.5rem',
            fontSize: '0.75rem',
            fontWeight: 600,
            color: activeTab === 'competitors' ? 'var(--accent-primary)' : 'var(--text-muted)',
            borderBottom: activeTab === 'competitors' ? '2px solid var(--accent-primary)' : '2px solid transparent'
          }}
        >
          Competitors ({competitors?.length || 0})
        </button>

        <button
          onClick={() => setActiveTab('research')}
          style={{
            flex: 1,
            padding: '0.625rem 0.5rem',
            fontSize: '0.75rem',
            fontWeight: 600,
            color: activeTab === 'research' ? 'var(--accent-primary)' : 'var(--text-muted)',
            borderBottom: activeTab === 'research' ? '2px solid var(--accent-primary)' : '2px solid transparent'
          }}
        >
          Research
        </button>
      </div>

      {/* Panel Scrollable Body */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '1.25rem' }}>
        
        {/* Tab 1: Company Profile */}
        {activeTab === 'company' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={{ fontSize: '0.6875rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
                Company Profile
              </label>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '0.25rem' }}>
                {company.name || 'CloudScale AI'}
              </h3>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginTop: '0.375rem', lineHeight: 1.5 }}>
                {company.description || 'Enterprise Agentic AI and Autonomous Infrastructure Automation platform.'}
              </p>
            </div>

            <div style={{
              padding: '0.875rem',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-color)'
            }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                Industry & Segment
              </div>
              <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                {company.industry || 'B2B SaaS / Enterprise Software'}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                Target Audience
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
                {company.targetAudience?.map((aud, i) => (
                  <span key={i} className="badge badge-slate" style={{ fontSize: '0.75rem' }}>
                    {aud}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                Key Products & Services
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.375rem', fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                {(company.products_services || company.products)?.map((prod, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ color: 'var(--accent-primary)' }}>•</span>
                    <span>{prod}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Tab 2: Competitors */}
        {activeTab === 'competitors' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
              Tracked competitors analyzed during content generation:
            </div>

            {competitors?.map((comp) => {
              const isExpanded = expandedComp === comp.id;
              return (
                <div key={comp.id} style={{
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                  overflow: 'hidden'
                }}>
                  <div 
                    onClick={() => setExpandedComp(isExpanded ? null : comp.id)}
                    style={{
                      padding: '0.875rem 1rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer'
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--text-primary)' }}>
                        {comp.name}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <span>{comp.url || 'No URL'}</span>
                        <ExternalLink size={10} />
                      </div>
                    </div>
                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>

                  {isExpanded && (
                    <div style={{
                      padding: '0.875rem 1rem',
                      borderTop: '1px solid var(--border-subtle)',
                      backgroundColor: 'rgba(0,0,0,0.2)',
                      fontSize: '0.8125rem'
                    }}>
                      <div style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                        <strong>Focus:</strong> {comp.focus_area || comp.focusArea || 'Market competitor'}
                      </div>
                      {comp.top_articles && (
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          <strong>Top Articles Scraped:</strong>
                          <ul style={{ paddingLeft: '1rem', marginTop: '0.25rem' }}>
                            {comp.top_articles?.map((art, idx) => (
                              <li key={idx}>{art}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Tab 3: Research Summary */}
        {activeTab === 'research' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{
              padding: '1rem',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-color)'
            }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                Research Intelligence Summary
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div style={{ backgroundColor: 'var(--bg-primary)', padding: '0.625rem', borderRadius: 'var(--radius-sm)' }}>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--accent-primary)' }}>
                    {researchSummary?.articles_analyzed || researchSummary?.articlesAnalyzed || 18}
                  </div>
                  <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>Articles Scraped</div>
                </div>

                <div style={{ backgroundColor: 'var(--bg-primary)', padding: '0.625rem', borderRadius: 'var(--radius-sm)' }}>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--accent-blue)' }}>
                    {researchSummary?.keywords_discovered || researchSummary?.keywordsDiscovered || 45}
                  </div>
                  <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>Keywords Found</div>
                </div>

                <div style={{ backgroundColor: 'var(--bg-primary)', padding: '0.625rem', borderRadius: 'var(--radius-sm)' }}>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--accent-amber)' }}>
                    {researchSummary?.content_gaps_identified || researchSummary?.contentGapsIdentified || 7}
                  </div>
                  <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>Content Gaps</div>
                </div>

                <div style={{ backgroundColor: 'var(--bg-primary)', padding: '0.625rem', borderRadius: 'var(--radius-sm)' }}>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                    {researchSummary?.avg_competitor_word_count || researchSummary?.avgCompetitorWordCount || 2150}
                  </div>
                  <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>Avg Word Count</div>
                </div>
              </div>
            </div>

            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
              <RefreshCw size={12} />
              <span>Last updated: {researchSummary?.last_research_date || 'Just now'}</span>
            </div>
          </div>
        )}

      </div>

      {/* Edit Context Modal Overlay */}
      <OnboardingModal
        isOpen={isEditModalOpen}
        initialContext={context}
        onComplete={handleEditComplete}
      />
    </aside>
  );
}
