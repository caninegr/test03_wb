// src/api/chatkit/session.js
import OpenAI from 'openai';
import crypto from 'crypto';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    const userId = `user_${crypto.randomUUID()}`;
    
    const session = await openai.beta.chatkit.sessions.create({
      user: userId,
      workflow: {
        id: process.env.CHATKIT_WORKFLOW_ID
        //id: 'wf_6904b392ca0c8190b4258ffcd8d455bd093557e28800c2c1'
      }
    });
    
    return res.status(200).json({
      client_secret: session.client_secret
    });
    
  } catch (error) {
    console.error('Error:', error.message);
    return res.status(500).json({ 
      error: error.message 
    });
  }
}
