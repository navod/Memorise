import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser)
      return res.status(404).json({ message: "User doesn't exists." });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid Credentials" });

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "test",
      { expiresIn: "1h" }
    );

    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: "Undefined server error" });
  }
};

export const signUp = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists." });

    if (password !== confirmPassword)
      return res.status(400).json({ message: "password don't match." });

    bcrypt.hash(password, 12).then(e => {
      User.create({
        email,
        password: e,
        name: `${firstName} ${lastName}`,
      }).then(result => {
        const token = jwt.sign(
          { email: result.email, id: result._id },
          "test",
          {
            expiresIn: "1h",
          }
        );
        res.status(200).json({ result, token });
      });
    });
  } catch (error) {
    res.status(500).json({ message: "Undefined server error" });
  }
};
