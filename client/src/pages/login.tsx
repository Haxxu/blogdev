import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import LoginPass from '~/components/auth/LoginPass';
import LoginSMS from '~/components/auth/LoginSMS';
// import SocialLogin from '~/components/auth/SocialLogin';
import { useAppSelector } from '~/hooks';
import { RootStore } from '~/utils/TypeScript';

const Login = () => {
    const [sms, setSms] = useState(false);
    const navigate = useNavigate();

    const { auth } = useAppSelector((state: RootStore) => state);

    useEffect(() => {
        if (auth.access_token) {
            navigate('/');
        }
    }, [auth.access_token, navigate]);

    return (
        <div className="auth_page">
            <div className="auth_box">
                <h3 className="text-uppercase text-center mb-4">Login</h3>

                {/* <SocialLogin /> */}

                {sms ? <LoginSMS /> : <LoginPass />}

                <small className="row my-2 text-primary" style={{ cursor: 'pointer' }}>
                    <span className="col-6">
                        <Link to="/forgot_password" className="col-6">
                            Forgot password?
                        </Link>
                    </span>
                    <span className="col-6 text-end" onClick={() => setSms(!sms)}>
                        {sms ? 'Sign in with password' : 'Sign in with SMS'}
                    </span>
                </small>

                <p>
                    You don't have an account?{' '}
                    <Link to={`/register`} style={{ color: 'crimson' }}>
                        Register now
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
