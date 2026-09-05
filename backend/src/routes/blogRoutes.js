const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const authMiddleware = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/', blogController.getAllBlogs);
router.get('/:id', blogController.getBlogById);
router.get('/slug/:slug', blogController.getBlogBySlug);
router.post('/', authMiddleware, upload.single('coverImage'), blogController.createBlog);
router.put('/:id', authMiddleware, upload.single('coverImage'), blogController.updateBlog);
router.delete('/:id', authMiddleware, blogController.deleteBlog);

module.exports = router;
