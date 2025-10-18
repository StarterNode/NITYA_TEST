const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { userId, pages } = req.body;
        
        if (!userId || !pages) {
            return res.status(400).json({ error: 'userId and pages required' });
        }
        
        // Create sitemap structure
        const sitemap = {
            pages: pages.map((page, index) => ({
                name: page,
                slug: page.toLowerCase().replace(/\s+/g, '-'),
                order: index + 1
            })),
            updatedAt: new Date().toISOString()
        };
        
        // Ensure directory exists
        const dir = path.join(__dirname, `../../prospects/${userId}`);
        await fs.mkdir(dir, { recursive: true });
        
        // Write sitemap.json
        const filePath = path.join(dir, 'sitemap.json');
        await fs.writeFile(filePath, JSON.stringify(sitemap, null, 2));
        
        console.log(`✅ Sitemap updated for ${userId}`);
        res.json({ success: true, sitemap });
        
    } catch (error) {
        console.error('❌ Error updating sitemap:', error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
