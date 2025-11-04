const { body, validationResult } = require('express-validator');

// Test validation rules
const testValidation = async () => {
  console.log('Testing validation rules...');
  
  // Mock request object
  const req = {
    body: {
      name: 'Test Candidate',
      position: 'Test Position',
      bio_de: 'German biography',
      bio_en: 'English biography',
      goals_de: '',  // Empty goals
      goals_en: '',  // Empty goals
      email: ''      // Empty email
    }
  };
  
  // Apply validation rules
  const validationRules = [
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
  ];
  
  // Run validation
  for (const rule of validationRules) {
    await rule(req, {}, () => {});
  }
  
  const errors = validationResult(req);
  console.log('Validation errors:', errors.array());
  console.log('Is valid:', errors.isEmpty());
};

testValidation();