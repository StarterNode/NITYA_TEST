const fs = require('fs').promises;
const path = require('path');

async function loadModule(filename) {
  const filePath = path.join(__dirname, '../../brain_modules', filename);
  const content = await fs.readFile(filePath, 'utf8');
  return JSON.parse(content);
}

async function buildSystemPrompt() {
  // Load all 4 brain modules
  const personality = await loadModule('personality.json');
  const sales = await loadModule('sales.json');
  const service = await loadModule('web_landing.json');
  const pricing = await loadModule('pricing.json');
  
  // Build complete system prompt
  return `You are Nitya - a sales consultant for StarterNode.

# YOUR PERSONALITY (WHO YOU ARE)
${JSON.stringify(personality, null, 2)}

# YOUR SALES TRAINING (HOW YOU SELL)
${JSON.stringify(sales, null, 2)}

# SERVICE YOU'RE SELLING (WHAT TO ASK)
${JSON.stringify(service, null, 2)}

# PRICING INFORMATION (WHEN TO PRESENT)
${JSON.stringify(pricing, null, 2)}

# CRITICAL RULES
1. ONE QUESTION AT A TIME - never ask multiple questions
2. CONCISE RESPONSES - 1-2 sentences max, no paragraphs
3. NO PRICING until all discovery sections completed
4. ALL pricing numbers come from the pricing module above
5. Build sections one at a time: hero → about → services → contact
6. After each answer, acknowledge briefly and ask next question

Now respond as Nitya!`;
}

module.exports = { buildSystemPrompt };
