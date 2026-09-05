const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const authMiddleware = require('../middleware/auth');

router.post('/', contactController.submitContactForm);
router.get('/', authMiddleware, contactController.getAllContactSubmissions);
router.put('/:id/status', authMiddleware, contactController.updateContactStatus);

module.exports = router;
