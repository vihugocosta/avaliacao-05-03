const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { body, query, validationResult } = require('express-validator');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// 🔒 Security Middleware
// Helmet: Set various HTTP headers
app.use(helmet());

// CORS: Configure Cross-Origin access
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true,
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST'],
  optionsSuccessStatus: 200
}));

// Rate limiting: Prevent abuse and DDoS attacks
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later',
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply rate limiting to all requests
app.use(limiter);

// Body parser: Parse JSON and URL-encoded data
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Static files: Serve public assets with caching
app.use(express.static('public', {
  maxAge: '1d',
  etag: false
}));

// 🛣️ Routes with Security Validation

// Root route - serve HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Health check / Status endpoint
app.get('/api/status', (req, res) => {
  res.json({
    status: 'ok',
    message: 'API está funcionando!',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// API info endpoint with sanitization
app.get('/api/info', (req, res) => {
  res.json({
    app: 'Site de Exemplo CI/CD',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    node_version: process.version,
    secure: true
  });
});

// 🔄 Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      success: false,
      errors: errors.array() 
    });
  }
  
  // Default error response
  res.status(err.status || 500).json({
    success: false,
    message: process.env.NODE_ENV === 'production' 
      ? 'Internal Server Error' 
      : err.message
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found'
  });
});

// Start server only if running directly (not in tests)
let server;
if (require.main === module) {
  server = app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });
}

module.exports = app;
module.exports.server = server;
