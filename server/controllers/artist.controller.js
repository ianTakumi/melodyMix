import Artist from "../models/artist.model.js";

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
