// src/api/chatkit/session.js - CREATE WORKFLOW WITH ASSISTANT
import OpenAI from 'openai';
import crypto from 'crypto';

// Cache workflow to avoid recreating it every time
let cachedWorkflowId = null;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    const userId = `user_${crypto.randomUUID()}`;
    
    // Create workflow only once and cache it
    if (!cachedWorkflowId) {
      console.log('Creating workflow with your assistant...');
      const workflow = await openai.beta.chatkit.workflows.create({
        assistant_id: 'asst_NwhX8DqlGv4CAfJg5wqGeHP1'  // 👈 Your assistant ID
      });
      cachedWorkflowId = workflow.id;
      console.log('✅ Workflow created:', cachedWorkflowId);
    } else {
      console.log('Using cached workflow:', cachedWorkflowId);
    }
    
    // Create session with the workflow
    console.log('Creating session for user:', userId);
    const session = await openai.beta.chatkit.sessions.create({
      user: userId,
      workflow: {
        id: cachedWorkflowId  // Use the workflow ID (wf_xxx), not assistant ID
      }
    });
    
    console.log('✅ Session created successfully!');
    
    return res.status(200).json({
      client_secret: session.client_secret
    });
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('Full error:', error);
    
    // Clear cache if workflow is invalid
    if (error.message?.includes('Workflow') || error.message?.includes('not found')) {
      console.log('Clearing cached workflow...');
      cachedWorkflowId = null;
    }
    
    return res.status(500).json({ 
      error: 'Failed to create session',
      message: error.message
    });
  }
}