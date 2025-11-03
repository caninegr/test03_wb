// src/api/chatkit/session.js - SIMPLE VERSION
import OpenAI from 'openai';
import crypto from 'crypto';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  console.log('=== Creating ChatKit Session ===');
  console.log('Has OPENAI_API_KEY:', !!process.env.OPENAI_API_KEY);
  console.log('Has CHATKIT_WORKFLOW_ID:', !!process.env.CHATKIT_WORKFLOW_ID);
  console.log('Workflow ID:', process.env.CHATKIT_WORKFLOW_ID);

  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ 
      error: 'Missing OPENAI_API_KEY environment variable' 
    });
  }

  if (!process.env.CHATKIT_WORKFLOW_ID) {
    return res.status(500).json({ 
      error: 'Missing CHATKIT_WORKFLOW_ID environment variable',
      hint: 'Add CHATKIT_WORKFLOW_ID=wf_xxxxx to .env.development'
    });
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
        id: process.env.CHATKIT_WORKFLOW_ID  // Use pre-created workflow
      }
    });
    
    console.log('✅ Session created successfully!');
    
    return res.status(200).json({
      client_secret: session.client_secret
    });
    
  } catch (error) {
    console.error('❌ Error creating session:', error.message);
    return res.status(500).json({ 
      error: error.message,
      details: 'Check server logs for more info'
    });
  }
}