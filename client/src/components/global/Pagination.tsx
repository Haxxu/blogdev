import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface IProps {
    totalPage: number;
    callback: (num: number) => void;
}

const Pagination: React.FC<IProps> = ({ totalPage, callback }) => {
    const [page, setPage] = useState(1);

    const newArr = [...Array(totalPage)].map((_, i) => i + 1);

    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (index: number) => {
        if (index === page) return 'active';
        return '';
    };

    const hanldePagination = (num: number) => {
        navigate(`?page=${num}`);
        setPage(num);
        callback(num);
    };

    useEffect(() => {
        const num = location.search.slice(6) || 1;
        setPage(Number(num));
    }, [location.search]);

    return (
        <nav aria-label="Page navigation example" style={{ cursor: 'pointer' }}>
            <ul className="pagination">
                <li
                    className={`page-item ${page > 1 ? '' : 'disabled'}`}
                    onClick={() => hanldePagination(page - 1)}
                >
                    <span className="page-link" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                    </span>
                </li>

                {newArr.map((num) => (
                    <li
                        className={`page-item ${isActive(num)}`}
                        key={num}
                        onClick={() => hanldePagination(num)}
                    >
                        <span className="page-link">{num}</span>
                    </li>
                ))}
                <li
                    className={`page-item ${page < totalPage ? '' : 'disabled'}`}
                    onClick={() => hanldePagination(page + 1)}
                >
                    <span className="page-link" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                    </span>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;
