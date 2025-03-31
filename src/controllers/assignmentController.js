const { 
    processGA1Question,
    processGA2Question,
    processGA3Question,
    processGA4Question,
    processGA5Question 
  } = require('../services/fileService');
  
  const processQuestion = async (req, res) => {
    try {
      const { question } = req.body;
      const files = req.files || [];
      console.log("Received files:", req.files); // Add this line
    console.log("Received question:", req.body.question);
      
      let answer;
      if (/GA1|Graded Assignment 1/i.test(question)) {
        answer = await processGA1Question(question, files);
      }
      else if (/GA2|Graded Assignment 2/i.test(question)) {
        answer = await processGA2Question(question);
      }
      else if (/GA3|Graded Assignment 3/i.test(question)) {
        answer = await processGA3Question(question);
      }
      else if (/GA4|Graded Assignment 4/i.test(question)) {
        answer = await processGA4Question(question);
      }
      else if (/GA5|Graded Assignment 5/i.test(question)) {
        answer = await processGA5Question(question, files);
      }
      else {
        answer = 'Could not determine assignment number';
      }
      if (!question) {
        return res.status(400).json({ answer: 'Question is required' });
      }
      res.json({ answer });
    } catch (error) {
      console.error('Error:', error);
      res.status(400).json({ answer: 'Error processing question' });
    }
  };
  module.exports = { processQuestion };