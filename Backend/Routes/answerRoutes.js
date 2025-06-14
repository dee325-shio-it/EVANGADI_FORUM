import express from 'express';
const router = express.Router();

// Basic route example
router.get('/', (req, res) => {
  res.json({ message: 'Answers endpoint working' });
});

export default router;