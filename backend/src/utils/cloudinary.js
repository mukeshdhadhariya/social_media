import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"

cloudinary.config({ 
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME, 
    api_key:process.env.CLOUDINARY_API_KEY, 
    api_secret:process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localfilepath) => {
  try {
    if (!localfilepath || !localfilepath.path) return null;

    const response = await cloudinary.uploader.upload(localfilepath.path, {
      resource_type: "auto"
    });

    fs.unlinkSync(localfilepath.path);
    return response;

  } catch (error) {
    console.error("Cloudinary Upload Error:", error);


    if (localfilepath?.path && fs.existsSync(localfilepath.path)) {
      fs.unlinkSync(localfilepath.path);
    }

    return null;
  }
};

export { uploadOnCloudinary };