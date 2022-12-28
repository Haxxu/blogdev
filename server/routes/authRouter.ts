import express from 'express';

import authController from '../controllers/AuthController';
import { validRegister } from '../middlewares/valid';

const router = express.Router();

// [POST] /api/register => register account
router.post('/register', validRegister, authController.register);

// [POST] /api/active => active account
router.post('/active', authController.activeAccount);

// [POST] /api/login => login account
router.post('/login', authController.login);

// [GET] /api/logout => logout account
router.get('/logout', authController.logout);

// [GET] /api/logout => logout account
router.get('/refresh_token', authController.refreshToken);

// [POST] /api/facebook_login => facebook login
router.post('/facebook_login', authController.facebookLogin);

export default router;
