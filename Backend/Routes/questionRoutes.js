// Backend/Routes/questionRoutes.js
import express from 'express';
const router = express.Router();

// Add your routes here
router.get('/', (req, res) => {
  res.json({ message: 'Questions endpoint working' });
});

export default router;