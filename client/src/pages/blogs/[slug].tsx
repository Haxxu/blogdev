import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '~/hooks';
import { RootStore, IParams, IBlog } from '~/utils/TypeScript';
import { getBlogsByCategoryId } from '~/redux/actions/blogAction';

import NotFound from '~/components/global/NotFound';
import Pagination from '~/components/global/Pagination';
import CardVert from '~/components/cards/CardVert';

const BlogsByCategory = () => {
    const [categoryId, setCategoryId] = useState('');
    const [blogs, setBlogs] = useState<IBlog[]>();
    const [totalPage, setTotalPage] = useState(0);

    const { slug }: IParams = useParams();
    const { categories, blogsCategory } = useAppSelector((state: RootStore) => state);
    const dispatch = useAppDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const { search } = location;

    useEffect(() => {
        const category = categories.find((item) => item.name === slug);
        if (category) setCategoryId(category._id);
    }, [categories, slug]);

    useEffect(() => {
        if (!categoryId) return;

        if (blogsCategory.every((item) => item.id !== categoryId)) {
            dispatch(getBlogsByCategoryId(categoryId, search));
        } else {
            const data = blogsCategory.find((item) => item.id === categoryId);
            if (!data) return;

            setBlogs(data.blogs);
            setTotalPage(data.totalPage);
            if (data.search) {
                navigate(data.search);
            }
        }
    }, [categoryId, dispatch, navigate, blogsCategory, search]);

    const handlePagination = (num: number) => {
        const search = `?page=${num}`;
        dispatch(getBlogsByCategoryId(categoryId, search));
    };

    if (!blogs) return <NotFound />;

    return (
        <div className="blogs_category">
            <div className="show_blogs">
                {blogs?.map((blog) => (
                    <CardVert blog={blog} key={blog._id} />
                ))}
            </div>

            {totalPage > 1 && <Pagination totalPage={totalPage} callback={handlePagination} />}
        </div>
    );
};

export default BlogsByCategory;
