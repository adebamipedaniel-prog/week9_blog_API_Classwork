// routes/postRoutes.js
const express = require('express');
const router = express.Router();
const requireAuth = require('../middlewares/requireAuth');
const postController = require('../controllers/postController');

// Protect every route in this router
router.use(requireAuth);

router.post('/', postController.createPost); // Ensure you set `author: req.user._id` inside the controller
router.get('/', postController.getPosts);
router.get('/:id', postController.getPostById);
router.put('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);

module.exports = router;