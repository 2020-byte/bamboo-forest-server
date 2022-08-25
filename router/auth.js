import express from 'express';
import {body} from 'express-validator';
import {validate} from '../middleware/validator.js';
import { isAuth } from '../middleware/auth.js';
import * as authController from '../controller/auth.js';

const router = express.Router();

const validateCredential = [
    body('email').isEmail().normalizeEmail().withMessage('Invalid email'),
    validate,
    body('password')
        .trim()
        .isLength({min:8})
        .withMessage('password should be at least 8 characters'),
    validate,
];

const validateSignup = [
    ...validateCredential,
    body('username')
        .isLength({min:4, max:12})
        .withMessage('username should be 4~12 characters '),
];

router.post('/sign_up', validateSignup, authController.signup);

router.post('/login', validateCredential, authController.login);

router.get('/me', isAuth, authController.me);

export default router;