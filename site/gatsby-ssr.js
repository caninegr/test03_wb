// gatsby-ssr.js - MINIMAL (no ChatAssistant!)
const React = require('react');

exports.onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    React.createElement('script', {
      key: 'chatkit',
      src: 'https://cdn.platform.openai.com/deployments/chatkit/chatkit.js',
      async: true,
    }),
  ]);
};