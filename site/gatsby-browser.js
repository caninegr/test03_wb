// gatsby-browser.js
const React = require('react');
const ChatAssistant = require('./src/components/ChatAssistant').default;

// Wrap every page with ChatAssistant
exports.wrapPageElement = ({ element }) => {
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

  // Load ChatKit script
  if (typeof window !== 'undefined') {
    const script = document.createElement('script');
    script.src = 'https://cdn.platform.openai.com/deployments/chatkit/chatkit.js';
    script.async = true;
    document.head.appendChild(script);
  }

  document.head.appendChild(style)
};