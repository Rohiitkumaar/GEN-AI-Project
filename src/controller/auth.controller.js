import userModel from "../models/user.model.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/**
 * @route register user controller
 * @description this controller expects username, email and password in required
 * @access public
 */

async function RegisterUserController(req, res) {
  const { email, password, username } = req.body;

  if (!username || !password || !email) {
    return res.status(400).json({
      message: "All the fields are required.",
    })
  }


  const isUserAlreadyExist = await userModel.findOne({
    $or: [{ email }, { username }]
  });

  if (isUserAlreadyExist) {
    if (isUserAlreadyExist.username == username) {
      return res.status(400).json({
        message: "User already exist with this username.",
      });
    }
    else {
      return res.status(400).json({
        message: "User already exist with this email address.",
      });
    }
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    email,
    username,
    password: hashPassword
  })

  const token = jwt.sign({
    id: user._id,
    username: user.username,
  }, process.env.JWT_SECRET,
    { expiresIn: "1d" }
  )

  res.cookie("token", token);

  res.status(201).json({
    message: "User registered successfully.",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
}


  /**
   * @route login user controller
   * @description to login user into the system
   * @access public
   */

  async function loginUserController(req, res) {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      res.status(400).json({
        message: "Invalid email or password"
      })
    }

    const isPasswordValid = bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.status(400).json({
        message: "Invalid email or password"
      })
    }

    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    res.cookie("token", token);

    res.status(200).json({
      message: "User loggedIn successfully.",
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  }

export { RegisterUserController, loginUserController }