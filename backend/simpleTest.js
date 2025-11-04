const express = require('express');
const { body, validationResult } = require('express-validator');

const app = express();
app.use(express.json());

// Simple test endpoint
app.post('/test-candidate', 
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('position').trim().notEmpty().withMessage('Position is required'),
    body('bio_de').trim().notEmpty().withMessage('German biography is required'),
    body('bio_en').trim().notEmpty().withMessage('English biography is required'),
    body('goals_de').optional().custom((value) => {
      if (value === undefined || value === null || value === '') {
        return true; // Allow empty values
      }
      return typeof value === 'string' && value.trim().length > 0;
    }).withMessage('German goals must be a non-empty string if provided'),
    body('goals_en').optional().custom((value) => {
      if (value === undefined || value === null || value === '') {
        return true; // Allow empty values
      }
      return typeof value === 'string' && value.trim().length > 0;
    }).withMessage('English goals must be a non-empty string if provided'),
    body('email').optional().isEmail().withMessage('Valid email is required')
  ],
  (req, res) => {
    const errors = validationResult(req);
    console.log('Request body:', req.body);
    console.log('Validation errors:', errors.array());
    
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    res.status(200).json({ message: 'Validation passed', data: req.body });
  }
);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Test server running on port ${PORT}`);
});