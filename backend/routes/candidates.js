const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const pool = require('../db/db');
const authMiddleware = require('../middleware/auth');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../../public/uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'candidate-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files (JPEG, PNG, WebP) are allowed'));
    }
  }
});

// Get all candidates (public endpoint)
router.get('/', async (req, res) => {
  try {
    const { active } = req.query;
    
    let query = 'SELECT * FROM candidates';
    const params = [];
    
    if (active === 'true') {
      query += ' WHERE is_active = true';
    }
    
    query += ' ORDER BY created_at DESC';
    
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching candidates:', error);
    res.status(500).json({ error: 'Failed to fetch candidates' });
  }
});

// Get single candidate by ID (public endpoint)
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM candidates WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Candidate not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching candidate:', error);
    res.status(500).json({ error: 'Failed to fetch candidate' });
  }
});

// Create new candidate (protected endpoint)
router.post('/',
  authMiddleware,
  upload.single('photo'),
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('position').trim().notEmpty().withMessage('Position is required'),
    body('bio_de').trim().notEmpty().withMessage('German biography is required'),
    body('bio_en').trim().notEmpty().withMessage('English biography is required'),
    body('goals_de').trim().notEmpty().withMessage('German goals are required'),
    body('goals_en').trim().notEmpty().withMessage('English goals are required'),
    body('email').isEmail().withMessage('Valid email is required')
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { name, position, bio_de, bio_en, goals_de, goals_en, email, social_links, is_active } = req.body;
      const photo_url = req.file ? `/uploads/${req.file.filename}` : '/uploads/default-candidate.jpg';
      
      // Parse social_links if it's a string
      let parsedSocialLinks = {};
      if (social_links) {
        try {
          parsedSocialLinks = typeof social_links === 'string' ? JSON.parse(social_links) : social_links;
        } catch (e) {
          parsedSocialLinks = {};
        }
      }

      const result = await pool.query(
        `INSERT INTO candidates (name, position, bio_de, bio_en, goals_de, goals_en, email, social_links, photo_url, is_active)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
         RETURNING *`,
        [name, position, bio_de, bio_en, goals_de, goals_en, email, JSON.stringify(parsedSocialLinks), photo_url, is_active !== 'false']
      );

      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error('Error creating candidate:', error);
      res.status(500).json({ error: 'Failed to create candidate' });
    }
  }
);

// Update candidate (protected endpoint)
router.put('/:id',
  authMiddleware,
  upload.single('photo'),
  [
    body('name').optional().trim().notEmpty(),
    body('position').optional().trim().notEmpty(),
    body('bio_de').optional().trim().notEmpty(),
    body('bio_en').optional().trim().notEmpty(),
    body('goals_de').optional().trim().notEmpty(),
    body('goals_en').optional().trim().notEmpty(),
    body('email').optional().isEmail()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { id } = req.params;
      const { name, position, bio_de, bio_en, goals_de, goals_en, email, social_links, is_active } = req.body;
      
      // Get existing candidate
      const existing = await pool.query('SELECT * FROM candidates WHERE id = $1', [id]);
      if (existing.rows.length === 0) {
        return res.status(404).json({ error: 'Candidate not found' });
      }

      // Prepare update fields
      const updates = [];
      const values = [];
      let paramCount = 1;

      if (name !== undefined) {
        updates.push(`name = $${paramCount++}`);
        values.push(name);
      }
      if (position !== undefined) {
        updates.push(`position = $${paramCount++}`);
        values.push(position);
      }
      if (bio_de !== undefined) {
        updates.push(`bio_de = $${paramCount++}`);
        values.push(bio_de);
      }
      if (bio_en !== undefined) {
        updates.push(`bio_en = $${paramCount++}`);
        values.push(bio_en);
      }
      if (goals_de !== undefined) {
        updates.push(`goals_de = $${paramCount++}`);
        values.push(goals_de);
      }
      if (goals_en !== undefined) {
        updates.push(`goals_en = $${paramCount++}`);
        values.push(goals_en);
      }
      if (email !== undefined) {
        updates.push(`email = $${paramCount++}`);
        values.push(email);
      }
      if (social_links !== undefined) {
        let parsedSocialLinks = {};
        try {
          parsedSocialLinks = typeof social_links === 'string' ? JSON.parse(social_links) : social_links;
        } catch (e) {
          parsedSocialLinks = {};
        }
        updates.push(`social_links = $${paramCount++}`);
        values.push(JSON.stringify(parsedSocialLinks));
      }
      if (is_active !== undefined) {
        updates.push(`is_active = $${paramCount++}`);
        values.push(is_active === 'true' || is_active === true);
      }
      if (req.file) {
        updates.push(`photo_url = $${paramCount++}`);
        values.push(`/uploads/${req.file.filename}`);
        
        // Delete old photo if it exists and is not the default
        const oldPhotoUrl = existing.rows[0].photo_url;
        if (oldPhotoUrl && oldPhotoUrl !== '/uploads/default-candidate.jpg') {
          const oldPhotoPath = path.join(__dirname, '../../public', oldPhotoUrl);
          if (fs.existsSync(oldPhotoPath)) {
            fs.unlinkSync(oldPhotoPath);
          }
        }
      }

      if (updates.length === 0) {
        return res.status(400).json({ error: 'No fields to update' });
      }

      values.push(id);
      const query = `UPDATE candidates SET ${updates.join(', ')} WHERE id = $${paramCount} RETURNING *`;
      
      const result = await pool.query(query, values);
      res.json(result.rows[0]);
    } catch (error) {
      console.error('Error updating candidate:', error);
      res.status(500).json({ error: 'Failed to update candidate' });
    }
  }
);

// Delete candidate (protected endpoint)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    
    // Get candidate to delete photo
    const candidate = await pool.query('SELECT photo_url FROM candidates WHERE id = $1', [id]);
    
    if (candidate.rows.length === 0) {
      return res.status(404).json({ error: 'Candidate not found' });
    }

    // Delete photo if it exists and is not the default
    const photoUrl = candidate.rows[0].photo_url;
    if (photoUrl && photoUrl !== '/uploads/default-candidate.jpg') {
      const photoPath = path.join(__dirname, '../../public', photoUrl);
      if (fs.existsSync(photoPath)) {
        fs.unlinkSync(photoPath);
      }
    }

    // Delete candidate from database
    await pool.query('DELETE FROM candidates WHERE id = $1', [id]);
    
    res.json({ success: true, message: 'Candidate deleted successfully' });
  } catch (error) {
    console.error('Error deleting candidate:', error);
    res.status(500).json({ error: 'Failed to delete candidate' });
  }
});

// Get statistics (protected endpoint)
router.get('/admin/stats', authMiddleware, async (req, res) => {
  try {
    const totalResult = await pool.query('SELECT COUNT(*) FROM candidates');
    const activeResult = await pool.query('SELECT COUNT(*) FROM candidates WHERE is_active = true');
    const inactiveResult = await pool.query('SELECT COUNT(*) FROM candidates WHERE is_active = false');
    
    res.json({
      total: parseInt(totalResult.rows[0].count),
      active: parseInt(activeResult.rows[0].count),
      inactive: parseInt(inactiveResult.rows[0].count)
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
});

module.exports = router;
