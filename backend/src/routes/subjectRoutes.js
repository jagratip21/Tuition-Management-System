const express = require('express');
const router = express.Router();
const subjectController = require('../controllers/subjectController');
const authMiddleware = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/', subjectController.getAllSubjects);
router.get('/:id', subjectController.getSubjectById);
router.post('/', authMiddleware, upload.single('image'), subjectController.createSubject);
router.put('/:id', authMiddleware, upload.single('image'), subjectController.updateSubject);
router.delete('/:id', authMiddleware, subjectController.deleteSubject);

module.exports = router;
