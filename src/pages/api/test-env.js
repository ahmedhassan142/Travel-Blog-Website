export default function handler(req, res) {
  res.status(200).json({
    cloudinary: {
      cloud_name: !!process.env.CLOUDINARY_CLOUD_NAME,
      api_key: !!process.env.CLOUDINARY_API_KEY,
      api_secret: !!process.env.CLOUDINARY_API_SECRET,
    },
    mongo:{
        mongodb:!!process.env.MONGODB_URI
    }
    // Add other variables you want to test
  });
}