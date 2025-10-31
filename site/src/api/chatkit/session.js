import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Create a ChatKit session
    const session = await openai.chatkit.sessions.create({
      // Optional: specify assistant_id if you want to use a specific assistant
      // assistant_id: 'asst_xxxxx',
    });

    res.status(200).json({
      client_secret: session.client_secret
    });
  } catch (error) {
    console.error('Error creating ChatKit session:', error);
    res.status(500).json({ error: 'Failed to create session' });
  }
}