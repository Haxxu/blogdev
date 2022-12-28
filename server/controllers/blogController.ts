import { Request, Response } from 'express';

import Blog from '../models/Blog';
import { IReqAuth } from '../config/interface';

const blogController = {
    createBlog: async (req: IReqAuth, res: Response) => {
        if (!req.user) {
            return res.status(400).json({ msg: 'Invalid Authentication.' });
        }
        try {
            const { title, content, description, thumbnail, category } = req.body;

            const newBlog = new Blog({
                user: req.user._id,
                title: title.toLowerCase(),
                content,
                description,
                thumbnail,
                category,
            });

            await newBlog.save();

            return res.status(200).json({ newBlog });
        } catch (err: any) {
            return res.status(500).json({ msg: err.message });
        }
    },

    getHomeBlogs: async (req: Request, res: Response) => {
        try {
            const blogs = await Blog.aggregate([
                // User
                {
                    $lookup: {
                        from: 'users',
                        let: { user_id: '$user' },
                        pipeline: [
                            { $match: { $expr: { $eq: ['$_id', '$$user_id'] } } },
                            { $project: { password: 0 } },
                        ],
                        as: 'user',
                    },
                },
                // Array -> Object
                { $unwind: '$user' },
                // Category
                {
                    $lookup: {
                        from: 'categories',
                        localField: 'category',
                        foreignField: '_id',
                        as: 'category',
                    },
                },
                // Array -> Object
                { $unwind: '$category' },
                // Sorting
                { $sort: { createdAt: -1 } },
                // Group by category
                {
                    $group: {
                        _id: '$category._id',
                        name: { $first: '$category.name' },
                        blogs: { $push: '$$ROOT' },
                        count: { $sum: 1 },
                    },
                },
                // Pagination for blogs
                {
                    $project: {
                        blogs: {
                            $slice: ['$blogs', 0, 4],
                        },
                        count: 1,
                        name: 1,
                    },
                },
            ]);
            res.json(blogs);
        } catch (err) {}
    },
};

export default blogController;
