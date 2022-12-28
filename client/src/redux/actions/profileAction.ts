import { Dispatch } from '@reduxjs/toolkit';

import { ALERT, IAlertType } from '~/redux/types/alertType';
import { AUTH, IAuthType, IAuth } from '~/redux/types/authType';
import { checkImage, imageUpload } from '~/utils/ImageUpload';
import { patchAPI } from '~/utils/FetchData';
import { checkPassword } from '~/utils/Valid';

export const updateUser =
    (avatar: File, name: string, auth: IAuth) =>
    async (dispatch: Dispatch<IAlertType | IAuthType>) => {
        if (!auth.access_token || !auth.user) return;

        let url = '';

        try {
            dispatch({ type: ALERT, payload: { loading: true } });

            if (avatar) {
                const check = checkImage(avatar);
                if (check) return dispatch({ type: ALERT, payload: { errors: check } });

                const photo = await imageUpload(avatar);
                url = photo.url;
            }

            const res = await patchAPI(
                'user',
                {
                    avatar: url ? url : auth.user.avatar,
                    name: name ? name : auth.user.name,
                },
                auth.access_token
            );

            dispatch({
                type: AUTH,
                payload: {
                    access_token: auth.access_token,
                    user: {
                        ...auth.user,
                        avatar: url ? url : auth.user.avatar,
                        name: name ? name : auth.user.name,
                    },
                },
            });

            dispatch({ type: ALERT, payload: { success: res.data.msg } });
        } catch (err: any) {
            dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
        }
    };

export const resetPassword =
    (password: string, cf_password: string, token: string) =>
    async (dispatch: Dispatch<IAlertType | IAuthType>) => {
        const msg = checkPassword(password, cf_password);
        if (msg) {
            dispatch({ type: ALERT, payload: { errors: msg } });
        }

        try {
            dispatch({ type: ALERT, payload: { loading: true } });

            const res = await patchAPI('reset_password', { password }, token);

            console.log(res);

            dispatch({ type: ALERT, payload: { success: 'res.data.msg' } });
        } catch (err: any) {
            dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
        }
    };
