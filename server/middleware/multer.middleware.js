import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/assets');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + file.originalname;
        cb(null, uniqueSuffix)

    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg'
        || file.mimetype === 'image/png'
        || file.mimetype === 'image/jpg'
        || file.mimetype === 'video/mp4'
        || file.mimetype === 'video/mpeg') {
        cb(null, true);
    } else {
        cb(new Error("Invalid File type. Only images and videos are allowed."))
    }
}

export const upload = multer({
    storage,
    limits: {
        //30 mb max size
        fileSize: 30 * 1024 * 1024
    },
    fileFilter
})