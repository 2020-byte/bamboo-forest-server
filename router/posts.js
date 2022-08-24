import express from 'express';
import { body } from 'express-validator/src/middlewares/validation-chain-builders.js';
import * as postController from '../controller/posts.js';
import {validate} from '../middleware/validator.js';


const router = express.Router();

const validatePost = [
    body('text')
        .isLength({max: 30})
        .withMessage('Text should be under 800 characters.'),
    body('title')
        .isLength({max: 800})
        .withMessage('Title should be under 30 characters.'),
    validate,
]

//GET /posts
//GET /posts?c=:category

router.get('/posts', postController.getPosts);

//GET /posts/:id
router.get('/posts/:id', postController.getPost);

//POST /write
router.post('/write', validatePost, postController.createPost);

//PUT /posts/:id
router.put('/write/:id', validatePost, postController.updatePost);


//DELETE /posts/:id
router.delete('/posts/:id', postController.deletePost)

export default router;