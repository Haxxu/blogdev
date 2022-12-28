import React, { useRef, useEffect, useCallback } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { checkImage, imageUpload } from '~/utils/ImageUpload';
import { ALERT } from '~/redux/types/alertType';
import { useAppDispatch } from '~/hooks';

interface IProps {
    setBody: (value: string) => void;
}

const Quill: React.FC<IProps> = ({ setBody }) => {
    const dispatch = useAppDispatch();
    const quillRef = useRef<ReactQuill>(null);

    // Custom image
    const handleChangeImage = useCallback(() => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.click();

        input.onchange = async () => {
            const files = input.files;
            if (!files)
                return dispatch({ type: ALERT, payload: { errors: 'File does not exist.' } });

            const file = files[0];
            const check = checkImage(file);
            if (check) {
                return dispatch({ type: ALERT, payload: { errors: check } });
            }

            dispatch({ type: ALERT, payload: { loading: true } });
            const photo = await imageUpload(file);

            const quill = quillRef.current;
            const range = quill?.getEditor().getSelection()?.index;
            if (range !== undefined) {
                quill?.getEditor().insertEmbed(range, 'image', `${photo.url}`);
            }

            dispatch({ type: ALERT, payload: { loading: false } });
        };
    }, []);

    useEffect(() => {
        const quill = quillRef.current;
        if (!quill) return;

        let toolbar = quill.getEditor().getModule('toolbar');
        // console.log(toolbar);
        // toolbar.addHanlder('image', handleChangeImage);
    }, [handleChangeImage]);

    const modules = {
        toolbar: {
            container,
            handlers: {
                image: handleChangeImage,
            },
        },
    };

    const handleChange = (e: any) => {
        setBody(e);
    };

    return (
        <div className="text-editor">
            <ReactQuill
                theme="snow"
                modules={modules}
                placeholder="Write somethings..."
                onChange={handleChange}
                ref={quillRef}
            ></ReactQuill>
        </div>
    );
};

let container = [
    ['bold', 'italic', 'underline', 'strike'], // toggled buttons
    ['blockquote', 'code-block'],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
    [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
    [{ direction: 'rtl' }], // text direction

    [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ['clean', 'link', 'image', 'video'],
];

export default Quill;
