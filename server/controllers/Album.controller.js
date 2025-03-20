import Album from "../models/album.model.js";
import {
  uploadCloudinary,
  removeFromCloudinary,
} from "../config/cloudinary.config.js";

// Get all albums based on artist Id
export const getAllAlbumsBasedOnArtistId = async (req, res, next) => {
  try {
    const { artistId } = req.params;

    if (!artistId) {
      return next({ statusCode: 400, message: "Artist ID is required" });
    }

    const albums = await Album.find({ artistId });

    res.status(200).json({
      success: true,
      message: "Albums retrieved successfully",
      albums: albums,
    });
  } catch (error) {
    console.error("Error fetching albums:", error);
    next({
      statusCode: 500,
      message: "An error occurred while retrieving albums",
      error: error.message,
    });
  }
};

// Get single album by ID
export const getSingleAlbumById = async (req, res, next) => {
  try {
    const { albumId } = req.params;
    // console.log(albumId);
    if (!albumId) {
      return next({ statusCode: 400, message: "Album ID is required" });
    }

    const album = await Album.findById(albumId);

    if (!album) {
      return next({ statusCode: 404, message: "Album not found" });
    }

    res.status(200).json({
      success: true,
      message: "Album retrieved successfully",
      data: album,
    });
  } catch (error) {
    console.error("Error fetching album:", error);
    next({
      statusCode: 500,
      message: "An error occurred while retrieving the album",
      error: error.message,
    });
  }
};

// Add an album
export const createAlbum = async (req, res, next) => {
  try {
    // console.log(req.body);
    let { artistId, title, release_date, genres } = req.body;
    const cover = req.file;

    if (typeof genres === "string") {
      genres = genres.split(",").map((genre) => genre.trim()); // Ensure array format
    }

    if (!artistId || !title || !release_date || !genres || !cover) {
      console.log("Please provide all fields");
      return next({ statusCode: 400, message: "Please provide all fields" });
    }

    const image = await uploadCloudinary(cover);

    const album = new Album({
      artistId,
      title,
      release_date,
      genres,
      coverPic: {
        public_id: image.public_id,
        url: image.secure_url,
      },
    });

    await album.save();

    res.status(201).json({
      success: true,
      message: "Album created successfully",
      data: album,
    });
  } catch (error) {
    console.error("Error creating album:", error);
    next({
      statusCode: 500,
      message: "An error occurred while creating the album",
      error: error.message,
    });
  }
};

// Update an album
export const updateAlbum = async (req, res, next) => {
  try {
    const { albumId } = req.params;
    const { title, release_date, genres } = req.body;
    const cover = req.file;

    if (typeof genres === "string") {
      genres = genres.split(",").map((genre) => genre.trim());
    }

    if (!albumId) {
      return next({ statusCode: 400, message: "Album ID is required" });
    }

    const album = await Album.findById(albumId);

    if (!album) {
      return next({ statusCode: 404, message: "Album not found" });
    }

    let image;

    if (cover) {
      image = await uploadCloudinary(cover);
      await removeFromCloudinary(album.coverPic.public_id);
      console.log("Image deleted from Cloudinary");
    }

    album.title = title || album.title;
    album.release_date = release_date || album.release_date;
    album.genres = genres || album.genres;
    album.coverPic = image || album.coverPic;

    await album.save();

    res.status(200).json({
      success: true,
      message: "Album updated successfully",
    });
  } catch (error) {
    console.error("Error updating album:", error);
    next({
      statusCode: 500,
      message: "An error occurred while updating the album",
      error: error.message,
    });
  }
};

// Delete an album
export const deleteAlbum = async (req, res, next) => {
  try {
    const { albumId } = req.params;

    if (!albumId) {
      return next({ statusCode: 400, message: "Album ID is required" });
    }

    const album = await Album.findByIdAndDelete(albumId);

    if (album.coverPic.public_id) {
      await removeFromCloudinary(album.coverPic.public_id);
      console.log("Image deleted from Cloudinary");
    }

    if (!album) {
      return next({ statusCode: 404, message: "Album not found" });
    }

    res.status(200).json({
      success: true,
      message: "Album deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting album:", error);
    next({
      statusCode: 500,
      message: "An error occurred while deleting the album",
      error: error.message,
    });
  }
};
