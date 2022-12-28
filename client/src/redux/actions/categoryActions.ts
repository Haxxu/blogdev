import { Dispatch } from '@reduxjs/toolkit';

import { ALERT, IAlertType } from '~/redux/types/alertType';
import {
    CREATE_CATEGORY,
    GET_CATEGORIES,
    UPDATE_CATEGORY,
    DELETE_CATEGORY,
    ICategoryType,
} from '~/redux/types/categoryType';
import { postAPI, getAPI, patchAPI, deleteAPI } from '~/utils/FetchData';
import { ICategory } from '~/utils/TypeScript';

export const createCategory =
    (name: string, token: string) => async (dispatch: Dispatch<IAlertType | ICategoryType>) => {
        try {
            dispatch({ type: ALERT, payload: { loading: true } });

            const res = await postAPI('category', { name }, token);

            dispatch({ type: CREATE_CATEGORY, payload: res.data.newCategory });

            dispatch({ type: ALERT, payload: { loading: false } });
        } catch (err: any) {
            dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
        }
    };

export const getCategories = () => async (dispatch: Dispatch<IAlertType | ICategoryType>) => {
    try {
        dispatch({ type: ALERT, payload: { loading: true } });

        const res = await getAPI('category');

        dispatch({ type: GET_CATEGORIES, payload: res.data.categories });

        dispatch({ type: ALERT, payload: { loading: false } });
    } catch (err: any) {
        dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
};

export const updateCategory =
    (data: ICategory, token: string) => async (dispatch: Dispatch<IAlertType | ICategoryType>) => {
        try {
            dispatch({ type: ALERT, payload: { loading: true } });

            const res = await patchAPI(`category/${data._id}`, { name: data.name }, token);

            dispatch({ type: UPDATE_CATEGORY, payload: res.data.category });

            dispatch({ type: ALERT, payload: { success: res.data.msg } });
        } catch (err: any) {
            dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
        }
    };

export const deleteCategory =
    (id: string, token: string) => async (dispatch: Dispatch<IAlertType | ICategoryType>) => {
        try {
            dispatch({ type: ALERT, payload: { loading: true } });

            const res = await deleteAPI(`category/${id}`, token);

            dispatch({ type: DELETE_CATEGORY, payload: id });

            dispatch({ type: ALERT, payload: { success: res.data.msg } });
        } catch (err: any) {
            dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
        }
    };
