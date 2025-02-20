
import {v2 as cloudinary} from 'cloudinary'   //actual name is v2 , but it give no meaning , so we use namespace for v2 using as keyword

import {config} from 'dotenv'

config()

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECEREY
})

export default cloudinary;