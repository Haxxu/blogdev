import React, { useState } from 'react';

import { InputChange, FormSubmit } from '~/utils/TypeScript';
import { login } from '~/redux/actions/authActions';
import { useAppDispatch } from '~/hooks';

const LoginPass = () => {
    const initialState = { account: '', password: '' };
    const [userLogin, setUserLogin] = useState(initialState);
    const [typePass, setTypePass] = useState(false);

    const { account, password } = userLogin;
    const dispatch = useAppDispatch();

    const hanldeChangeInput = (e: InputChange) => {
        const { value, name } = e.target;
        setUserLogin({ ...userLogin, [name]: value });
        // console.log(userLogin);
    };

    const handleSubmit = (e: FormSubmit) => {
        e.preventDefault();
        dispatch(login(userLogin));
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
                <label htmlFor="account" className="form-label">
                    Email / Phone Number
                </label>
                <input
                    className="form-control"
                    type="text"
                    id="account"
                    name="account"
                    value={account}
                    onChange={hanldeChangeInput}
                />
            </div>
            <div className="form-group mb-3">
                <label htmlFor="password" className="form-label">
                    Password
                </label>
                <div className="pass">
                    <input
                        className="form-control"
                        type={typePass ? 'text' : 'password'}
                        id="password"
                        name="password"
                        value={password}
                        onChange={hanldeChangeInput}
                    />
                    <small onClick={() => setTypePass(!typePass)}>
                        {typePass ? 'Hide' : 'Show'}
                    </small>
                </div>
            </div>
            <button
                type="submit"
                className="btn btn-dark w-100 mt-2"
                disabled={account && password ? false : true}
            >
                Login
            </button>
        </form>
    );
};

export default LoginPass;
