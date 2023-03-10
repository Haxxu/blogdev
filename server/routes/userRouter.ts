import express from 'express';

import userController from '../controllers/userController';
import { validRegister } from '../middlewares/valid';
import auth from '../middlewares/auth';

const router = express.Router();

router.patch('/user', auth, userController.updateUser);

router.patch('/reset_password', auth, userController.resetPassword);

export default router;
