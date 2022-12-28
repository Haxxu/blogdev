import { Request, Response } from 'express';

import Category from '../models/Category';
import { IReqAuth } from '../config/interface';

const categoryController = {
    createCategory: async (req: IReqAuth, res: Response) => {
        if (!req.user) return res.status(400).json({ msg: 'Invalid Authentication.' });
        if (req.user.role !== 'admin') {
            return res.status(403).json({ msg: "You don't have permission to do this action." });
        }
        try {
            const name = req.body.name.toLowerCase();

            const category = await Category.findOne({ name });
            if (category) return res.status(404).json({ msg: 'This category already exists.' });

            const newCategory = new Category({ name });
            await newCategory.save();

            return res.status(200).json({ newCategory, msg: 'Create category successfully' });
        } catch (err: any) {
            let errMsg;

            if (err.code === 11000) {
                errMsg = Object.keys(err.keyValue)[0] + ' already exists';
            } else {
                let name = Object.keys(err.errors)[0];
                errMsg = err.errors[`${name}`].message;
            }
            return res.status(500).json({ msg: errMsg });
        }
    },

    getCategories: async (req: Request, res: Response) => {
        try {
            const categories = await Category.find().sort('-createdAt');
            return res.status(200).json({ categories, msg: 'Get categories successfully' });
        } catch (err: any) {
            return res.status(500).json({ msg: err.message });
        }
    },

    updateCategory: async (req: IReqAuth, res: Response) => {
        if (!req.user) return res.status(400).json({ msg: 'Invalid Authentication.' });
        if (req.user.role !== 'admin') {
            return res.status(403).json({ msg: "You don't have permission to do this action." });
        }
        try {
            const category = await Category.findOneAndUpdate(
                { _id: req.params.id },
                { name: req.body.name.toLowerCase() },
                { new: true }
            );

            return res.status(200).json({ category, msg: 'Update category successfully' });
        } catch (err: any) {
            return res.status(500).json({ msg: err.message });
        }
    },

    deleteCategory: async (req: IReqAuth, res: Response) => {
        if (!req.user) return res.status(400).json({ msg: 'Invalid Authentication.' });
        if (req.user.role !== 'admin') {
            return res.status(403).json({ msg: "You don't have permission to do this action." });
        }
        try {
            const category = await Category.findByIdAndDelete(req.params.id);

            return res.status(200).json({ category, msg: 'Delete category successfully' });
        } catch (err: any) {
            return res.status(500).json({ msg: err.message });
        }
    },
};

export default categoryController;
