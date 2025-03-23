import Artist from "../models/artist.model.js";
import {
  removeFromCloudinary,
  uploadCloudinary,
} from "../config/cloudinary.config.js";
import User from "../models/user.model.js";

// Get all artists
export const getAllArtist = async (req, res, next) => {
  try {
    const artists = await Artist.find();
    res.status(200).json({
      success: true,
      message: "Successfully fetched all artists!",
      data: artists,
    });
  } catch (error) {
    console.error("Error fetching artists", error);
    next({
      statusCode: 500,
      message: "An error occurred while retrieving artists",
      error: error.message,
    });
  }
};

// Get the total number of artist
export const getNumberOfArtist = async (req, res, next) => {
  try {
    const numberOfArtists = await Artist.countDocuments();
    res.status(200).json({
      success: true,
      message: "Successfully fetched the number of artists!",
      data: numberOfArtists,
    });
  } catch (error) {
    console.error("Error fetching artists", error);
    next({
      statusCode: 500,
      message: "An error occurred while retrieving artists",
      error: error.message,
    });
  }
};

// Update Profile picture of artist
export const updateProfilePicture = async (req, res, next) => {
  try {
    const { artistId } = req.params;
    const image = req.file;

    if (!image) {
      return next({
        statusCode: 400,
        message: "Please upload an image",
      });
    }

    const artist = await Artist.findById(artistId);

    if (!artist) {
      return next({
        statusCode: 404,
        message: "Artist not found",
      });
    }

    if (!artist.profile_picture) {
      artist.profile_picture = {};
    }

    if (artist.profile_picture.public_id) {
      await removeFromCloudinary(artist.profile_picture.public_id);
    }

    const newImage = await uploadCloudinary(image, "profile_pictures");

    artist.profile_picture = {
      public_id: newImage.public_id,
      url: newImage.secure_url,
    };

    await artist.save();

    res.status(200).json({
      success: true,
      message: "Profile picture updated",
      artist,
    });
  } catch (error) {
    console.error("Error updating profile picture", error);
    next({
      statusCode: 500,
      message: "An error occurred while updating profile picture",
      error: error.message,
    });
  }
};

// Delete artist by ID
export const deleteArtist = async (req, res, next) => {
  try {
    const { artistId } = req.params;
    const artist = await Artist.findById(artistId);
    // await Artist.findByIdAndDelete(artistId);
  } catch (error) {
    console.error("Error deleting artist", error);
    next({
      statusCode: 500,
      message: "An error occurred while deleting artist",
      error: error.message,
    });
  }
};
