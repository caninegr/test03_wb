// src/components/ChatAssistant.jsx
import React, { useState, useEffect } from 'react';

const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [ChatKit, setChatKit] = useState(null);
  const [useChatKit, setUseChatKit] = useState(null);

  useEffect(() => {
    import('@openai/chatkit-react').then((module) => {
      setChatKit(() => module.ChatKit);
      setUseChatKit(() => module.useChatKit);
    });
  }, []);

  if (!ChatKit || !useChatKit) {
    return null;
  }

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: '1.5rem',
          right: '1.5rem',
          width: '3.5rem',
          height: '3.5rem',
          backgroundColor: '#2563eb',
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
          e.currentTarget.style.backgroundColor = '#1d4ed8';
          e.currentTarget.style.transform = 'scale(1.05)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = '#2563eb';
          e.currentTarget.style.transform = 'scale(1)';
        }}
        aria-label="Open chat"
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

      {/* Chat Window */}
      {isOpen && <ChatWindow ChatKit={ChatKit} useChatKit={useChatKit} onClose={() => setIsOpen(false)} />}
    </>
  );
};

const ChatWindow = ({ ChatKit, useChatKit, onClose }) => {
  const { control } = useChatKit({
    api: {
      async getClientSecret(existing) {
        if (existing) {
          // Implement refresh logic if needed
        }

        try {
          const res = await fetch('/api/chatkit/session', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (!res.ok) {
            throw new Error('Failed to create session');
          }

          const { client_secret } = await res.json();
          return client_secret;
        } catch (error) {
          console.error('Error fetching client secret:', error);
          throw error;
        }
      },
    },
  });

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '6rem',
        right: '1.5rem',
        zIndex: 9999,
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        borderRadius: '0.5rem',
        overflow: 'hidden',
      }}
    >
      <ChatKit 
        control={control} 
        style={{
          height: '600px',
          width: window.innerWidth > 768 ? '450px' : '400px',
        }}
      />
    </div>
  );
};

// ✅ IMPORTANT: Default export for CommonJS compatibility
export default ChatAssistant;