import { v2 as cloudinary } from 'cloudinary';

export default async function handler(req, res) {
  try {
    const result = await cloudinary.uploader.upload(
      'https://res.cloudinary.com/demo/image/upload/sample.jpg', // Public test image
      { folder: 'tests' }
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      error: error.message,
      config: {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY?.slice(0, 5) + '...' // Partial key for debugging
      }
    });
  }
}