const express = require('express');
const cors = require('cors');
const chatRoute = require('./routes/chat');
const uploadRoute = require('./routes/upload');
const saveRoute = require('./routes/save');

// Phase 3: Data Collection Routes
const updateSitemapRoute = require('./routes/update-sitemap');
const updateMetadataRoute = require('./routes/update-metadata');
const updateStylesRoute = require('./routes/update-styles');
const saveConversationRoute = require('./routes/save-conversation');

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

// Phase 3: Data Collection Routes
app.use('/api/update-sitemap', updateSitemapRoute);
app.use('/api/update-metadata', updateMetadataRoute);
app.use('/api/update-styles', updateStylesRoute);
app.use('/api/save-conversation', saveConversationRoute);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Nitya AI Proxy Server running on http://localhost:${PORT}`);
});
