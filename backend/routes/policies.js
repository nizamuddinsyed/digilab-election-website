const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const pool = require('../db/db');
const authMiddleware = require('../middleware/auth');

// Get all active policies (public endpoint)
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM policies WHERE is_active = true ORDER BY display_order ASC'
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching policies:', error);
    res.status(500).json({ error: 'Failed to fetch policies' });
  }
});

// Get all policies including inactive (admin only)
router.get('/admin/all', authMiddleware, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM policies ORDER BY display_order ASC'
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching policies:', error);
    res.status(500).json({ error: 'Failed to fetch policies' });
  }
});

// Create policy (protected endpoint)
router.post('/',
  authMiddleware,
  [
    body('title_de').trim().notEmpty().withMessage('German title is required'),
    body('title_en').trim().notEmpty().withMessage('English title is required'),
    body('description_de').trim().notEmpty().withMessage('German description is required'),
    body('description_en').trim().notEmpty().withMessage('English description is required'),
    body('color').isIn(['purple', 'silver', 'teal']).withMessage('Invalid color')
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { title_de, title_en, description_de, description_en, color, is_active } = req.body;

      const result = await pool.query(
        `INSERT INTO policies (title_de, title_en, description_de, description_en, color, is_active, display_order)
         VALUES ($1, $2, $3, $4, $5, $6, (SELECT COALESCE(MAX(display_order), 0) + 1 FROM policies))
         RETURNING *`,
        [title_de, title_en, description_de, description_en, color, is_active !== 'false']
      );

      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error('Error creating policy:', error);
      res.status(500).json({ error: 'Failed to create policy' });
    }
  }
);

// Update policy (protected endpoint)
router.put('/:id',
  authMiddleware,
  [
    body('title_de').optional().trim().notEmpty(),
    body('title_en').optional().trim().notEmpty(),
    body('description_de').optional().trim().notEmpty(),
    body('description_en').optional().trim().notEmpty(),
    body('color').optional().isIn(['purple', 'silver', 'teal'])
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { id } = req.params;
      const { title_de, title_en, description_de, description_en, color, is_active } = req.body;

      const existing = await pool.query('SELECT * FROM policies WHERE id = $1', [id]);
      if (existing.rows.length === 0) {
        return res.status(404).json({ error: 'Policy not found' });
      }

      const updates = [];
      const values = [];
      let paramCount = 1;

      if (title_de !== undefined) {
        updates.push(`title_de = $${paramCount++}`);
        values.push(title_de);
      }
      if (title_en !== undefined) {
        updates.push(`title_en = $${paramCount++}`);
        values.push(title_en);
      }
      if (description_de !== undefined) {
        updates.push(`description_de = $${paramCount++}`);
        values.push(description_de);
      }
      if (description_en !== undefined) {
        updates.push(`description_en = $${paramCount++}`);
        values.push(description_en);
      }
      if (color !== undefined) {
        updates.push(`color = $${paramCount++}`);
        values.push(color);
      }
      if (is_active !== undefined) {
        updates.push(`is_active = $${paramCount++}`);
        values.push(is_active === 'true' || is_active === true);
      }

      if (updates.length === 0) {
        return res.status(400).json({ error: 'No fields to update' });
      }

      values.push(id);
      const query = `UPDATE policies SET ${updates.join(', ')} WHERE id = $${paramCount} RETURNING *`;

      const result = await pool.query(query, values);
      res.json(result.rows[0]);
    } catch (error) {
      console.error('Error updating policy:', error);
      res.status(500).json({ error: 'Failed to update policy' });
    }
  }
);

// Delete policy (protected endpoint)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const existing = await pool.query('SELECT * FROM policies WHERE id = $1', [id]);
    if (existing.rows.length === 0) {
      return res.status(404).json({ error: 'Policy not found' });
    }

    await pool.query('DELETE FROM policies WHERE id = $1', [id]);
    res.json({ success: true, message: 'Policy deleted successfully' });
  } catch (error) {
    console.error('Error deleting policy:', error);
    res.status(500).json({ error: 'Failed to delete policy' });
  }
});

module.exports = router;
