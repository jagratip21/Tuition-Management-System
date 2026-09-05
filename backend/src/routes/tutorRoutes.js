const express = require('express');
const router = express.Router();
const tutorController = require('../controllers/tutorController');
const authMiddleware = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/', tutorController.getAllTutors);
router.get('/:id', tutorController.getTutorById);
router.post('/', authMiddleware, upload.single('image'), tutorController.createTutor);
router.put('/:id', authMiddleware, upload.single('image'), tutorController.updateTutor);
router.delete('/:id', authMiddleware, tutorController.deleteTutor);

module.exports = router;
