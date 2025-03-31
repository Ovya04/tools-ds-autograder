const express = require('express');
const multer = require('multer');
const { cleanTempDir } = require('./utils/helpers');
// Remove the path import as it's not needed here
const { cleanTempDir } = require('./utils/helpers');

const app = express();
const upload = multer({ dest: 'temp/uploads/' });

// Routes
app.use('/api', upload.any(), require('./routes/api'));

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  cleanTempDir();
  res.status(500).json({ answer: 'Processing error' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  cleanTempDir();
});