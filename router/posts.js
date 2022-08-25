import express from 'express';
import { body } from 'express-validator/src/middlewares/validation-chain-builders.js';
import * as postController from '../controller/posts.js';
import {validate} from '../middleware/validator.js';
import { isAuth } from '../middleware/auth.js';


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

router.get('/posts', isAuth, postController.getPosts);

//GET /posts/:id
router.get('/posts/:id', isAuth, postController.getPost);

//POST /write
router.post('/write', isAuth, validatePost, postController.createPost);

//PUT /posts/:id
router.put('/write/:id', isAuth, validatePost, postController.updatePost);


//DELETE /posts/:id
router.delete('/posts/:id', isAuth, postController.deletePost)

export default router;