const fetch = require('node-fetch');
const { buildSystemPrompt } = require('../utils/systemPrompt');
const CONFIG = require('../../config');

module.exports = async (req, res) => {
  try {
    const { messages } = req.body;

    // Build system prompt from all 4 brain modules
    const systemPrompt = await buildSystemPrompt();

    // Call Anthropic API
    const response = await fetch(CONFIG.API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': CONFIG.ANTHROPIC_API_KEY,
        'anthropic-version': CONFIG.API_VERSION
      },
      body: JSON.stringify({
        model: CONFIG.MODEL,
        max_tokens: CONFIG.MAX_TOKENS,
        system: systemPrompt,
        messages: messages
      })
    });

    const data = await response.json();
    res.json(data);

  } catch (error) {
    console.error('❌ Chat error:', error);
    res.status(500).json({ error: error.message });
  }
};
