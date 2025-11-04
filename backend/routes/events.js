const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const pool = require('../db/db');
const authMiddleware = require('../middleware/auth');

// Get all active events (public endpoint)
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM events WHERE is_active = true ORDER BY display_order ASC, event_date ASC, event_time ASC'
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

// Get all events including inactive (admin only)
router.get('/admin/all', authMiddleware, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM events ORDER BY display_order ASC, event_date ASC, event_time ASC'
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

// Create event (protected endpoint)
router.post('/',
  authMiddleware,
  [
    body('title_de').trim().notEmpty().withMessage('German title is required'),
    body('title_en').trim().notEmpty().withMessage('English title is required'),
    body('event_date').isISO8601().withMessage('Valid date is required'),
    body('event_time').matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/).withMessage('Valid time is required (HH:MM or HH:MM:SS)'),
    body('location_de').trim().notEmpty().withMessage('German location is required'),
    body('location_en').trim().notEmpty().withMessage('English location is required'),
    body('description_de').trim().notEmpty().withMessage('German description is required'),
    body('description_en').trim().notEmpty().withMessage('English description is required')
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { title_de, title_en, event_date, event_time, location_de, location_en, description_de, description_en, is_active } = req.body;

      const result = await pool.query(
        `INSERT INTO events (title_de, title_en, event_date, event_time, location_de, location_en, description_de, description_en, is_active, display_order)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, (SELECT COALESCE(MAX(display_order), 0) + 1 FROM events))
         RETURNING *`,
        [title_de, title_en, event_date, event_time, location_de, location_en, description_de, description_en, is_active !== 'false']
      );

      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error('Error creating event:', error);
      res.status(500).json({ error: 'Failed to create event' });
    }
  }
);

// Update event (protected endpoint)
router.put('/:id',
  authMiddleware,
  [
    body('title_de').optional().trim().notEmpty(),
    body('title_en').optional().trim().notEmpty(),
    body('event_date').optional().isISO8601(),
    body('event_time').optional().matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/),
    body('location_de').optional().trim().notEmpty(),
    body('location_en').optional().trim().notEmpty(),
    body('description_de').optional().trim().notEmpty(),
    body('description_en').optional().trim().notEmpty()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { id } = req.params;
      const { title_de, title_en, event_date, event_time, location_de, location_en, description_de, description_en, is_active } = req.body;

      const existing = await pool.query('SELECT * FROM events WHERE id = $1', [id]);
      if (existing.rows.length === 0) {
        return res.status(404).json({ error: 'Event not found' });
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
      if (event_date !== undefined) {
        updates.push(`event_date = $${paramCount++}`);
        values.push(event_date);
      }
      if (event_time !== undefined) {
        updates.push(`event_time = $${paramCount++}`);
        values.push(event_time);
      }
      if (location_de !== undefined) {
        updates.push(`location_de = $${paramCount++}`);
        values.push(location_de);
      }
      if (location_en !== undefined) {
        updates.push(`location_en = $${paramCount++}`);
        values.push(location_en);
      }
      if (description_de !== undefined) {
        updates.push(`description_de = $${paramCount++}`);
        values.push(description_de);
      }
      if (description_en !== undefined) {
        updates.push(`description_en = $${paramCount++}`);
        values.push(description_en);
      }
      if (is_active !== undefined) {
        updates.push(`is_active = $${paramCount++}`);
        values.push(is_active === 'true' || is_active === true);
      }

      if (updates.length === 0) {
        return res.status(400).json({ error: 'No fields to update' });
      }

      values.push(id);
      const query = `UPDATE events SET ${updates.join(', ')} WHERE id = $${paramCount} RETURNING *`;

      const result = await pool.query(query, values);
      res.json(result.rows[0]);
    } catch (error) {
      console.error('Error updating event:', error);
      res.status(500).json({ error: 'Failed to update event' });
    }
  }
);

// Delete event (protected endpoint)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const existing = await pool.query('SELECT * FROM events WHERE id = $1', [id]);
    if (existing.rows.length === 0) {
      return res.status(404).json({ error: 'Event not found' });
    }

    await pool.query('DELETE FROM events WHERE id = $1', [id]);
    res.json({ success: true, message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ error: 'Failed to delete event' });
  }
});

module.exports = router;
