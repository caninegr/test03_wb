// netlify/functions/chat.js
// For Vercel, place this in: pages/api/chat.js or app/api/chat/route.js

exports.handler = async (event, context) => {
  // Handle CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  }

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    }
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    }
  }

  try {
    const { message, history = [] } = JSON.parse(event.body)

    if (!message || typeof message !== 'string') {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Message is required' })
      }
    }

    // Rate limiting (basic implementation)
    const rateLimitKey = event.headers['x-forwarded-for'] || context.clientContext?.ip || 'unknown'
    // In production, you'd want to use a proper rate limiting service

    // Prepare conversation context
    const systemPrompt = `You are a helpful AI assistant integrated into a website. Be concise, friendly, and helpful. Keep responses under 200 words unless more detail is specifically requested.`
    
    const conversationHistory = [
      { role: 'system', content: systemPrompt }
    ]

    // Add recent conversation history for context (last 10 messages)
    const recentHistory = history.slice(-10)
    recentHistory.forEach(msg => {
      conversationHistory.push({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text
      })
    })

    // Add current message
    conversationHistory.push({
      role: 'user',
      content: message
    })

    // Call OpenAI API
    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo', // or 'gpt-4' if you have access
        messages: conversationHistory,
        max_tokens: 500,
        temperature: 0.7,
        presence_penalty: 0.1,
        frequency_penalty: 0.1
      })
    })

    if (!openaiResponse.ok) {
      const errorData = await openaiResponse.json().catch(() => ({}))
      console.error('OpenAI API Error:', errorData)
      
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          error: 'AI service temporarily unavailable',
          reply: "I'm experiencing some technical difficulties right now. Please try again in a moment."
        })
      }
    }

    const data = await openaiResponse.json()
    const reply = data.choices?.[0]?.message?.content || "I'm sorry, I couldn't generate a response."

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        reply: reply.trim(),
        usage: data.usage // Optional: return usage stats
      })
    }

  } catch (error) {
    console.error('Chat function error:', error)
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Internal server error',
        reply: "I'm sorry, something went wrong. Please try again."
      })
    }
  }
}

// Alternative: For Vercel API Routes (pages/api/chat.js)
/*
export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  try {
    const { message, history = [] } = req.body
    
    // ... same logic as above ...
    
  } catch (error) {
    console.error('Chat API error:', error)
    res.status(500).json({ 
      error: 'Internal server error',
      reply: "I'm sorry, something went wrong. Please try again."
    })
  }
}
*/