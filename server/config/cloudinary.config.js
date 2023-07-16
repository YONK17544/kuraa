import cloudinary from 'cloudinary';

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "db4wnfcep",
    api_key: process.env.CLOUDINARY_API_KEY || "237165975951454" ,
    api_secret: process.env.CLOUDINARY_API_SECRET || "CVu94l6LcIDAFg7zuTGzAL4blQE" ,
})

export default cloudinary;