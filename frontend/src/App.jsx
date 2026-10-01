import React, { useState } from 'react';
import LandingPage from './pages/LandingPage';
import BlogsPage from './pages/BlogsPage';
import WorkspacePage from './pages/WorkspacePage';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState('landing');
  const [newlyPublishedBlog, setNewlyPublishedBlog] = useState(null);

  const handleNavigate = (route) => {
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePublishSuccess = (publishedBlog) => {
    setNewlyPublishedBlog(publishedBlog);
  };

  return (
    <>
      {currentRoute === 'landing' && (
        <LandingPage onNavigate={handleNavigate} />
      )}

      {currentRoute === 'blogs' && (
        <BlogsPage 
          onNavigate={handleNavigate} 
          newlyPublishedBlog={newlyPublishedBlog} 
        />
      )}

      {currentRoute === 'workspace' && (
        <WorkspacePage 
          onNavigate={handleNavigate}
          onPublishSuccess={handlePublishSuccess}
        />
      )}
    </>
  );
}
