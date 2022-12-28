import { FacebookLogin, FacebookLoginAuthResponse } from 'react-facebook-login-lite';

import { useAppDispatch } from '~/hooks';
import { facebookLogin } from '~/redux/actions/authActions';

const SocialLogin = () => {
    const dispatch = useAppDispatch();

    // eslint-disable-next-line
    const onSuccess = (response: FacebookLoginAuthResponse) => {
        const { accessToken, userID } = response.authResponse;
        dispatch(facebookLogin(accessToken, userID));
    };

    const onFailure = (error: any) => {
        console.log(error);
    };

    return (
        <div>
            <FacebookLogin appId="464885999137820" onSuccess={onSuccess} onFailure={onFailure} />
        </div>
    );
};

export default SocialLogin;
