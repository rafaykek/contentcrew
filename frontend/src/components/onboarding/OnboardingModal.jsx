import React, { useState } from 'react';
import { Building2, Users, Globe, CheckCircle2, ArrowRight, ArrowLeft, Plus, Trash2, Sparkles } from 'lucide-react';
import { saveMarketingContext } from '../../services/api';

export default function OnboardingModal({ isOpen, onComplete, initialContext }) {
  const [step, setStep] = useState(1);

  // Form State
  const [companyName, setCompanyName] = useState(initialContext?.company?.name || 'CloudScale AI');
  const [description, setDescription] = useState(initialContext?.company?.description || 'Enterprise Agentic AI & Autonomous Infrastructure Automation Platform.');
  const [industry, setIndustry] = useState(initialContext?.company?.industry || 'B2B SaaS / Enterprise Software');
  const [targetAudienceInput, setTargetAudienceInput] = useState('');
  const [targetAudience, setTargetAudience] = useState(initialContext?.company?.targetAudience || ['VP of Engineering', 'DevOps Leads', 'Solutions Architects']);
  const [productsInput, setProductsInput] = useState('');
  const [products, setProducts] = useState(initialContext?.company?.products || ['Agentic Orchestrator', 'Workflow Studio Engine']);

  // Competitors State
  const [competitors, setCompetitors] = useState(initialContext?.competitors || [
    { id: 'comp-1', name: 'AgentFlow Systems', url: 'https://agentflow.io', focus_area: 'Workflow bot builders' },
    { id: 'comp-2', name: 'LangCraft Inc', url: 'https://langcraft.com', focus_area: 'Multi-agent frameworks' }
  ]);
  const [newCompName, setNewCompName] = useState('');
  const [newCompUrl, setNewCompUrl] = useState('');
  const [newCompFocus, setNewCompFocus] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  if (!isOpen) return null;

  const handleAddAudience = () => {
    if (targetAudienceInput.trim()) {
      setTargetAudience([...targetAudience, targetAudienceInput.trim()]);
      setTargetAudienceInput('');
    }
  };

  const handleRemoveAudience = (idx) => {
    setTargetAudience(targetAudience.filter((_, i) => i !== idx));
  };

  const handleAddProduct = () => {
    if (productsInput.trim()) {
      setProducts([...products, productsInput.trim()]);
      setProductsInput('');
    }
  };

  const handleRemoveProduct = (idx) => {
    setProducts(products.filter((_, i) => i !== idx));
  };

  const handleAddCompetitor = () => {
    if (newCompName.trim()) {
      setCompetitors([
        ...competitors,
        {
          id: 'comp-' + Date.now(),
          name: newCompName.trim(),
          url: newCompUrl.trim(),
          focus_area: newCompFocus.trim()
        }
      ]);
      setNewCompName('');
      setNewCompUrl('');
      setNewCompFocus('');
    }
  };

  const handleRemoveCompetitor = (id) => {
    setCompetitors(competitors.filter(c => c.id !== id));
  };

  const handleSubmitOnboarding = async () => {
    if (!companyName.trim()) {
      setErrorMsg('Company name is required.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg(null);

    const payload = {
      onboarding_completed: true,
      company: {
        name: companyName,
        description: description,
        industry: industry,
        target_audience: targetAudience,
        products_services: products,
        brand_tone: 'Authoritative, technical'
      },
      competitors: competitors
    };

    try {
      const updated = await saveMarketingContext(payload);
      setIsSubmitting(false);
      if (onComplete) onComplete(updated.context || payload);
    } catch (err) {
      setIsSubmitting(false);
      setErrorMsg(err.message || 'Failed to save context. Please check backend API connection.');
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(9, 13, 22, 0.9)',
      backdropFilter: 'blur(10px)',
      zIndex: 200,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem'
    }}>
      <div style={{
        backgroundColor: 'var(--bg-secondary)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-lg)',
        width: '100%',
        maxWidth: '620px',
        boxShadow: 'var(--shadow-lg)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Onboarding Header */}
        <div style={{
          padding: '1.5rem',
          borderBottom: '1px solid var(--border-color)',
          backgroundColor: 'var(--bg-primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--accent-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#000'
            }}>
              <Sparkles size={18} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                Setup Marketing Context
              </h2>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Step {step} of 4 — ContentCrew AI Agent Configuration
              </div>
            </div>
          </div>

          <span className="badge badge-emerald">Onboarding</span>
        </div>

        {/* Progress Line */}
        <div style={{ height: '3px', backgroundColor: 'var(--border-color)', width: '100%' }}>
          <div style={{
            height: '100%',
            backgroundColor: 'var(--accent-primary)',
            width: `${(step / 4) * 100}%`,
            transition: 'width 0.3s ease'
          }} />
        </div>

        {/* Body Content */}
        <div style={{ padding: '2rem', flex: 1, overflowY: 'auto' }}>
          
          {errorMsg && (
            <div style={{
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'rgba(244, 63, 94, 0.12)',
              border: '1px solid rgba(244, 63, 94, 0.3)',
              color: 'var(--accent-rose)',
              fontSize: '0.8125rem',
              marginBottom: '1.25rem'
            }}>
              {errorMsg}
            </div>
          )}

          {/* STEP 1: Company Profile */}
          {step === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.375rem' }}>
                  Your Company Profile
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                  Provide basic details about your company so ContentCrew agents can align research and tone.
                </p>
              </div>

              <div>
                <label style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '0.375rem' }}>
                  Company Name *
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. CloudScale AI"
                  style={{
                    width: '100%',
                    backgroundColor: 'var(--bg-input)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    padding: '0.625rem 0.875rem',
                    color: 'var(--text-primary)',
                    fontSize: '0.875rem',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '0.375rem' }}>
                  Company Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  placeholder="What does your company build or sell?"
                  style={{
                    width: '100%',
                    backgroundColor: 'var(--bg-input)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    padding: '0.625rem 0.875rem',
                    color: 'var(--text-primary)',
                    fontSize: '0.875rem',
                    outline: 'none',
                    resize: 'vertical'
                  }}
                />
              </div>
            </div>
          )}

          {/* STEP 2: Industry, Target Audience & Products */}
          {step === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.375rem' }}>
                  Industry & Audience
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                  Define your target personas and primary products to refine keyword intent.
                </p>
              </div>

              <div>
                <label style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '0.375rem' }}>
                  Industry / Sector
                </label>
                <input
                  type="text"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  placeholder="e.g. B2B SaaS / Enterprise Software"
                  style={{
                    width: '100%',
                    backgroundColor: 'var(--bg-input)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    padding: '0.625rem 0.875rem',
                    color: 'var(--text-primary)',
                    fontSize: '0.875rem',
                    outline: 'none'
                  }}
                />
              </div>

              {/* Target Audience List */}
              <div>
                <label style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '0.375rem' }}>
                  Target Audience Personas
                </label>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <input
                    type="text"
                    value={targetAudienceInput}
                    onChange={(e) => setTargetAudienceInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddAudience())}
                    placeholder="Add persona (e.g. DevOps Leads)"
                    style={{
                      flex: 1,
                      backgroundColor: 'var(--bg-input)',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-md)',
                      padding: '0.5rem 0.75rem',
                      color: 'var(--text-primary)',
                      fontSize: '0.8125rem',
                      outline: 'none'
                    }}
                  />
                  <button onClick={handleAddAudience} className="btn btn-sm btn-secondary">
                    <Plus size={14} />
                    <span>Add</span>
                  </button>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
                  {targetAudience.map((aud, i) => (
                    <span key={i} className="badge badge-blue" style={{ fontSize: '0.75rem', paddingRight: '0.25rem' }}>
                      {aud}
                      <button onClick={() => handleRemoveAudience(i)} style={{ marginLeft: '0.25rem', color: 'var(--accent-rose)' }}>×</button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Competitors */}
          {step === 3 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.375rem' }}>
                  Competitor Configuration
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                  Add key competitors. The Analysis Agent will scrape public articles from these domains.
                </p>
              </div>

              {/* Add Competitor Form */}
              <div style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                padding: '1rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem'
              }}>
                <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  Add New Competitor
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                  <input
                    type="text"
                    value={newCompName}
                    onChange={(e) => setNewCompName(e.target.value)}
                    placeholder="Competitor Name *"
                    style={{ backgroundColor: 'var(--bg-input)', border: '1px solid var(--border-color)', padding: '0.5rem', borderRadius: 'var(--radius-sm)', color: '#fff', fontSize: '0.8125rem' }}
                  />
                  <input
                    type="text"
                    value={newCompUrl}
                    onChange={(e) => setNewCompUrl(e.target.value)}
                    placeholder="Website (e.g. https://agentflow.io)"
                    style={{ backgroundColor: 'var(--bg-input)', border: '1px solid var(--border-color)', padding: '0.5rem', borderRadius: 'var(--radius-sm)', color: '#fff', fontSize: '0.8125rem' }}
                  />
                </div>
                <button onClick={handleAddCompetitor} className="btn btn-sm btn-secondary" style={{ alignSelf: 'flex-start' }}>
                  <Plus size={14} />
                  <span>Add Competitor</span>
                </button>
              </div>

              {/* Competitors List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {competitors.map((comp) => (
                  <div key={comp.id} style={{
                    padding: '0.75rem 1rem',
                    backgroundColor: 'var(--bg-primary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '0.8125rem'
                  }}>
                    <div>
                      <strong style={{ color: 'var(--text-primary)' }}>{comp.name}</strong>
                      <span style={{ color: 'var(--text-muted)', marginLeft: '0.5rem', fontSize: '0.75rem' }}>{comp.url}</span>
                    </div>
                    <button onClick={() => handleRemoveCompetitor(comp.id)} style={{ color: 'var(--accent-rose)' }}>
                      <Trash2 size={15} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4: Review & Submit */}
          {step === 4 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.375rem' }}>
                  Review & Confirm Context
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                  Review your saved company profile and competitor list before launching the workspace.
                </p>
              </div>

              <div style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem',
                fontSize: '0.84375rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.875rem'
              }}>
                <div>
                  <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Company Name: </span>
                  <strong style={{ color: 'var(--text-primary)' }}>{companyName}</strong>
                </div>

                <div>
                  <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Industry: </span>
                  <span style={{ color: 'var(--text-primary)' }}>{industry}</span>
                </div>

                <div>
                  <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Target Audience: </span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem', marginTop: '0.25rem' }}>
                    {targetAudience.map((aud, idx) => (
                      <span key={idx} className="badge badge-slate" style={{ fontSize: '0.75rem' }}>{aud}</span>
                    ))}
                  </div>
                </div>

                <div>
                  <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Configured Competitors ({competitors.length}): </span>
                  <ul style={{ paddingLeft: '1.25rem', marginTop: '0.25rem', color: 'var(--text-secondary)' }}>
                    {competitors.map((c) => (
                      <li key={c.id}>{c.name} ({c.url || 'No URL'})</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer Navigation Actions */}
        <div style={{
          padding: '1.25rem 2rem',
          borderTop: '1px solid var(--border-color)',
          backgroundColor: 'var(--bg-primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          {step > 1 ? (
            <button onClick={() => setStep(step - 1)} className="btn btn-outline btn-sm">
              <ArrowLeft size={14} />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {step < 4 ? (
            <button onClick={() => setStep(step + 1)} className="btn btn-primary btn-sm">
              <span>Continue</span>
              <ArrowRight size={14} />
            </button>
          ) : (
            <button
              onClick={handleSubmitOnboarding}
              disabled={isSubmitting}
              className="btn btn-primary btn-sm"
            >
              <CheckCircle2 size={15} />
              <span>{isSubmitting ? 'Saving Context...' : 'Finish Setup & Enter Workspace'}</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
