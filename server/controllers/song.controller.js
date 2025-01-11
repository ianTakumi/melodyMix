import { Request, Response, NextFunction } from "express";
import Song from "../models/song.model.js";

// Get all songs
export const getAllSongs = async (req, res, next) => {
  try {
    const songs = await Song.find();

    res.status(200).json({
      success: true,
      message: "Songs retrieved successfully",
      data: songs,
    });
  } catch (error) {
    console.error("Error fetching songs:", error);
    next({
      statusCode: 500,
      message: "An error occurred while retrieving songs",
      error: error.message,
    });
  }
};

// Get songs based on artist ID
export const getSongsBasedOnArtistId = async (req, res, next) => {
  try {
    const { artistId } = req.params;
    const songs = Song.find({ artistId: artistId });

    res.status(200).json({
      success: true,
      message: "Songs retrieved successfully",
      data: songs,
    });
  } catch (error) {
    next({
      statusCode: 500,
      message: "An error occured while retrieving songs",
      error: error.message,
    });
  }
};

//  Create a song
export const createSong = async (req, res, next) => {
  try {
    const { artistId } = req.params;
    const { albumId, title, genres, duration, lyrics } = req.body;
  } catch (error) {
    console.log("Error creating songs", error);
    next({
      statusCode: 500,
      message: "An error occured while adding your song",
      error: error.message,
    });
  }
};

// Delete a song
export const deleteSong = async (req, res, next) => {
  try {
    const { songId } = req.params;
    const song = await Song.findById(songId);

    if (!song) {
      return next({ statusCode: 400, message: "Song not found" });
    }

    // Delete the audio file
    if (song.audio?.public_id) {
      await song.deleteSongFile();
    }

    // Delete the pic file
    if (song.coverPic?.public_id) {
      await song.deletePicFile();
    }

    // Delete the song object
    await Song.deleteOne({ _id: songId });

    res.status(200).json({
      message: "Song deleted successfully",
      success: true,
    });
  } catch (error) {
    console.log("Error deleting song", error);
    next({
      statusCode: 500,
      message: "Error occured, please try again",
      error: error.message,
    });
  }
};
