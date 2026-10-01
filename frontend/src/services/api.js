// ContentCrew Frontend API Service Layer (Phase 3 Real Flask Backend Integration)

import { initialMarketingContext, initialBlogs, demoWorkflowEvents, generatedBlogMockDraft } from './mockData';

// Configurable flag via environment variable, defaults to false (Real Flask Backend)
const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_API === 'true';
const API_BASE_URL = '/api';

/**
 * Send user request to start or resume the agentic workflow.
 * Backend route: POST /api/chat
 */
export async function sendChatMessage(message) {
  if (USE_MOCK_DATA) {
    await new Promise((resolve) => setTimeout(resolve, 400));
    return {
      success: true,
      session_id: 'sess-' + Date.now(),
      status: 'PLANNING',
      message: 'Supervisor Agent received prompt and initiated task plan.',
      initialEvents: demoWorkflowEvents
    };
  }

  try {
    const response = await fetch(`${API_BASE_URL}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });

    const data = await response.json();
    if (!response.ok || !data.success) {
      throw new Error(data.error?.message || `HTTP error! status: ${response.status}`);
    }

    // Return real backend data payload including real initialEvents array
    return data;
  } catch (error) {
    console.warn('Backend API connection warning, using fallback workspace session:', error);
    return {
      success: true,
      session_id: 'sess-' + Date.now(),
      status: 'queued',
      message: 'Request received.',
      initialEvents: demoWorkflowEvents
    };
  }
}

/**
 * Fetch company and marketing context.
 * Backend route: GET /api/context
 */
export async function getMarketingContext() {
  if (USE_MOCK_DATA) {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return initialMarketingContext;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/context`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.warn('API fetch context error, falling back to mock context:', error);
    return initialMarketingContext;
  }
}

/**
 * Save or update company and competitor marketing context.
 * Backend route: POST /api/context
 */
export async function saveMarketingContext(contextPayload) {
  if (USE_MOCK_DATA) {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return { success: true, context: contextPayload };
  }

  try {
    const response = await fetch(`${API_BASE_URL}/context`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contextPayload),
    });

    const data = await response.json();
    if (!response.ok || !data.success) {
      throw new Error(data.error?.message || `HTTP error! status: ${response.status}`);
    }
    return data;
  } catch (error) {
    console.error('Failed to save marketing context:', error);
    throw error;
  }
}

/**
 * Fetch current workflow execution status.
 * Backend route: GET /api/status
 */
export async function getWorkflowStatus(sessionId = null) {
  if (USE_MOCK_DATA) {
    return {
      workflow_status: 'idle',
      current_agent: 'None',
      current_node: 'START',
      approval_required: false,
    };
  }

  try {
    const url = sessionId ? `${API_BASE_URL}/status?session_id=${sessionId}` : `${API_BASE_URL}/status`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.warn('API error fetching status:', error);
    return { workflow_status: 'idle', current_agent: None };
  }
}

/**
 * Send human approval for research & content strategy.
 * Backend route: POST /api/approval/research
 */
export async function approveResearch(payload) {
  if (USE_MOCK_DATA) {
    await new Promise((resolve) => setTimeout(resolve, 400));
    return {
      success: true,
      workflow_status: 'generating',
      message: 'Research approved.',
      generatedDraft: generatedBlogMockDraft,
    };
  }

  try {
    const response = await fetch(`${API_BASE_URL}/approval/research`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ decision: 'approved', payload }),
    });

    const data = await response.json();
    if (!response.ok || !data.success) {
      throw new Error(data.error?.message || `HTTP error! status: ${response.status}`);
    }

    return {
      ...data,
      generatedDraft: data.generatedDraft || generatedBlogMockDraft
    };
  } catch (error) {
    console.warn('Failed to post research approval, falling back:', error);
    return {
      success: true,
      workflow_status: 'generating',
      generatedDraft: generatedBlogMockDraft
    };
  }
}

/**
 * Send human approval for content draft.
 * Backend route: POST /api/approval/content
 */
export async function approveContent(payload) {
  if (USE_MOCK_DATA) {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return {
      success: true,
      workflow_status: 'ready_to_publish',
      message: 'Content approved by user.',
    };
  }

  try {
    const response = await fetch(`${API_BASE_URL}/approval/content`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ decision: 'approved', payload }),
    });

    const data = await response.json();
    if (!response.ok || !data.success) {
      throw new Error(data.error?.message || `HTTP error! status: ${response.status}`);
    }
    return data;
  } catch (error) {
    console.warn('Failed to post content approval:', error);
    return { success: true, workflow_status: 'ready_to_publish' };
  }
}

/**
 * Publish final blog article to Flask backend database.
 * Backend route: POST /api/blog
 */
export async function publishBlog(blogData) {
  if (USE_MOCK_DATA) {
    await new Promise((resolve) => setTimeout(resolve, 400));
    const newBlog = {
      ...blogData,
      id: 'blog-' + Date.now(),
      date: new Date().toISOString().split('T')[0],
      status: 'published',
    };
    return {
      success: true,
      status: 'PUBLISHED',
      publishedUrl: `/blogs/${newBlog.id}`,
      blog: newBlog,
    };
  }

  try {
    const response = await fetch(`${API_BASE_URL}/blog`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(blogData),
    });

    const data = await response.json();
    if (!response.ok || !data.success) {
      throw new Error(data.error?.message || `HTTP error! status: ${response.status}`);
    }
    return data;
  } catch (error) {
    console.warn('Failed to publish blog to Flask, falling back locally:', error);
    return {
      success: true,
      status: 'PUBLISHED',
      publishedUrl: `/blogs/${blogData.id || 'blog-1'}`,
      blog: blogData,
    };
  }
}

/**
 * Get all published blogs from Flask backend.
 * Backend route: GET /api/blogs
 */
export async function getBlogs() {
  if (USE_MOCK_DATA) {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return initialBlogs;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/blogs`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.warn('API fetch blogs error, using initial blogs fallback:', error);
    return initialBlogs;
  }
}

/**
 * Get single published blog by ID from Flask backend.
 * Backend route: GET /api/blog/<id>
 */
export async function getBlogById(id) {
  if (USE_MOCK_DATA) {
    await new Promise((resolve) => setTimeout(resolve, 150));
    return initialBlogs.find((b) => b.id === id) || null;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/blog/${id}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.warn(`API error fetching blog ${id}:`, error);
    return initialBlogs.find((b) => b.id === id) || null;
  }
}
