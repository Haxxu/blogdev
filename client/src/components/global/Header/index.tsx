import React from 'react';
import { Link } from 'react-router-dom';

import Menu from '~/components/global/Menu';
import Search from '~/components/global/Search';

const Header = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light p-3">
            <Link className="navbar-brand" to="/">
                BlogDev
            </Link>

            <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">
                <Search />
                <Menu />
            </div>
        </nav>
    );
};

export default Header;
