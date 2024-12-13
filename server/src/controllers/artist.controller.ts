import Artist from "../models/artist.model";
import { Request, Response, NextFunction } from "express";

// Get all artists
export const getAllArtist = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
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
      error: (error as Error).message,
    });
  }
};

export const createArtist = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, email, phoneNumber } = req.body;

    const profile_picture = {
      public_id: "cihdkwnga1whsejrbmkb",
      url: "https://res.cloudinary.com/dydg4oqy5/image/upload/v1733662639/cihdkwnga1whsejrbmkb.png",
    };

    const newArtist = new Artist({
      name,
      email,
      phoneNumber,
      profile_picture,
    });

    await newArtist.save();

    res.status(201).json({
      success: true,
      message: "Artist successfully registered!",
      data: newArtist,
    });
  } catch (error) {
    console.error("Error creating artist", error);
    next({
      statusCode: 500,
      message: "An error occurred while creating the artist.",
      error: (error as Error).message,
    });
  }
};

export const deleteArtist = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { artistId } = req.params;
    const artist = await Artist.findById(artistId);
    // await Artist.findByIdAndDelete(artistId);
  } catch (error) {
    console.error("Error deleting artist", error);
    next({
      statusCode: 500,
      message: "An error occurred while deleting artist",
      error: (error as Error).message,
    });
  }
};
