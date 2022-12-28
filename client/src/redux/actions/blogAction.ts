import { Dispatch } from '@reduxjs/toolkit';

import { IBlog } from '~/utils/TypeScript';
import { imageUpload } from '~/utils/ImageUpload';
import { postAPI, getAPI } from '~/utils/FetchData';
import { ALERT, IAlertType } from '~/redux/types/alertType';
import { GET_HOME_BLOGS, IGetHomeBlogsType } from '~/redux/types/blogType';

export const createBlog = (blog: IBlog, token: string) => {
    return async (dispatch: Dispatch<IAlertType>) => {
        let url;
        try {
            dispatch({ type: ALERT, payload: { loading: true } });

            if (typeof blog.thumbnail !== 'string') {
                const photo = await imageUpload(blog.thumbnail);
                url = photo.url;
            } else {
                url = blog.thumbnail;
            }

            const newBlog = { ...blog, thumbnail: url };

            const res = await postAPI('blog', newBlog, token);

            dispatch({ type: ALERT, payload: { loading: false } });
        } catch (err: any) {
            dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
        }
    };
};

export const getHomeBlogs = () => {
    return async (dispatch: Dispatch<IAlertType | IGetHomeBlogsType>) => {
        try {
            dispatch({ type: ALERT, payload: { loading: true } });

            const res = await getAPI('home/blogs');

            dispatch({ type: GET_HOME_BLOGS, payload: res.data });

            dispatch({ type: ALERT, payload: { loading: false } });
        } catch (err: any) {
            dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
        }
    };
};
