const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { userId, messages } = req.body;
        
        if (!userId || !messages) {
            return res.status(400).json({ error: 'userId and messages required' });
        }
        
        // Ensure directory exists
        const dir = path.join(__dirname, `../../prospects/${userId}`);
        await fs.mkdir(dir, { recursive: true });
        
        // Create conversation structure
        const conversation = {
            userId: userId,
            messages: messages,
            messageCount: messages.length,
            savedAt: new Date().toISOString()
        };
        
        // Write conversation.json
        const filePath = path.join(dir, 'conversation.json');
        await fs.writeFile(filePath, JSON.stringify(conversation, null, 2));
        
        console.log(`✅ Conversation saved for ${userId} (${messages.length} messages)`);
        res.json({ success: true, messageCount: messages.length });
        
    } catch (error) {
        console.error('❌ Error saving conversation:', error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
