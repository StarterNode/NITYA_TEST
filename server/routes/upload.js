const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();

// Configure storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Detect if it's a logo (icon) or regular image
        const isLogo = file.fieldname === 'logo' || 
                       file.originalname.toLowerCase().includes('logo');
        
        const subdir = isLogo ? 'icons' : 'images';
        const dir = `../prospects/${req.body.userId}/assets/${subdir}/`;
        
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
    limits: { fileSize: 5 * 1024 * 1024 },
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
        // Determine if it was saved as icon or image
        const isLogo = req.file.fieldname === 'logo' || 
                       req.file.originalname.toLowerCase().includes('logo');
        const subdir = isLogo ? 'icons' : 'images';
        
        res.json({
            success: true,
            url: `/prospects/${req.body.userId}/assets/${subdir}/${req.file.filename}`,
            filename: req.file.filename,
            type: isLogo ? 'logo' : 'image'
        });
        
        console.log(`✅ ${isLogo ? 'Logo' : 'Image'} uploaded: ${req.file.filename}`);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
