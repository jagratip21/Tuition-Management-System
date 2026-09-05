const express = require('express');
const router = express.Router();
const enquiryController = require('../controllers/enquiryController');
const authMiddleware = require('../middleware/auth');

router.post('/hire-tutor', enquiryController.submitHireTutorEnquiry);
router.get('/hire-tutor', authMiddleware, enquiryController.getHireTutorEnquiries);

router.post('/join-as-tutor', enquiryController.submitJoinAsTutorEnquiry);
router.get('/join-as-tutor', authMiddleware, enquiryController.getJoinAsTutorEnquiries);

router.put('/:type/:id/status', authMiddleware, enquiryController.updateEnquiryStatus);

router.delete('/:type/:id', authMiddleware, enquiryController.deleteEnquiry);

module.exports = router;
