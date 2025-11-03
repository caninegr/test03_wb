// netlify/functions/chatkit-session.js - CORRECT NETLIFY FORMAT
const { default: OpenAI } = require('openai');
const crypto = require('crypto');

exports.handler = async (event) => {
  console.log('=== Netlify Function Called ===');
  console.log('Method:', event.httpMethod);
  console.log('Has API Key:', !!process.env.OPENAI_API_KEY);
  console.log('Has Workflow ID:', !!process.env.CHATKIT_WORKFLOW_ID);
  
  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: '',
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  if (!process.env.OPENAI_API_KEY) {
    console.error('❌ Missing OPENAI_API_KEY');
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Missing API key configuration' })
    };
  }

  if (!process.env.CHATKIT_WORKFLOW_ID) {
    console.error('❌ Missing CHATKIT_WORKFLOW_ID');
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Missing workflow ID configuration' })
    };
  }

  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    const userId = `user_${crypto.randomUUID()}`;
    
    console.log('Creating session for user:', userId);
    
    const session = await openai.beta.chatkit.sessions.create({
      user: userId,
      workflow: {
        id: process.env.CHATKIT_WORKFLOW_ID
      }
    });
    
    console.log('✅ Session created successfully!');
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        client_secret: session.client_secret
      })
    };
    
  } catch (error) {
    console.error('❌ Error creating session:', error.message);
    console.error('Full error:', error);
    
    return {
      statusCode: 500,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ 
        error: 'Failed to create session',
        message: error.message 
      })
    };
  }
};