import { User } from "../model/User.js";
import bcryptjs from "bcryptjs";
import { generateVerificationToken } from "../utils/generateVerificationToken.js";
import { generateTokenAndSetCookie } from "../utils/generateTokeAndSetCookie.js";

export const signUp = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    //Check if all fields are filled
    if (!email || !password || !name) {
      throw new Error("All fields is required");
    }

    const userAlreadyExists = await User.findOne({ email });

    //Check if User already Exists within the Database
    if (userAlreadyExists) {
      return res
        .status(400)
        .json({ success: false, message: "User already Exists" });
    }

    //Hash the password
    const hashedPassword = await bcryptjs.hash(password, 10);

    //Generate verification Token
    const verificationToken = generateVerificationToken();

    //Create the User
    const user = new User({
      email,
      password: hashedPassword,
      name,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
    });

    await user.save();

    //jwt
    generateTokenAndSetCookie(res, user._id);

    res.status(201).json({
      success: true,
      message: "User created Successfully",
      user: { ...user._doc, password: undefined },
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
