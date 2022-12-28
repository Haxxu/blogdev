import { Request, Response, NextFunction } from 'express';

export const validRegister = async (req: Request, res: Response, next: NextFunction) => {
    const { name, account, password } = req.body;

    const errors = [];

    if (!name) {
        errors.push('Please add your name.');
    } else if (name.length > 20) {
        errors.push('Your name is up to 20 chars long.');
    }

    if (!account) {
        errors.push('Please add your account.');
    } else if (!validatePhone(account) && !validateEmail(account)) {
        errors.push('Email or phone number is incorrect.');
    }

    if (password.length < 6) {
        errors.push('Password must be at least 6 chars.');
    }

    if (errors.length > 0) {
        return res.status(400).json({ msg: errors });
    }

    next();
};

export const validatePhone = (phone: string) => {
    const re = /^[+]/g;
    return re.test(phone);
};

export const validateEmail = (email: string) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};
