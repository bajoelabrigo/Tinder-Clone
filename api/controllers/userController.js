import cloudinary from "../config/cloudinary.js";
import User from "../models/User.js";

export const updateProfile = async (req, res) => {
  try {
    const { image, ...otherData } = req.body;

    let updatedData = otherData;

    if (image) {
      if (image.startsWith("data:image")) {
        try {
          const uploadResponse = await cloudinary.uploader.upload(image);
          updatedData.image = uploadResponse.secure_url;
        } catch (error) {
          return res.status(500).json({
            success: false,
            message: "Error in uploading image",
          });
        }
      }
    }
    const updatedUser = await User.findByIdAndUpdate(req.user._id, updateData, {
      new: true,
    });
    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.log("Error in 'updateProfile", error);
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};
