// src/components/ChatAssistant.jsx - COMPLETE WITH CLEAR HISTORY
import React, { useState, useEffect, useRef } from 'react';

const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [ChatKit, setChatKit] = useState(null);
  const [useChatKit, setUseChatKit] = useState(null);

  useEffect(() => {
    import('@openai/chatkit-react')
      .then((module) => {
        console.log('✅ ChatKit loaded');
        setChatKit(() => module.ChatKit);
        setUseChatKit(() => module.useChatKit);
      })
      .catch((error) => {
        console.error('❌ Error loading ChatKit:', error);
      });
  }, []);

  if (!ChatKit || !useChatKit) {
    return null;
  }

  return (
    <>
      {/* Main Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: '1.5rem',
          right: '1.5rem',
          width: '3.5rem',
          height: '3.5rem',
          backgroundColor: '#84CC16',
          color: 'white',
          borderRadius: '9999px',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          border: 'none',
          cursor: 'pointer',
          transition: 'all 0.2s',
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = '#65A30D';
          e.currentTarget.style.transform = 'scale(1.05)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = '#84CC16';
          e.currentTarget.style.transform = 'scale(1)';
        }}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? (
          <svg style={{ width: '1.5rem', height: '1.5rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg style={{ width: '1.5rem', height: '1.5rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </button>

      {isOpen && <ChatWindow ChatKit={ChatKit} useChatKit={useChatKit} />}
    </>
  );
};

const ChatWindow = ({ ChatKit, useChatKit }) => {
  const [currentThreadId, setCurrentThreadId] = useState(null);
  
  // Load saved thread ID from localStorage on mount
  useEffect(() => {
    const savedThreadId = localStorage.getItem('chatkit_thread_id');
    if (savedThreadId) {
      console.log('📂 Restoring thread:', savedThreadId);
      setCurrentThreadId(savedThreadId);
    }
  }, []);

  const { control, ref } = useChatKit({
    api: {
      getClientSecret: async (currentClientSecret) => {
        console.log('ChatKit requesting client secret...');
        
        if (currentClientSecret) {
          return currentClientSecret;
        }
        
        const endpoint = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
          ? '/api/chatkit/session'
          : '/.netlify/functions/chatkit-session';
        
        console.log('Fetching from:', endpoint);
        
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        });
        
        if (!res.ok) {
          throw new Error(`Failed to get session: ${res.status}`);
        }
        
        const data = await res.json();
        console.log('✅ Got client secret');
        return data.client_secret;
      },
    },
    initialThread: currentThreadId,
  });

  // Listen for thread changes and save to localStorage
  useEffect(() => {
    const chaткitElement = ref.current;
    
    if (!chaткitElement) return;

    const handleThreadChange = (event) => {
      const newThreadId = event.detail.threadId;
      console.log('💾 Thread changed:', newThreadId);
      
      if (newThreadId) {
        localStorage.setItem('chatkit_thread_id', newThreadId);
        setCurrentThreadId(newThreadId);
      } else {
        localStorage.removeItem('chatkit_thread_id');
        setCurrentThreadId(null);
      }
    };

    chaткitElement.addEventListener('chatkit.thread.change', handleThreadChange);

    return () => {
      chaткitElement.removeEventListener('chatkit.thread.change', handleThreadChange);
    };
  }, [ref]);

  // Clear history and start new conversation
  const handleClearHistory = () => {
    console.log('🗑️ Clearing chat history');
    localStorage.removeItem('chatkit_thread_id');
    setCurrentThreadId(null);
    
    // Tell ChatKit to start a new thread
    if (ref.current) {
      ref.current.setThreadId(null);
    }
  };

  return (
    <>
      {/* Clear History Button */}
      <button
        onClick={handleClearHistory}
        title="Start new conversation"
        style={{
          position: 'fixed',
          bottom: '6rem',
          right: '6rem',
          width: '2.5rem',
          height: '2.5rem',
          backgroundColor: '#f3f4f6',
          color: '#6b7280',
          borderRadius: '9999px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          border: 'none',
          cursor: 'pointer',
          transition: 'all 0.2s',
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = '#e5e7eb';
          e.currentTarget.style.transform = 'scale(1.05)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = '#f3f4f6';
          e.currentTarget.style.transform = 'scale(1)';
        }}
        aria-label="Start new conversation"
      >
        <svg style={{ width: '1.25rem', height: '1.25rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>

      {/* Chat Window */}
      <div
        style={{
          position: 'fixed',
          bottom: '6rem',
          right: '1.5rem',
          zIndex: 9999,
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          borderRadius: '0.5rem',
          overflow: 'hidden',
          backgroundColor: 'white',
        }}
      >
        <ChatKit 
          control={control}
          ref={ref}
          style={{
            height: '600px',
            width: '400px',
          }}
        />
      </div>
    </>
  );
};

export default ChatAssistant;