import { useEffect } from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';

import PageRender from './PageRender';
import Header from '~/components/global/Header';
import Footer from '~/components/global/Footer';
import { Alert } from '~/components/alert/Alert';
import { useAppDispatch } from '~/hooks';
import { refreshToken } from '~/redux/actions/authActions';
import { getCategories } from '~/redux/actions/categoryActions';
import { getHomeBlogs } from '~/redux/actions/blogAction';

function App() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(refreshToken());
        dispatch(getCategories());
        dispatch(getHomeBlogs());
    }, [dispatch]);

    return (
        <div className="container">
            <Router>
                <Alert />
                <Header />

                <Routes>
                    <Route path="/" element={<PageRender />} />
                    <Route path="/:page" element={<PageRender />} />
                    <Route path="/:page/:slug" element={<PageRender />} />
                </Routes>

                <Footer />
            </Router>
        </div>
    );
}

export default App;
