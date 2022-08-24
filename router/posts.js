import express from 'express';
import * as postController from '../controller/posts.js';

const router = express.Router();

//GET /posts
//GET /posts?c=:category

router.get('/posts', postController.getPosts);

//GET /posts/:id
router.get('/posts/:id', postController.getPost);

//POST /write
router.post('/write', postController.createPost);

//PUT /posts/:id
router.put('/write/:id', postController.updatePost);


//DELETE /posts/:id
router.delete('/posts/:id', postController.deletePost)

export default router;