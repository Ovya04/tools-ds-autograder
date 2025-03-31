const fs = require('fs');
const path = require('path');

const cleanTempDir = () => {
  const tempDir = path.join(__dirname, '../../temp');
  if (fs.existsSync(tempDir)) {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
};

module.exports = { cleanTempDir };