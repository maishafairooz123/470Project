import { Router } from "express";
import multer from "multer";
import path from "path";

const router = Router();
const upload = multer({ dest: 'foods/' }); 

router.post('/', upload.single('image'), (req, res) => {
    const file = req.file;
    if (!file) {
        return res.status(400).send({ error: 'No file uploaded' });
    }

    const imagePath = path.join('..', 'uploads', file.originalname); // Construct the image path
    // Send the image path as the response
    res.send({ image: imagePath });
});

export default router;