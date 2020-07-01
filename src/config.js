module.exports = {
    apiBaseUrl: process.env.NODE_ENV == "development" ?
        process.env.REACT_APP_API_BASE_URL :
        "https://cool-events-back.herokuapp.com",
    cloudinaryUrl: process.env.REACT_APP_CLOUDINARY_URL,
    cloudinaryPreset: process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET,
}