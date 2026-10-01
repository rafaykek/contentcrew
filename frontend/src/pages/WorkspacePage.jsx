import React, { useState, useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import MarketingContextPanel from '../components/workspace/MarketingContextPanel';
import ChatAgentActivityPanel from '../components/workspace/ChatAgentActivityPanel';
import BlogEditorPanel from '../components/workspace/BlogEditorPanel';
import OnboardingModal from '../components/onboarding/OnboardingModal';
import { getMarketingContext } from '../services/api';
import { LoadingState } from '../components/common/LoadingState';

export default function WorkspacePage({ onNavigate, onPublishSuccess }) {
  const [context, setContext] = useState(null);
  const [loadingContext, setLoadingContext] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [workflowStatus, setWorkflowStatus] = useState('IDLE');
  const [generatedDraft, setGeneratedDraft] = useState(null);
  const [mobileTab, setMobileTab] = useState('chat');

  useEffect(() => {
    async function loadContext() {
      setLoadingContext(true);
      const data = await getMarketingContext();
      setContext(data);
      if (!data || data.onboarding_completed === false) {
        setShowOnboarding(true);
      }
      setLoadingContext(false);
    }
    loadContext();
  }, []);

  const handleOnboardingComplete = (newContext) => {
    setShowOnboarding(false);
    setContext(newContext);
  };

  const handleDraftGenerated = (draft) => {
    setGeneratedDraft(draft);
  };

  const handleBlogPublished = (publishedBlog) => {
    if (onPublishSuccess) {
      onPublishSuccess(publishedBlog);
    }
  };

  if (loadingContext) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <Navbar currentRoute="workspace" onNavigate={onNavigate} />
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <LoadingState message="Initializing ContentCrew Marketing Workspace & Context..." />
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      <Navbar currentRoute="workspace" onNavigate={onNavigate} />

      {/* Onboarding Modal if initial context is incomplete */}
      <OnboardingModal
        isOpen={showOnboarding}
        initialContext={context}
        onComplete={handleOnboardingComplete}
      />

      {/* Mobile Tab Switcher */}
      <div className="mobile-workspace-tabs" style={{
        display: 'none',
        borderBottom: '1px solid var(--border-color)',
        backgroundColor: 'var(--bg-secondary)'
      }}>
        <style>{`
          @media (max-width: 992px) {
            .mobile-workspace-tabs { display: flex !important; }
            .desktop-context-panel { display: ${mobileTab === 'context' ? 'block' : 'none'} !important; }
            .desktop-chat-panel { display: ${mobileTab === 'chat' ? 'block' : 'none'} !important; }
            .desktop-editor-panel { display: ${mobileTab === 'editor' ? 'block' : 'none'} !important; }
          }
        `}</style>
        <button
          onClick={() => setMobileTab('context')}
          style={{ flex: 1, padding: '0.625rem', fontSize: '0.75rem', fontWeight: 600, color: mobileTab === 'context' ? 'var(--accent-primary)' : 'var(--text-muted)' }}
        >
          Context
        </button>
        <button
          onClick={() => setMobileTab('chat')}
          style={{ flex: 1, padding: '0.625rem', fontSize: '0.75rem', fontWeight: 600, color: mobileTab === 'chat' ? 'var(--accent-primary)' : 'var(--text-muted)' }}
        >
          Chat & Agents
        </button>
        <button
          onClick={() => setMobileTab('editor')}
          style={{ flex: 1, padding: '0.625rem', fontSize: '0.75rem', fontWeight: 600, color: mobileTab === 'editor' ? 'var(--accent-primary)' : 'var(--text-muted)' }}
        >
          Blog Editor
        </button>
      </div>

      {/* 3-Column Marketing Workspace Layout */}
      <div className="workspace-container" style={{ flex: 1 }}>
        
        {/* Left Column: Marketing Context */}
        <div className="desktop-context-panel" style={{ height: '100%' }}>
          <MarketingContextPanel 
            context={context} 
            onContextUpdated={(updated) => setContext(updated)}
          />
        </div>

        {/* Center Column: Chat & Agent Activity Stream */}
        <div className="desktop-chat-panel" style={{ height: '100%' }}>
          <ChatAgentActivityPanel
            onDraftGenerated={handleDraftGenerated}
            onBlogPublished={handleBlogPublished}
            onOpenEditor={() => setMobileTab('editor')}
            workflowStatus={workflowStatus}
            setWorkflowStatus={setWorkflowStatus}
          />
        </div>

        {/* Right Column: Dynamic Blog Editor */}
        <div className="desktop-editor-panel" style={{ height: '100%' }}>
          <BlogEditorPanel
            draftBlog={generatedDraft}
            onPublish={handleBlogPublished}
            onRegenerate={() => {
              if (handleDraftGenerated) handleDraftGenerated(generatedDraft);
            }}
          />
        </div>

      </div>
    </div>
  );
}
