const express = require('express');
const multer = require('multer');
const upload = multer(); // In-memory file handling

const app = express();

// Middleware
app.use(express.json()); // for application/json
app.use(express.urlencoded({ extended: true })); // for form-urlencoded

// POST endpoint
app.post('/api', upload.any(), (req, res) => {
  try {
    console.log('Received body:', req.body);
    console.log('Received files:', req.files);
    
    if (!req.body.question) {
      return res.status(400).json({ answer: 'Question parameter is required' });
    }

    // Process request here
    res.json({ 
      answer: `Received: ${req.body.question.substring(0, 50)}...`,
      filesReceived: req.files?.length || 0
    });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ answer: error.message });
  }
});

// Reject all non-POST methods
app.all('/api', (req, res) => {
  res.set('Allow', 'POST').status(405).json({
    error: 'Method Not Allowed',
    message: 'Only POST requests are accepted'
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`POST endpoint ready at http://localhost:${PORT}/api`);
});