# NITYA V1.1 - CLAUDE CODE BUILD PROMPT
**Clean rebuild with modular architecture**  
**Build Date:** October 17, 2025  
**Location:** `C:\Users\matth\Documents\StarterNode 2.0\APP\NITYA_V1.1\`

---

## 🎯 PROJECT MISSION

Build NITYA - an AI sales consultant that collects website requirements through conversational discovery, builds live mockups section-by-section, and generates structured production-ready data for designers.

**Core Innovation:** Split-screen interface where clients see their website mockup update in real-time as they answer questions, building psychological buy-in through progressive approval flow.

---

## 📋 BUILD STAGES (FOR MEMORY REFRESH)

If we need to pause and resume, refer to these stages:

1. **STAGE 1: Foundation** - Brain modules + proxy server
2. **STAGE 2: Chat Interface** - Split-screen UI
3. **STAGE 3: Preview System** - Live mockup rendering
4. **STAGE 4: File Management** - Upload + save system
5. **STAGE 5: Testing** - Validate all flows

Current stage will be marked in git commits.

---

## 🏗️ ARCHITECTURE OVERVIEW

### System Flow
```
User (Browser)
    ↓
Split-Screen Interface (HTML/CSS/JS)
    ├── LEFT: Chat with Nitya
    └── RIGHT: Live Preview Mockup
         ↓
Proxy Server (Node.js Express)
    ↓
Anthropic Claude API
    ↓
Brain Modules (4 JSON files)
    ├── personality.json (WHO she is)
    ├── sales.json (HOW she sells)
    ├── web_landing.json (WHAT she asks)
    └── pricing.json (💰 ONLY place with price numbers!)
```

### Tech Stack
- **Frontend:** Pure HTML/CSS/JS (lightweight, no framework bloat)
- **Backend:** Node.js + Express (proxy + file handling)
- **AI:** Anthropic Claude Sonnet 4.5
- **Storage:** File system (JSON + uploaded assets)
- **Styling:** Design tokens from global.css

---

## 🚨 CRITICAL RULES

### Rule #1: PRICING CENTRALIZATION
**NO PRICE NUMBERS ANYWHERE EXCEPT `pricing.json`**

❌ WRONG:
```json
// web_landing.json
"pricing": {
  "buildFee": 700,  // ← NEVER DO THIS!
  "monthly": 45
}
```

✅ CORRECT:
```json
// web_landing.json
"pricing": {
  "source": "pricing.json",
  "rules": "reference pricing module for all numbers"
}

// pricing.json (THE ONLY PLACE)
{
  "firstMonth": 40,
  "secondMonth": 199,
  "ongoing": 26
}
```

### Rule #2: MODULAR DESIGN
Each file has ONE job:
- **personality.json** = Character traits, tone, phrases
- **sales.json** = Sales psychology, objection handling
- **web_landing.json** = Questions to ask, section templates
- **pricing.json** = Numbers and pricing rules

### Rule #3: LIGHTWEIGHT HTML
- No React/Vue/Angular (keep it simple)
- Vanilla JS for interactions
- CSS Grid/Flexbox for layout
- Use existing design tokens from `global.css`

---

## 📁 FILE STRUCTURE TO CREATE

```
NITYA_V1.1/
├── brain_modules/
│   ├── personality.json          ← Empty template (Perplexity will fill)
│   ├── sales.json               ← Empty template (Perplexity will fill)
│   ├── web_landing.json         ← Empty template (Perplexity will fill)
│   └── pricing.json             ← ONLY file with price numbers
├── public/
│   ├── index.html               ← Split-screen interface
│   ├── app.js                   ← Frontend logic
│   └── styles.css               ← Component styles (imports global.css)
├── server/
│   ├── proxy-server.js          ← API proxy + file uploads
│   ├── routes/
│   │   ├── chat.js              ← Chat endpoint
│   │   ├── upload.js            ← File upload endpoint
│   │   └── save.js              ← Section save endpoint
│   └── utils/
│       ├── systemPrompt.js      ← Build prompt from modules
│       └── fileHandler.js       ← Prospect directory management
├── prospects/                    ← Auto-created when user starts
│   └── [userId]/
│       ├── scope.json           ← Master data file
│       ├── sections/            ← Individual section data
│       └── assets/              ← Uploaded images/files
├── config.js                     ← Already exists (API key)
├── global.css                    ← Already exists (design tokens)
├── package.json                  ← Dependencies
├── .gitignore                    ← Protect API key
└── README.md                     ← Quick start guide
```

---

## 🎨 DESIGN SYSTEM (FROM global.css)

Use these existing tokens:

```css
/* Brand Colors */
--primary-start: #440DC3;      /* Purple */
--primary-end: #00bf63;        /* Green */
--success: #00bf63;
--error: #ea5a37;
--warning: #ffcb01;

/* Text */
--text-primary: #111827;
--text-secondary: #6b7280;
--text-muted: #9ca3af;

/* Backgrounds */
--background: #ffffff;
--surface: #f9fafb;
--border: #e5e7eb;

/* Typography */
--font-heading: -apple-system, 'SF Pro Display', system-ui, sans-serif;
--font-body: -apple-system, 'SF Pro Text', system-ui, sans-serif;
```

---

## 📝 STAGE 1: BRAIN MODULES + PROXY SERVER

### 1A: Create Empty Brain Module Templates

**File:** `brain_modules/personality.json`
```json
{
  "_instructions": "This will be populated by Perplexity. Leave structure only.",
  "version": "1.1",
  "character": {
    "name": "Nitya",
    "age": 22,
    "background": "",
    "personality_traits": [],
    "communication_style": {},
    "signature_phrases": []
  },
  "boundaries": [],
  "authenticity_rules": []
}
```

**File:** `brain_modules/sales.json`
```json
{
  "_instructions": "This will be populated by Perplexity. Leave structure only.",
  "version": "1.1",
  "traffic_light_system": {},
  "nlp_techniques": [],
  "objection_handling": {},
  "closing_techniques": [],
  "conversation_flow": [],
  "rules": {
    "concise_mode": true,
    "one_question_at_a_time": true,
    "no_pricing_until_discovery_complete": true
  }
}
```

**File:** `brain_modules/web_landing.json`
```json
{
  "_instructions": "This will be populated by Perplexity. Leave structure only. NO PRICE NUMBERS!",
  "version": "1.1",
  "service": {
    "name": "Website & Landing Pages",
    "description": ""
  },
  "greeting": "",
  "discovery_sections": [
    {
      "name": "hero",
      "questions": [],
      "data_fields": []
    },
    {
      "name": "about",
      "questions": [],
      "data_fields": []
    },
    {
      "name": "services",
      "questions": [],
      "data_fields": []
    },
    {
      "name": "contact",
      "questions": [],
      "data_fields": []
    }
  ],
  "pricing_reference": {
    "source": "pricing.json",
    "note": "ALL pricing numbers live in pricing.json ONLY"
  }
}
```

**File:** `brain_modules/pricing.json`
```json
{
  "_note": "THIS IS THE ONLY FILE WITH PRICE NUMBERS",
  "version": "1.1",
  "offer": {
    "firstMonth": {
      "amount": 40,
      "includes": ["Website build", "First month hosting"],
      "description": "$40 first month special - website + hosting included"
    },
    "secondMonth": {
      "amount": 199,
      "description": "One-time completion fee"
    },
    "ongoing": {
      "amount": 26,
      "period": "monthly",
      "description": "Hosting + maintenance after month 2"
    }
  },
  "presentation_rules": {
    "when_to_present": "After all discovery sections completed",
    "format": "Simple, clear, no complex breakdowns",
    "objection_responses": {
      "too_expensive": "This is the complete package - no hidden fees",
      "need_to_think": "That makes sense! Can I answer any questions while you consider?"
    }
  }
}
```

### 1B: Create Proxy Server

**File:** `server/proxy-server.js`
```javascript
const express = require('express');
const cors = require('cors');
const chatRoute = require('./routes/chat');
const uploadRoute = require('./routes/upload');
const saveRoute = require('./routes/save');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('../public'));
app.use('/prospects', express.static('../prospects'));

// Routes
app.use('/api/chat', chatRoute);
app.use('/api/upload', uploadRoute);
app.use('/api/save', saveRoute);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Nitya AI Proxy Server running on http://localhost:${PORT}`);
});
```

**File:** `server/routes/chat.js`
```javascript
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
```

**File:** `server/utils/systemPrompt.js`
```javascript
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
```

### 1C: Update package.json

**File:** `package.json`
```json
{
  "name": "nitya-v1.1",
  "version": "1.1.0",
  "description": "Nitya AI Sales Discovery System",
  "main": "server/proxy-server.js",
  "scripts": {
    "start": "node server/proxy-server.js",
    "dev": "nodemon server/proxy-server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "node-fetch": "^2.7.0",
    "multer": "^1.4.5-lts.1"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  }
}
```

---

## 🎨 STAGE 2: SPLIT-SCREEN CHAT INTERFACE

### 2A: Create HTML Structure

**File:** `public/index.html`
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nitya AI - StarterNode</title>
    <link rel="icon" href="../favicon.ico">
    <link rel="stylesheet" href="../global.css">
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <!-- Main Container: Split Screen -->
    <div class="app-container">
        
        <!-- LEFT PANEL: Chat Interface -->
        <div class="chat-panel">
            <!-- Header -->
            <div class="chat-header">
                <div class="logo">
                    <div class="logo-cube"></div>
                    <span>Nitya AI</span>
                </div>
                <div class="status-indicator">
                    <span class="status-dot"></span>
                    <span id="status-text">Online</span>
                </div>
            </div>
            
            <!-- Messages Area -->
            <div id="messages" class="messages-container">
                <!-- Messages appear here -->
            </div>
            
            <!-- Input Area -->
            <div class="input-container">
                <textarea 
                    id="user-input" 
                    placeholder="Type your message..."
                    rows="1"
                ></textarea>
                <button id="send-btn" class="btn-send">
                    Send
                </button>
            </div>
            
            <!-- Hidden file input -->
            <input type="file" id="file-input" accept="image/*" style="display: none;">
        </div>
        
        <!-- RIGHT PANEL: Live Preview -->
        <div class="preview-panel">
            <!-- Preview Header -->
            <div class="preview-header">
                <h2>Live Preview</h2>
                <div id="progress-indicator">Section 1 of 4</div>
            </div>
            
            <!-- Preview Container -->
            <div id="preview-content" class="preview-content">
                <div class="preview-placeholder">
                    <div class="placeholder-icon">🎨</div>
                    <p>Your website preview will appear here as we build it together</p>
                </div>
            </div>
            
            <!-- Approve Button (hidden until section complete) -->
            <button id="approve-btn" class="btn-approve" style="display: none;">
                ✓ Approve Section
            </button>
        </div>
        
    </div>
    
    <script src="app.js"></script>
</body>
</html>
```

### 2B: Create Component Styles

**File:** `public/styles.css`
```css
/* Import global design tokens */
@import url('../global.css');

/* ============================================
   SPLIT-SCREEN LAYOUT
   ============================================ */

.app-container {
    display: flex;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
}

/* ============================================
   LEFT PANEL: CHAT
   ============================================ */

.chat-panel {
    width: 50%;
    display: flex;
    flex-direction: column;
    background: var(--background);
    border-right: 2px solid var(--border);
}

.chat-header {
    padding: 1.5rem;
    border-bottom: 1px solid var(--border);
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: var(--surface);
}

.status-indicator {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    color: var(--text-secondary);
}

.status-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--success);
    animation: pulse 2s infinite;
}

@keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
}

.messages-container {
    flex: 1;
    overflow-y: auto;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

/* Message Bubbles */
.message {
    display: flex;
    gap: 0.75rem;
    align-items: flex-start;
    max-width: 80%;
}

.message.user {
    align-self: flex-end;
    flex-direction: row-reverse;
}

.message.ai {
    align-self: flex-start;
}

.message-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    flex-shrink: 0;
}

.message.ai .message-avatar {
    background: linear-gradient(135deg, var(--primary-start), var(--primary-end));
    color: white;
}

.message.user .message-avatar {
    background: var(--surface);
    color: var(--text-primary);
}

.message-bubble {
    padding: 0.75rem 1rem;
    border-radius: 12px;
    line-height: 1.5;
}

.message.ai .message-bubble {
    background: var(--surface);
    color: var(--text-primary);
}

.message.user .message-bubble {
    background: linear-gradient(135deg, var(--primary-start), var(--primary-end));
    color: white;
}

/* System Messages */
.message.system .message-bubble {
    background: var(--warning);
    color: var(--text-primary);
    font-size: 0.875rem;
}

/* Typing Indicator */
.typing-indicator {
    display: flex;
    gap: 0.75rem;
    align-items: center;
}

.typing-dots {
    display: flex;
    gap: 0.25rem;
}

.typing-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--text-muted);
    animation: bounce 1.4s infinite;
}

.typing-dot:nth-child(2) { animation-delay: 0.2s; }
.typing-dot:nth-child(3) { animation-delay: 0.4s; }

@keyframes bounce {
    0%, 60%, 100% { transform: translateY(0); }
    30% { transform: translateY(-10px); }
}

/* Input Area */
.input-container {
    padding: 1.5rem;
    border-top: 1px solid var(--border);
    display: flex;
    gap: 0.75rem;
    background: var(--surface);
}

#user-input {
    flex: 1;
    padding: 0.75rem 1rem;
    border: 1px solid var(--border);
    border-radius: 12px;
    font-family: var(--font-body);
    font-size: 1rem;
    resize: none;
    max-height: 120px;
}

#user-input:focus {
    outline: none;
    border-color: var(--primary-end);
}

.btn-send {
    padding: 0.75rem 1.5rem;
    background: linear-gradient(135deg, var(--primary-start), var(--primary-end));
    color: white;
    border: none;
    border-radius: 12px;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.2s;
}

.btn-send:hover {
    transform: translateY(-2px);
}

/* Upload Button */
.btn-upload {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background: var(--surface);
    border: 2px dashed var(--border);
    border-radius: 8px;
    cursor: pointer;
    transition: border-color 0.2s;
    margin: 0.5rem 0;
}

.btn-upload:hover {
    border-color: var(--primary-end);
}

/* ============================================
   RIGHT PANEL: PREVIEW
   ============================================ */

.preview-panel {
    width: 50%;
    display: flex;
    flex-direction: column;
    background: var(--surface);
}

.preview-header {
    padding: 1.5rem;
    border-bottom: 1px solid var(--border);
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: var(--background);
}

.preview-header h2 {
    font-size: 1.25rem;
    font-weight: 600;
    margin: 0;
}

#progress-indicator {
    font-size: 0.875rem;
    color: var(--text-secondary);
}

.preview-content {
    flex: 1;
    overflow-y: auto;
    padding: 2rem;
}

/* Preview Placeholder */
.preview-placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: var(--text-muted);
    text-align: center;
}

.placeholder-icon {
    font-size: 4rem;
    margin-bottom: 1rem;
}

/* Preview Sections */
.preview-section {
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    margin-bottom: 1.5rem;
    overflow: hidden;
}

.preview-section.hero {
    padding: 4rem 2rem;
    text-align: center;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
}

.preview-section h1 {
    font-size: 2.5rem;
    margin: 1rem 0;
}

.preview-section img.logo {
    max-width: 150px;
    height: auto;
}

/* Approve Button */
.btn-approve {
    margin: 1.5rem;
    padding: 1rem 2rem;
    background: var(--success);
    color: white;
    border: none;
    border-radius: 12px;
    font-size: 1.125rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
}

.btn-approve:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 191, 99, 0.3);
}

/* ============================================
   RESPONSIVE
   ============================================ */

@media (max-width: 1024px) {
    .app-container {
        flex-direction: column;
    }
    
    .chat-panel,
    .preview-panel {
        width: 100%;
        height: 50vh;
    }
}
```

---

## 🧠 STAGE 3: PREVIEW SYSTEM

### 3A: Frontend Logic

**File:** `public/app.js`
```javascript
const App = {
    // State
    userId: 'user_' + Date.now(),
    currentSection: 'hero',
    sectionData: {
        hero: {},
        about: {},
        services: {},
        contact: {}
    },
    sectionsApproved: [],
    messageHistory: [],
    
    // Initialize
    async init() {
        console.log('🚀 Nitya AI initializing...');
        this.bindEvents();
        this.showGreeting();
        console.log('✅ Ready!');
    },
    
    // Bind UI events
    bindEvents() {
        const sendBtn = document.getElementById('send-btn');
        const input = document.getElementById('user-input');
        const fileInput = document.getElementById('file-input');
        const approveBtn = document.getElementById('approve-btn');
        
        sendBtn.onclick = () => this.sendMessage();
        input.onkeypress = (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        };
        
        fileInput.onchange = (e) => this.handleFileUpload(e);
        approveBtn.onclick = () => this.approveSection();
        
        // Auto-resize textarea
        input.oninput = function() {
            this.style.height = 'auto';
            this.style.height = this.scrollHeight + 'px';
        };
    },
    
    // Show initial greeting
    showGreeting() {
        const greeting = "Hey! I'm Nitya 👋 I'm here to build your website with you. Do you have a site already or are we building from scratch?";
        this.addMessage('ai', greeting);
    },
    
    // Send message to Nitya
    async sendMessage() {
        const input = document.getElementById('user-input');
        const message = input.value.trim();
        if (!message) return;
        
        // Add user message
        this.addMessage('user', message);
        input.value = '';
        input.style.height = 'auto';
        
        // Show typing
        this.showTyping();
        
        // Store in history
        this.messageHistory.push({
            role: 'user',
            content: message
        });
        
        // Call API
        try {
            const response = await fetch('http://localhost:3000/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: this.messageHistory
                })
            });
            
            const data = await response.json();
            const nityaMessage = data.content[0].text;
            
            // Hide typing
            this.hideTyping();
            
            // Add Nitya's response
            this.addMessage('ai', nityaMessage);
            
            // Store in history
            this.messageHistory.push({
                role: 'assistant',
                content: nityaMessage
            });
            
            // Check for upload requests
            this.detectUploadRequest(nityaMessage);
            
        } catch (error) {
            this.hideTyping();
            this.addMessage('system', 'Error: ' + error.message);
        }
    },
    
    // Add message to UI
    addMessage(type, content) {
        const container = document.getElementById('messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        
        if (type !== 'system') {
            const avatar = document.createElement('div');
            avatar.className = 'message-avatar';
            avatar.textContent = type === 'ai' ? 'N' : 'U';
            messageDiv.appendChild(avatar);
        }
        
        const bubble = document.createElement('div');
        bubble.className = 'message-bubble';
        bubble.innerHTML = content.replace(/\n/g, '<br>');
        messageDiv.appendChild(bubble);
        
        container.appendChild(messageDiv);
        container.scrollTop = container.scrollHeight;
    },
    
    // Typing indicator
    showTyping() {
        const container = document.getElementById('messages');
        const typing = document.createElement('div');
        typing.id = 'typing';
        typing.className = 'typing-indicator';
        typing.innerHTML = `
            <div class="message-avatar">N</div>
            <div class="typing-dots">
                <span class="typing-dot"></span>
                <span class="typing-dot"></span>
                <span class="typing-dot"></span>
            </div>
        `;
        container.appendChild(typing);
        container.scrollTop = container.scrollHeight;
    },
    
    hideTyping() {
        const typing = document.getElementById('typing');
        if (typing) typing.remove();
    },
    
    // Detect upload requests
    detectUploadRequest(message) {
        const lower = message.toLowerCase();
        if (lower.includes('upload') || lower.includes('add a logo') || lower.includes('add a photo')) {
            this.showUploadButton();
        }
    },
    
    showUploadButton() {
        const container = document.getElementById('messages');
        const btn = document.createElement('button');
        btn.className = 'btn-upload';
        btn.innerHTML = '📎 Upload File';
        btn.onclick = () => document.getElementById('file-input').click();
        
        const msgDiv = document.createElement('div');
        msgDiv.className = 'message system';
        msgDiv.appendChild(btn);
        
        container.appendChild(msgDiv);
        container.scrollTop = container.scrollHeight;
    },
    
    // Handle file uploads
    async handleFileUpload(event) {
        const file = event.target.files[0];
        if (!file) return;
        
        this.addMessage('system', '⏳ Uploading...');
        
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('userId', this.userId);
            formData.append('section', this.currentSection);
            
            const response = await fetch('http://localhost:3000/api/upload', {
                method: 'POST',
                body: formData
            });
            
            const result = await response.json();
            
            // Update preview
            this.sectionData[this.currentSection].image = result.url;
            this.renderPreview();
            
            this.addMessage('system', '✅ Uploaded!');
            
        } catch (error) {
            this.addMessage('system', '❌ Upload failed: ' + error.message);
        }
    },
    
    // Render preview
    renderPreview() {
        const container = document.getElementById('preview-content');
        const section = this.currentSection;
        const data = this.sectionData[section];
        
        if (Object.keys(data).length === 0) {
            return; // Nothing to show yet
        }
        
        // Render based on section
        let html = '';
        if (section === 'hero') {
            html = this.renderHero(data);
        } else if (section === 'about') {
            html = this.renderAbout(data);
        } else if (section === 'services') {
            html = this.renderServices(data);
        } else if (section === 'contact') {
            html = this.renderContact(data);
        }
        
        container.innerHTML = html;
        
        // Show approve button
        document.getElementById('approve-btn').style.display = 'block';
    },
    
    renderHero(data) {
        return `
            <div class="preview-section hero">
                ${data.logo ? `<img src="${data.logo}" class="logo">` : ''}
                <h1>${data.headline || '[Your Headline]'}</h1>
                <p>${data.subheadline || ''}</p>
            </div>
        `;
    },
    
    renderAbout(data) {
        return `
            <div class="preview-section">
                <h2>${data.headline || 'About Us'}</h2>
                <p>${data.story || '[Your story here]'}</p>
            </div>
        `;
    },
    
    renderServices(data) {
        const services = data.services || [];
        return `
            <div class="preview-section">
                <h2>Services</h2>
                ${services.map(s => `<p>• ${s}</p>`).join('')}
            </div>
        `;
    },
    
    renderContact(data) {
        return `
            <div class="preview-section">
                <h2>Contact</h2>
                <p>Email: ${data.email || ''}</p>
                <p>Phone: ${data.phone || ''}</p>
            </div>
        `;
    },
    
    // Approve section
    async approveSection() {
        const section = this.currentSection;
        this.sectionsApproved.push(section);
        
        this.addMessage('system', `✅ ${section.toUpperCase()} section approved!`);
        
        // Hide approve button
        document.getElementById('approve-btn').style.display = 'none';
        
        // Save section
        await this.saveSection(section);
        
        // Move to next
        const sections = ['hero', 'about', 'services', 'contact'];
        const index = sections.indexOf(section);
        
        if (index < sections.length - 1) {
            this.currentSection = sections[index + 1];
            document.getElementById('progress-indicator').textContent = 
                `Section ${index + 2} of ${sections.length}`;
            
            // Tell Nitya
            await this.sendMessage('[SECTION_APPROVED] Continue to next section');
        } else {
            this.addMessage('system', '🎉 All sections complete!');
        }
    },
    
    // Save section data
    async saveSection(section) {
        try {
            await fetch('http://localhost:3000/api/save', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: this.userId,
                    section: section,
                    data: this.sectionData[section]
                })
            });
        } catch (error) {
            console.error('Save error:', error);
        }
    }
};

// Initialize when DOM ready
document.addEventListener('DOMContentLoaded', () => App.init());
```

---

## 📤 STAGE 4: FILE MANAGEMENT

### 4A: Upload Route

**File:** `server/routes/upload.js`
```javascript
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();

// Configure storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = `../prospects/${req.body.userId}/assets/images/`;
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, `${Date.now()}${ext}`);
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only images allowed'));
        }
    }
});

router.post('/', upload.single('file'), (req, res) => {
    try {
        res.json({
            success: true,
            url: `/prospects/${req.body.userId}/assets/images/${req.file.filename}`,
            filename: req.file.filename
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
```

### 4B: Save Route

**File:** `server/routes/save.js`
```javascript
const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { userId, section, data } = req.body;
        
        // Create section file
        const dir = `../prospects/${userId}/sections/`;
        await fs.mkdir(dir, { recursive: true });
        
        const content = `export const ${section}Section = ${JSON.stringify(data, null, 2)};\n`;
        await fs.writeFile(path.join(dir, `${section}.js`), content);
        
        // Update scope.json
        const scopePath = `../prospects/${userId}/scope.json`;
        let scope = {};
        
        try {
            const existing = await fs.readFile(scopePath, 'utf8');
            scope = JSON.parse(existing);
        } catch (e) {
            // File doesn't exist yet
            scope = {
                userId,
                sections: [],
                createdAt: new Date().toISOString()
            };
        }
        
        // Update section status
        const sectionIndex = scope.sections.findIndex(s => s.name === section);
        if (sectionIndex >= 0) {
            scope.sections[sectionIndex].approved = true;
            scope.sections[sectionIndex].approvedAt = new Date().toISOString();
        } else {
            scope.sections.push({
                name: section,
                file: `sections/${section}.js`,
                approved: true,
                approvedAt: new Date().toISOString()
            });
        }
        
        scope.updatedAt = new Date().toISOString();
        
        await fs.writeFile(scopePath, JSON.stringify(scope, null, 2));
        
        res.json({ success: true });
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
```

---

## ✅ STAGE 5: TESTING & VALIDATION

### Test Checklist

**Basic Functionality:**
- [ ] Chat interface loads
- [ ] Can send messages
- [ ] Nitya responds (check brain modules loading)
- [ ] Split-screen layout works
- [ ] Typing indicator appears

**Preview System:**
- [ ] Preview updates when data provided
- [ ] Sections render correctly
- [ ] Progress indicator updates
- [ ] Approve button appears when content ready

**File Uploads:**
- [ ] Upload button appears when requested
- [ ] Can select and upload image
- [ ] Image appears in preview
- [ ] File saved to correct directory

**Section Flow:**
- [ ] Hero → About → Services → Contact progression
- [ ] Each section approval saves data
- [ ] scope.json updates correctly
- [ ] Section files created

**Pricing Rule:**
- [ ] NO price numbers in personality.json ✓
- [ ] NO price numbers in sales.json ✓
- [ ] NO price numbers in web_landing.json ✓
- [ ] ALL price numbers ONLY in pricing.json ✓

---

## 🚦 RUNNING THE SYSTEM

### Terminal 1: Start Proxy Server
```bash
cd "C:\Users\matth\Documents\StarterNode 2.0\APP\NITYA_V1.1"
npm install
npm start
```

### Terminal 2: Serve Static Files
```bash
cd "C:\Users\matth\Documents\StarterNode 2.0\APP\NITYA_V1.1\public"
python -m http.server 8080
```

### Access
Open browser: `http://localhost:8080`

---

## 📝 COMMIT STRATEGY

After each stage completion:

```bash
git add .
git commit -m "STAGE X: [description]"
```

Example commits:
- `STAGE 1: Brain modules + proxy server complete`
- `STAGE 2: Split-screen interface built`
- `STAGE 3: Preview system working`
- `STAGE 4: File upload + save implemented`
- `STAGE 5: All tests passing`

---

## 🐛 TROUBLESHOOTING

**Nitya not responding?**
- Check console for errors
- Verify API key in config.js
- Ensure brain modules exist
- Check proxy server running

**Preview not updating?**
- Check sectionData object in console
- Verify renderPreview() being called
- Look for JavaScript errors

**Uploads failing?**
- Check prospects/ directory exists
- Verify multer installed
- Check file size < 5MB

**Pricing appearing in wrong place?**
- Search all JSON files for dollar signs
- Only pricing.json should have numbers

---

## 📚 REFERENCES

- **Design Tokens:** See global.css
- **Brain Module Structure:** See brain_modules/ templates
- **API Integration:** See server/routes/chat.js
- **File Management:** See server/utils/fileHandler.js

---

**BUILD DATE:** October 17, 2025  
**VERSION:** 1.1  
**STATUS:** Ready for execution

---

*Keep it modular. Keep it lightweight. Keep pricing centralized.*
