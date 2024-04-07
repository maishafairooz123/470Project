import axios from "axios";

export const uploadImage = async event => {
    const image = await getImage(event);
    if (!image) return null;

    const formData = new FormData();
    formData.append('image', image, image.name);
    const response = await axios.post('/api/upload', formData);
    return response.data.image;
};

const getImage = async event => {
    const files = event.target.files;

    if (!files || files.length <=0) {
        return null;
    }

    const file = files[0];

    if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
        return null;
    }

    return file;

}