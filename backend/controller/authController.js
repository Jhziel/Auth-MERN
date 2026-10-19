import { User } from "../model/User.js";
import bcryptjs from "bcryptjs";
import { generateVerificationToken } from "../utils/generateVerificationToken.js";
import { generateTokenAndSetCookie } from "../utils/generateTokeAndSetCookie.js";
import { sendVerificationEmail } from "../mailtrap/email.js";

export const signUp = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    //Check if All fields are meet
    if (!email || !password || !name) {
      throw new Error("All fields are required");
    }

    //Check if User already Exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res
        .status(400)
        .json({ success: false, message: "User already Exists " });
    }

    //Hash the password
    const hashedPassword = await bcryptjs.hash(password, 10);

    //generate Verification Token
    const verificationToken = generateVerificationToken();

    //Create the User
    const user = new User({
      email,
      password: hashedPassword,
      name,
      verificationToken: verificationToken,
      verificationTokenExpiresAt: Date.now() + 15 * 60 * 1000,
    });

    await user.save();

    //jwt
    generateTokenAndSetCookie(res, user._id);

    //send VerificationToken on email
    await sendVerificationEmail(user.email, verificationToken);

    //return the created user
    res.status(201).json({
      success: true,
      message: "User Successfully Created",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
