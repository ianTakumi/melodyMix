import User from "../models/user.model.js";
import Artist from "../models/artist.model.js";
// Get all users
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({
      success: true,
      message: "Successfully fetched all users!",
      data: users,
    });
  } catch (error) {
    console.log("Error fetching users", error);
    next(error);
  }
};

// Get user by ID
export const getUserById = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).populate("subscription");
    if (!user) {
      return next({ statusCode: 404, message: "User not found" });
    }
  } catch (error) {
    next({
      statusCode: 500,
      message: "Update profile unsuccessful",
      error: error.message,
    });
  }
};

// Update profile
export const updateUserProfile = async (req, res, next) => {
  try {
    const { userId } = req.params;
    console.log(userId);
    const { name, email, phoneNumber, dob, gender } = req.body;

    const data = { name, email, phoneNumber, dob, gender };

    const user = await User.findByIdAndUpdate(userId, data, { new: true });

    if (!user) {
      return next({ statusCode: 400, message: "User not found" });
    }
    // res.status(200).json({ message: "Received" });

    res.status(200).json({ success: true, message: "Profile updated", user });
  } catch (error) {
    console.log("Error updating user profile", error);
    next({
      statusCode: 500,
      message: "Update profile unsuccessful",
      error: error.message,
    });
  }
};

export const updateExpoPushToken = async (req, res, next) => {
  try {
    const { userId, expoPushToken, role } = req.body;
    console.log(req.body);

    if (!userId || !expoPushToken || !role) {
      return next({ statusCode: 400, message: "Invalid request" });
    }

    let updatedUser = null;

    if (role === "artist") {
      updatedUser = await Artist.findByIdAndUpdate(
        userId,
        { fcm_token: expoPushToken },
        { new: true }
      );
    } else {
      updatedUser = await User.findByIdAndUpdate(
        userId,
        { fcm_token: expoPushToken },
        { new: true }
      );
    }

    if (!updatedUser) {
      return next({
        statusCode: 404,
        message: `${role === "artist" ? "Artist" : "User"} not found`,
      });
    }

    res.status(200).json({
      success: true,
      message: "Expo push token updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    next({
      statusCode: 500,
      message: "Update expo push token unsuccessful",
      error: error.message,
    });
  }
};
