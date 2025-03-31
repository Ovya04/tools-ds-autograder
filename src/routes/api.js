const express = require('express');
const router = express.Router();
const assignmentController = require('../controllers/assignmentController');

// Make sure the controller function is properly imported
router.post('/', (req, res, next) => {
  assignmentController.processQuestion(req, res).catch(next);
});

module.exports = router;