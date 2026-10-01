import React from 'react';
import { Sparkles, BookOpen, LayoutDashboard, Home, ArrowRight } from 'lucide-react';

export default function Navbar({ currentRoute, onNavigate }) {
  return (
    <header style={{
      height: '64px',
      borderBottom: '1px solid var(--border-color)',
      backgroundColor: 'rgba(9, 13, 22, 0.95)',
      backdropFilter: 'blur(12px)',
      position: 'sticky',
      top: 0,
      zIndex: 50
    }}>
      <div className="container" style={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Logo & Brand Identity */}
        <div 
          onClick={() => onNavigate('landing')}
          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}
        >
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--accent-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#000',
            fontWeight: 800
          }}>
            <Sparkles size={20} />
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: '1.125rem', letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
              ContentCrew
            </div>
            <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', marginTop: '-2px' }}>
              Agentic Marketing Platform
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button
            onClick={() => onNavigate('landing')}
            className={`btn btn-sm ${currentRoute === 'landing' ? 'btn-secondary' : 'btn-outline'}`}
            style={{ border: currentRoute === 'landing' ? undefined : 'none' }}
          >
            <Home size={15} />
            <span>Product</span>
          </button>

          <button
            onClick={() => onNavigate('blogs')}
            className={`btn btn-sm ${currentRoute === 'blogs' ? 'btn-secondary' : 'btn-outline'}`}
            style={{ border: currentRoute === 'blogs' ? undefined : 'none' }}
          >
            <BookOpen size={15} />
            <span>Blogs</span>
          </button>

          <button
            onClick={() => onNavigate('workspace')}
            className={`btn btn-sm ${currentRoute === 'workspace' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ marginLeft: '0.5rem' }}
          >
            <LayoutDashboard size={15} />
            <span>Launch Workspace</span>
            <ArrowRight size={14} />
          </button>
        </nav>
      </div>
    </header>
  );
}
