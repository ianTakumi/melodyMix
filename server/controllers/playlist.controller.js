import Playlist from "../models/playlist.model.js";

// Get all playlist
export const getAllPlaylist = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const playlists = await Playlist.find({ userId });
    res.status(200).json({
      success: true,
      message: "Successfully fetched playlist",
      data: playlists,
    });
  } catch (error) {
    console.log("Error fetching playlist");
    next({
      statusCode: 500,
      message: "Error fetching playlist",
      error: error.message,
    });
  }
};

// Get playlist based on UserID
export const getAllPlaylistBasedOnUserId = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const playlists = await Playlist.find({ userId: userId });

    res.status(200).json({
      success: true,
      message: "Successfully fetched playlist",
      data: playlists,
    });
  } catch (error) {
    console.log("Error fetching playlist ");
    next({
      statusCode: 500,
      message: "Error fetching playlist",
      error: error.message,
    });
  }
};

// Create a playlist
export const createPlaylist = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { title } = req.body;

    if (!title || !userId) {
      return next({ statusCode: 400, message: "All fields are required" });
    }

    const newPlaylist = new Playlist({ title, userId });
    const savedPlaylist = await newPlaylist.save();

    res.status(201).json({
      success: true,
      message: "Playlist saved successfully",
      data: savedPlaylist,
    });
  } catch (error) {
    console.log("Error updating playlist");
    next({
      statusCode: 500,
      message: "Error deleting playlist",
      error: error.message,
    });
  }
};

// Update playlist name
export const updatePlaylist = async (req, res, next) => {
  try {
    const { playlistId } = req.params;
    const { title } = req.body;

    const updatedPlaylist = await Playlist.findByIdAndUpdate(
      playlistId,
      { title },
      { new: true }
    );

    if (!updatedPlaylist) {
      return next({ statusCode: 400, message: "Playlist not found" });
    }

    res.status(200).json({
      success: true,
      message: "Playlist updated",
      data: updatedPlaylist,
    });
  } catch (error) {
    console.log("Error updating playlist name", error);
    next({
      statusCode: 500,
      message: "Error updating playlist name",
      error: error.message,
    });
  }
};

export const deletePlaylist = async (req, res, next) => {
  try {
    const { playlistId } = req.params;
    const playlist = await Playlist.findById(playlistId);

    if (!playlist) {
      console.log("Playlist not found ");
      return next({
        statusCode: 400,
        message: "Playlist not found",
      });
    }

    await playlist.deleteCoverPic();

    await Playlist.findByIdAndDelete(playlistId);
    res.status(200).json({ success: true, message: "Successfully deleted" });
  } catch (error) {
    console.log("Error deleting playlist", error);
    next({
      statusCode: 500,
      message: "Error deleting playlist",
      error: error.message,
    });
  }
};
