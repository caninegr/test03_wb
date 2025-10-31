// gatsby-ssr.js
const React = require('react');
const ChatAssistant = require('./src/components/ChatAssistant').default;

exports.wrapPageElement = ({ element }) => {
  return React.createElement(
    React.Fragment,
    null,
    element,
    React.createElement(ChatAssistant, null)
  );
};

exports.onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    React.createElement('script', {
      key: 'chatkit',
      src: 'https://cdn.platform.openai.com/deployments/chatkit/chatkit.js',
      async: true,
    }),
  ]);
};