import React from 'react';

export default function StatusBadge({ status, size = 'normal' }) {
  const getBadgeConfig = () => {
    switch (status?.toUpperCase()) {
      case 'IDLE':
        return { style: 'badge-slate', text: 'System Ready', icon: '○' };
      case 'PLANNING':
      case 'WORKING':
      case 'AGENT_ACTIVE':
        return { style: 'badge-blue', text: 'Agent Active', icon: '⚡' };
      case 'RESEARCH_APPROVAL':
      case 'WAITING_APPROVAL':
        return { style: 'badge-amber', text: 'Approval Needed', icon: '⏳' };
      case 'GENERATING':
        return { style: 'badge-blue', text: 'Writing Content', icon: '✍️' };
      case 'CONTENT_APPROVAL':
        return { style: 'badge-amber', text: 'Content Review', icon: '🔍' };
      case 'PUBLISHED':
      case 'COMPLETED':
        return { style: 'badge-emerald', text: 'Published', icon: '✓' };
      default:
        return { style: 'badge-slate', text: status || 'Ready', icon: '•' };
    }
  };

  const config = getBadgeConfig();

  return (
    <span className={`badge ${config.style} ${size === 'small' ? 'text-xs py-0.5 px-2' : ''}`}>
      <span>{config.icon}</span>
      <span>{config.text}</span>
    </span>
  );
}
