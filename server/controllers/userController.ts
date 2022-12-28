import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';

import { IReqAuth } from '../config/interface';
import User from '../models/User';

const userController = {
    updateUser: async (req: IReqAuth, res: Response) => {
        if (!req.user) return res.status(400).json({ msg: 'Invalid Authentication' });
        try {
            const { avatar, name } = req.body;

            const user = await User.findOneAndUpdate(
                { _id: req.user._id },
                {
                    avatar,
                    name,
                }
            );

            return res.json({ msg: 'Update success!' });
        } catch (err: any) {
            return res.status(500).json({ msg: err.message });
        }
    },

    resetPassword: async (req: IReqAuth, res: Response) => {
        if (!req.user) return res.status(400).json({ msg: 'Invalid Authentication' });

        if (req.user.type !== 'register')
            return res.status(400).json({ msg: 'Invalid Authentication' });
        try {
            const { password } = req.body;
            const passwordHash = await bcrypt.hash(password, 12);

            const user = await User.findOneAndUpdate(
                { _id: req.user._id },
                {
                    password: passwordHash,
                }
            );

            return res.json({ msg: 'Reset password success!' });
        } catch (err: any) {
            return res.status(500).json({ msg: err.message });
        }
    },
};

export default userController;
