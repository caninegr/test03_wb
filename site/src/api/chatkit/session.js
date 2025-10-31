// src/api/chatkit/session.js - Using Assistants API directly
import OpenAI from 'openai';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    // Create or use an existing assistant
    const assistant = await openai.beta.assistants.create({
      name: "Website Assistant",
      instructions: "You are a helpful assistant for our website. Answer questions clearly and concisely.",
      model: "gpt-4o",
    });

    // Create a thread for the conversation
    const thread = await openai.beta.threads.create();
    
    console.log('✅ Assistant and thread created');
    
    return res.status(200).json({
      assistant_id: assistant.id,
      thread_id: thread.id
    });
    
  } catch (error) {
    console.error('❌ Error:', error);
    return res.status(500).json({ 
      error: 'Failed to create session',
      message: error.message
    });
  }
}