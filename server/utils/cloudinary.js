import { v2 as cloudinary } from "cloudinary";
import { config } from "dotenv";
config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const cloudinaryUploadImage = async (filesToUpload) => {
  return new Promise((resolve) => {
    cloudinary.uploader.upload(filesToUpload, (error, result) => {
      if (error) {
        console.log(error);
      } else {
        resolve(
          {
            url: result.secure_url,
            asset_id: result.asset_id,
            public_id: result.public_id,
          },
          {
            resource_type: "auto",
          }
        );
      }
    });
  });
};

const cloudinaryRemoveImage = async (id) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(id, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve({
          url: result.secure_url,
          asset_id: result.asset_id,
          public_id: result.public_id,
          resource_type: "auto",
        });
      }
    });
  });
};

export { cloudinaryUploadImage, cloudinaryRemoveImage };
