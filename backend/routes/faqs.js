const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const pool = require('../db/db');
const authMiddleware = require('../middleware/auth');

// Get all active FAQs (public endpoint)
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM faqs WHERE is_active = true ORDER BY display_order ASC'
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    res.status(500).json({ error: 'Failed to fetch FAQs' });
  }
});

// Get all FAQs including inactive (admin only)
router.get('/admin/all', authMiddleware, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM faqs ORDER BY display_order ASC'
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    res.status(500).json({ error: 'Failed to fetch FAQs' });
  }
});

// Create FAQ (protected endpoint)
router.post('/',
  authMiddleware,
  [
    body('question_de').trim().notEmpty().withMessage('German question is required'),
    body('question_en').trim().notEmpty().withMessage('English question is required'),
    body('answer_de').trim().notEmpty().withMessage('German answer is required'),
    body('answer_en').trim().notEmpty().withMessage('English answer is required')
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { question_de, question_en, answer_de, answer_en, is_active } = req.body;

      const result = await pool.query(
        `INSERT INTO faqs (question_de, question_en, answer_de, answer_en, is_active, display_order)
         VALUES ($1, $2, $3, $4, $5, (SELECT COALESCE(MAX(display_order), 0) + 1 FROM faqs))
         RETURNING *`,
        [question_de, question_en, answer_de, answer_en, is_active !== 'false']
      );

      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error('Error creating FAQ:', error);
      res.status(500).json({ error: 'Failed to create FAQ' });
    }
  }
);

// Update FAQ (protected endpoint)
router.put('/:id',
  authMiddleware,
  [
    body('question_de').optional().trim().notEmpty(),
    body('question_en').optional().trim().notEmpty(),
    body('answer_de').optional().trim().notEmpty(),
    body('answer_en').optional().trim().notEmpty()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { id } = req.params;
      const { question_de, question_en, answer_de, answer_en, is_active } = req.body;

      const existing = await pool.query('SELECT * FROM faqs WHERE id = $1', [id]);
      if (existing.rows.length === 0) {
        return res.status(404).json({ error: 'FAQ not found' });
      }

      const updates = [];
      const values = [];
      let paramCount = 1;

      if (question_de !== undefined) {
        updates.push(`question_de = $${paramCount++}`);
        values.push(question_de);
      }
      if (question_en !== undefined) {
        updates.push(`question_en = $${paramCount++}`);
        values.push(question_en);
      }
      if (answer_de !== undefined) {
        updates.push(`answer_de = $${paramCount++}`);
        values.push(answer_de);
      }
      if (answer_en !== undefined) {
        updates.push(`answer_en = $${paramCount++}`);
        values.push(answer_en);
      }
      if (is_active !== undefined) {
        updates.push(`is_active = $${paramCount++}`);
        values.push(is_active === 'true' || is_active === true);
      }

      if (updates.length === 0) {
        return res.status(400).json({ error: 'No fields to update' });
      }

      values.push(id);
      const query = `UPDATE faqs SET ${updates.join(', ')} WHERE id = $${paramCount} RETURNING *`;

      const result = await pool.query(query, values);
      res.json(result.rows[0]);
    } catch (error) {
      console.error('Error updating FAQ:', error);
      res.status(500).json({ error: 'Failed to update FAQ' });
    }
  }
);

// Delete FAQ (protected endpoint)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const existing = await pool.query('SELECT * FROM faqs WHERE id = $1', [id]);
    if (existing.rows.length === 0) {
      return res.status(404).json({ error: 'FAQ not found' });
    }

    await pool.query('DELETE FROM faqs WHERE id = $1', [id]);
    res.json({ success: true, message: 'FAQ deleted successfully' });
  } catch (error) {
    console.error('Error deleting FAQ:', error);
    res.status(500).json({ error: 'Failed to delete FAQ' });
    }
  }
);

module.exports = router;
