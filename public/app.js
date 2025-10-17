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