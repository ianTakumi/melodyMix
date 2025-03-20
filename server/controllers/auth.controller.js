import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Artist from "../models/artist.model.js";

// Register
export const signup = async (req, res, next) => {
  const { name, email, password, gender, phoneNumber, dob } = req.body;

  if (!name || !email || !password || !gender || !phoneNumber || !dob) {
    res
      .status(400)
      .json({ success: false, message: "All fields are required" });
    return;
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ success: false, message: "Email already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      gender,
      phoneNumber,
      dob,
      role: "customer",
    });

    await user.save();
    await user.createDefaultSubscription();
    await user.createCustomerStripe();
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error during registration:", error.message);
      res.status(500).json({ success: false, message: error.message });
    } else {
      console.error("Unexpected error during registration:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  }
};

// Username and password Login
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next({ statusCode: 400, message: "All fields are required" });
    }

    const user = await User.findOne({ email }).select("+password");

    if (user && (await user.comparePassword(password))) {
      const token = user.getJwtToken();
      const userWithoutPassword = user.toObject();
      delete userWithoutPassword.password;
      res.status(200).json({
        token,
        user: userWithoutPassword,
        message: "Successful login",
        success: true,
      });
      return;
    }

    const artist = await Artist.findOne({ email }).select("+password");

    if (artist && (await artist.comparePassword(password))) {
      const token = artist.getJwtToken();
      const artistWithoutPassword = artist.toObject();
      delete artistWithoutPassword.password;
      res.status(200).json({
        token,
        artist: artistWithoutPassword,
        message: "Successful Login",
        success: true,
      });
      return;
    }
    res.status(400).json({
      success: false,
      message: "Invalid email or password",
    });
  } catch (error) {
    console.log("Error log in ", error);
    next(error);
  }
};

// google login
export const googleLogin = async (req, res, next) => {
  try {
    const { email, name } = req.body;

    if (!email || !name) {
      return next({ statusCode: 400, message: "All fields are required" });
    }
  } catch (error) {
    console.log("Error google log in", error);
    next(error);
  }
};

// Facebook Login
export const facebookLogin = async (req, res, next) => {
  try {
  } catch (error) {
    console.log("Error facebook login ", error);
    next(error);
  }
};

// Logout
export const logout = async (req, res, next) => {
  try {
  } catch (error) {
    console.log("Error logout", error);
    next(error);
  }
};

export const registerArtist = async (req, res, next) => {
  try {
    const { name, email, phoneNumber, password } = req.body;

    const newArtist = new Artist({
      name,
      email,
      phoneNumber,
      password,
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
      error: error.message,
    });
  }
};
