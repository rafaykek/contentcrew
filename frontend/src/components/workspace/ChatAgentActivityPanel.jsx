import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, RefreshCcw, Bot, User, Play, Info } from 'lucide-react';
import StatusBadge from '../common/StatusBadge';
import SupervisorPlanCard from './SupervisorPlanCard';
import ToolActivityCard from './ToolActivityCard';
import ResearchApprovalCard from './ResearchApprovalCard';
import ContentApprovalCard from './ContentApprovalCard';
import { demoWorkflowEvents, generatedBlogMockDraft } from '../../services/mockData';
import { sendChatMessage, approveResearch, publishBlog } from '../../services/api';

export default function ChatAgentActivityPanel({ 
  onDraftGenerated, 
  onBlogPublished, 
  onOpenEditor,
  workflowStatus,
  setWorkflowStatus 
}) {
  const [messages, setMessages] = useState([
    {
      id: 'welcome-1',
      sender: 'system',
      text: 'ContentCrew Marketing Workspace active. Enter a content topic or prompt to trigger the agentic workflow.'
    }
  ]);
  const [inputPrompt, setInputPrompt] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [eventsStream, setEventsStream] = useState([]);
  const [showResearchApproval, setShowResearchApproval] = useState(false);
  const [showContentApproval, setShowContentApproval] = useState(false);
  const [isPublished, setIsPublished] = useState(false);

  const chatBottomRef = useRef(null);

  const scrollToBottom = () => {
    setTimeout(() => {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, eventsStream, showResearchApproval, showContentApproval]);

  // Trigger interactive workflow
  const handleStartWorkflow = async (promptText) => {
    const query = promptText || inputPrompt;
    if (!query.trim()) return;

    const userMsg = { id: 'msg-' + Date.now(), sender: 'user', text: query };
    setMessages((prev) => [...prev, userMsg]);
    setInputPrompt('');
    setIsProcessing(true);
    setWorkflowStatus('AGENT_ACTIVE');
    setShowResearchApproval(false);
    setShowContentApproval(false);
    setIsPublished(false);

    // Call backend API
    const res = await sendChatMessage(query);

    // Render initial events stream
    if (res && res.initialEvents && res.initialEvents.length > 0) {
      setEventsStream(res.initialEvents);
    } else {
      setEventsStream([demoWorkflowEvents[0]]);
    }

    setShowResearchApproval(true);
    setIsProcessing(false);
    setWorkflowStatus('RESEARCH_APPROVAL');
    scrollToBottom();
  };

  // Handle Research Strategy Approval
  const handleApproveResearch = async (summary) => {
    setWorkflowStatus('GENERATING');
    setIsProcessing(true);

    const res = await approveResearch(summary);

    setIsProcessing(false);
    setShowContentApproval(true);
    setWorkflowStatus('CONTENT_APPROVAL');
    scrollToBottom();
    
    if (onDraftGenerated) {
      onDraftGenerated(res.generatedDraft || generatedBlogMockDraft);
    }
  };

  // Handle Publishing Authorization
  const handlePublish = async () => {
    const res = await publishBlog(generatedBlogMockDraft);
    if (res.success) {
      setIsPublished(true);
      setWorkflowStatus('PUBLISHED');
      scrollToBottom();
      if (onBlogPublished) {
        onBlogPublished(res.blog);
      }
    }
  };

  const handleResetSession = () => {
    setMessages([
      {
        id: 'welcome-1',
        sender: 'system',
        text: 'ContentCrew Marketing Workspace active. Enter a content topic or prompt to trigger the agentic workflow.'
      }
    ]);
    setEventsStream([]);
    setShowResearchApproval(false);
    setShowContentApproval(false);
    setIsPublished(false);
    setWorkflowStatus('IDLE');
  };

  return (
    <main style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      minHeight: 0,
      backgroundColor: 'var(--bg-primary)',
      overflow: 'hidden'
    }}>
      {/* Workspace Center Header */}
      <div style={{
        padding: '1rem 1.5rem',
        borderBottom: '1px solid var(--border-color)',
        backgroundColor: 'var(--bg-secondary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexShrink: 0
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: '28px',
            height: '28px',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: 'var(--accent-primary-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--accent-primary)'
          }}>
            <Sparkles size={16} />
          </div>
          <div>
            <h2 style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              Agentic Activity & Conversation
            </h2>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Multi-Agent Graph State Engine
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <StatusBadge status={workflowStatus} />
          
          <button
            onClick={handleResetSession}
            className="btn btn-sm btn-outline"
            title="Reset Workspace Session"
          >
            <RefreshCcw size={13} />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Main Stream Area with unblocked scrolling */}
      <div style={{
        flex: 1,
        minHeight: 0,
        overflowY: 'auto',
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        
        {/* Welcome card if empty */}
        {eventsStream.length === 0 && (
          <div style={{
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-lg)',
            padding: '2rem',
            textAlign: 'center',
            margin: 'auto 0'
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              backgroundColor: 'var(--accent-primary-light)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent-primary)',
              marginBottom: '1rem'
            }}>
              <Sparkles size={24} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              What would you like to create?
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', maxWidth: '460px', margin: '0 auto 1.5rem auto', lineHeight: 1.6 }}>
              Type a prompt below to launch ContentCrew. Specialized AI agents will research competitors, analyze search intent, request strategy approval, and author a technical blog.
            </p>

            {/* Quick Demo Prompts */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center' }}>
              <button
                onClick={() => handleStartWorkflow("Write me a blog about Agentic AI.")}
                className="btn btn-sm btn-secondary"
              >
                <Play size={13} style={{ color: 'var(--accent-primary)' }} />
                <span>"Write me a blog about Agentic AI."</span>
              </button>

              <button
                onClick={() => handleStartWorkflow("Compare B2B SaaS SEO & Competitor Scraping Strategies.")}
                className="btn btn-sm btn-secondary"
              >
                <Play size={13} style={{ color: 'var(--accent-blue)' }} />
                <span>"B2B SaaS SEO Strategies"</span>
              </button>
            </div>
          </div>
        )}

        {/* Message Stream */}
        {messages.map((msg) => (
          <div 
            key={msg.id}
            style={{
              display: 'flex',
              gap: '0.75rem',
              maxWidth: '85%',
              alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row'
            }}
          >
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: msg.sender === 'user' ? 'var(--accent-blue)' : 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: msg.sender === 'user' ? '#fff' : 'var(--accent-primary)',
              flexShrink: 0
            }}>
              {msg.sender === 'user' ? <User size={16} /> : <Bot size={16} />}
            </div>

            <div style={{
              backgroundColor: msg.sender === 'user' ? 'var(--accent-blue-light)' : 'var(--bg-card)',
              border: msg.sender === 'user' ? '1px solid rgba(2, 132, 199, 0.3)' : '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              padding: '0.875rem 1.125rem',
              fontSize: '0.875rem',
              color: 'var(--text-primary)',
              lineHeight: 1.5
            }}>
              {msg.text}
            </div>
          </div>
        ))}

        {/* Render Agent & Tool Activity Cards */}
        {eventsStream.map((event) => {
          if (event.type === 'SUPERVISOR_PLAN') {
            return <SupervisorPlanCard key={event.id} event={event} />;
          }
          if (event.type === 'TOOL_EXECUTION') {
            return <ToolActivityCard key={event.id} event={event} />;
          }
          if (event.type === 'APPROVAL_REQUEST' && showResearchApproval) {
            return (
              <ResearchApprovalCard 
                key={event.id} 
                event={event} 
                onApprove={handleApproveResearch} 
              />
            );
          }
          return null;
        })}

        {/* Content Approval Gate */}
        {showContentApproval && (
          <ContentApprovalCard 
            onOpenEditor={onOpenEditor}
            onRegenerate={() => {
              if (onDraftGenerated) onDraftGenerated(generatedBlogMockDraft);
            }}
            onPublish={handlePublish}
            isPublished={isPublished}
          />
        )}

        {/* Loading Spinner */}
        {isProcessing && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.625rem',
            padding: '0.875rem 1.25rem',
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-md)',
            fontSize: '0.8125rem',
            color: 'var(--text-secondary)'
          }}>
            <div style={{
              width: '16px',
              height: '16px',
              border: '2px solid var(--border-color)',
              borderTopColor: 'var(--accent-primary)',
              borderRadius: '50%',
              animation: 'spin 0.8s linear infinite'
            }} />
            <span>Agent activity in progress...</span>
          </div>
        )}

        <div ref={chatBottomRef} />
      </div>

      {/* Input Composer Area */}
      <div style={{
        padding: '1rem 1.5rem',
        borderTop: '1px solid var(--border-color)',
        backgroundColor: 'var(--bg-secondary)',
        flexShrink: 0
      }}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleStartWorkflow();
          }}
          style={{ display: 'flex', gap: '0.75rem' }}
        >
          <input 
            type="text"
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            placeholder="Write me a blog about Agentic AI..."
            disabled={isProcessing}
            style={{
              flex: 1,
              backgroundColor: 'var(--bg-input)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              padding: '0.75rem 1rem',
              color: 'var(--text-primary)',
              fontSize: '0.875rem',
              outline: 'none'
            }}
          />
          <button
            type="submit"
            disabled={isProcessing || !inputPrompt.trim()}
            className="btn btn-primary"
            style={{ padding: '0.75rem 1.25rem' }}
          >
            <Send size={16} />
            <span>Submit</span>
          </button>
        </form>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '0.75rem',
          color: 'var(--text-muted)',
          marginTop: '0.5rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
            <Info size={12} />
            <span>Connected to POST /api/chat & LangGraph Engine</span>
          </div>
          <span>Phase 3 System Active</span>
        </div>
      </div>
    </main>
  );
}
