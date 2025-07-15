import { v2 as cloudinary } from 'cloudinary';

const connectCloudinary = async () => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_SECRET_KEY,
    });

    // Ping Cloudinary to test connection
    const result = await cloudinary.api.ping();
    console.log('✅ Cloudinary Connected:', result);
  } catch (error) {
    console.error('❌ Cloudinary Connection Failed:', error.message);
  }
};

export default connectCloudinary;
