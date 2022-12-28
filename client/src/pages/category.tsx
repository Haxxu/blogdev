import { useState, useEffect } from 'react';

import { FormSubmit, RootStore, ICategory } from '~/utils/TypeScript';
import { useAppDispatch, useAppSelector } from '~/hooks';
import NotFound from '~/components/global/NotFound';
import { createCategory, updateCategory, deleteCategory } from '~/redux/actions/categoryActions';

const Category = () => {
    const [name, setName] = useState('');
    const [edit, setEdit] = useState<ICategory | null>(null);

    const { auth, categories } = useAppSelector((state: RootStore) => state);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (edit) setName(edit.name);
    }, [edit]);

    const handleSubmit = (e: FormSubmit) => {
        e.preventDefault();
        if (!auth.access_token || !name) return;

        if (edit) {
            if (edit.name === name) return;

            const data = { ...edit, name };

            dispatch(updateCategory(data, auth.access_token));
        } else {
            dispatch(createCategory(name, auth.access_token));
        }

        setName('');
        setEdit(null);
    };

    const handleDelete = (id: string) => {
        console.log(id);
        if (!auth.access_token) return;

        dispatch(deleteCategory(id, auth.access_token));
    };

    if (auth.user?.role !== 'admin') return <NotFound />;

    return (
        <div className="category">
            <form className="" onSubmit={handleSubmit}>
                <label htmlFor="category">Category</label>

                <div className="d-flex align-items-center">
                    {edit && (
                        <span
                            className="px-2 text-danger"
                            onClick={() => setEdit(null)}
                            style={{ cursor: 'pointer' }}
                        >
                            <i className="fas fa-times" />
                        </span>
                    )}
                    <input
                        type="text"
                        name="category"
                        id="category"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <button className="" type="submit">
                        {edit ? 'Update' : 'Create'}
                    </button>
                </div>
            </form>

            <div className="">
                {categories.map((category) => (
                    <div className="category_row" key={category._id}>
                        <p className="m-0 text-capitalize">{category.name}</p>

                        <div>
                            <span className="p-2" onClick={() => setEdit(category)}>
                                <i className="fas fa-edit" />
                            </span>
                            <span className="p-2" onClick={() => handleDelete(category._id)}>
                                <i className="fas fa-trash-alt" />
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Category;
