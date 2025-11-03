// gatsby-browser.js - BROWSER ONLY
const React = require('react');

// Only load ChatAssistant if we're in the browser
let ChatAssistant = null;
if (typeof window !== 'undefined') {
  try {
    ChatAssistant = require('./src/components/ChatAssistant').default;
  } catch (error) {
    console.error('Failed to load ChatAssistant:', error);
  }
}

exports.wrapPageElement = ({ element }) => {
  if (!ChatAssistant || typeof window === 'undefined') {
    return element;
  }
  
  return React.createElement(
    React.Fragment,
    null,
    element,
    React.createElement(ChatAssistant, null)
  );
};

exports.onClientEntry = () => {
  const style = document.createElement('style')
  style.innerHTML = `
    @media screen and (max-width: 768px) {
      .topnav-container {
        margin-bottom: 0 !important;
        padding-bottom: 0 !important;
      }
      
      .topnav-container > div {
        margin-bottom: 0 !important;
      }
      
      .topnav-flex {
        margin-bottom: 0 !important;
      }
      
      .topnav-flex > div {
        margin-bottom: 0 !important;
      }
      
      .topnav-container {
        min-height: 36px;
      }
      
      .topnav-flex {
        flex-direction: row !important;
      }
      
      .topnav-flex > *:first-child {
        margin-bottom: 0 !important;
      }
    }
  `

  if (typeof window !== 'undefined') {
    const script = document.createElement('script');
    script.src = 'https://cdn.platform.openai.com/deployments/chatkit/chatkit.js';
    script.async = true;
    document.head.appendChild(script);
  }

  document.head.appendChild(style)
};