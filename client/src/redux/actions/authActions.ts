import { Dispatch } from '@reduxjs/toolkit';

import { IUserLogin, IUserRegister } from '~/utils/TypeScript';
import { postAPI, getAPI } from '~/utils/FetchData';
import { AUTH, IAuthType } from '~/redux/types/authType';
import { ALERT, IAlertType } from '~/redux/types/alertType';
import { validRegister } from '~/utils/Valid';

export const login =
    (userLogin: IUserLogin) => async (dispatch: Dispatch<IAuthType | IAlertType>) => {
        try {
            dispatch({ type: ALERT, payload: { loading: true } });

            const res = await postAPI('login', userLogin);
            // console.log(res);
            dispatch({ type: AUTH, payload: res.data });

            dispatch({ type: ALERT, payload: { success: 'Login success!' } });

            localStorage.setItem('logged', 'true');
        } catch (err: any) {
            dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
        }
    };

export const register =
    (userRegister: IUserRegister) => async (dispatch: Dispatch<IAuthType | IAlertType>) => {
        const check = validRegister(userRegister);

        if (check.errLength > 0) {
            return dispatch({
                type: ALERT,
                payload: {
                    errors: check.errMsg,
                },
            });
        }

        try {
            dispatch({ type: ALERT, payload: { loading: true } });

            const res = await postAPI('register', userRegister);

            dispatch({ type: ALERT, payload: { success: res.data.msg } });
        } catch (err: any) {
            dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
        }
    };

export const refreshToken = () => async (dispatch: Dispatch<IAuthType | IAlertType>) => {
    const logged = localStorage.getItem('logged');

    if (logged !== 'true') return;

    try {
        dispatch({ type: ALERT, payload: { loading: true } });

        const res = await getAPI('refresh_token');

        dispatch({ type: AUTH, payload: res.data });

        dispatch({ type: ALERT, payload: {} });
    } catch (err: any) {
        dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
};

export const logout = () => async (dispatch: Dispatch<IAuthType | IAlertType>) => {
    try {
        localStorage.removeItem('logged');

        await getAPI('logout');

        window.location.href = '/';
    } catch (err: any) {
        dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
};

export const facebookLogin =
    (accessToken: string, userID: string) => async (dispatch: Dispatch<IAuthType | IAlertType>) => {
        try {
            dispatch({ type: ALERT, payload: { loading: true } });
            const res = await postAPI('facebook_login', { accessToken, userID });
            console.log(res);
            dispatch({ type: AUTH, payload: res.data });
            dispatch({ type: ALERT, payload: { success: res.data.msg } });
            localStorage.setItem('logged', 'true');
        } catch (err: any) {
            dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
        }
    };
