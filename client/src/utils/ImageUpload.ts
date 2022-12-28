export const checkImage = (file: File) => {
    const types = ['image/png', 'image/jpeg', 'image/jpg'];
    let err = '';
    if (!file) return (err = 'File doest not exists.');

    if (file.size > 1024 * 1024)
        // 1MB
        err = 'The largestimage size is 1MB';

    if (!types.includes(file.type)) err = 'The image type must be png/jpg/jpeg';

    return err;
};

export const imageUpload = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'herbadvu');
    formData.append('cloud_name', 'doaldo8tc');

    const res = await fetch('https://api.cloudinary.com/v1_1/doaldo8tc/upload', {
        method: 'POST',
        body: formData,
    });

    const data = await res.json();

    return { public_id: data.public_id, url: data.secure_url };
};
