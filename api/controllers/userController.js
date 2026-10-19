import { users } from "../db/user.js";
import { validationResult, matchedData } from "express-validator";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { getSaltRounds } from "../utilities/utility.js";

// Configure dotenv
dotenv.config();

// Create user controller object
const userController = {
  // Middleware to sign up user
  async createUser(req, res, next) {
    // gather errors
    const errors = validationResult(req);

    try {
      if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
      }

      // get validated data
      const { email, username, password, role } = matchedData(req);

      // check if user has been created already
      const result = await users.getUserByEmail(email);
      if (result) {
        return res
          .status(409)
          .json({ message: "User already exists, Try logging in..." });
      }

      // get salt rounds and hash password
      const saltRounds = getSaltRounds();
      const hashPassword = await bcrypt.hash(password, saltRounds);

      // add new user to db
      await users.addUser(email, username, hashPassword, role);

      return res.status(201).json({ message: "Registration successful!" });
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
    }
  },

  // Middleware to login a user
  async loginUser(req, res, next) {
    try {
      // get data
      const { email, password } = req.body;

      // validate data
      if (!email || !password) {
        return res
          .status(400)
          .json({ error: "Email and password are required!" });
      }

      // check if user is in db
      const user = await users.getUserByEmail(email);
      if (!user) {
        return res
          .status(401)
          .json({ error: "Invalid Email address or password!" });
      }

      // check if password matches
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(401)
          .json({ error: "Invalid Email address or password!" });
      }

      // jwt token payload
      const tokenPayload = {
        id: user.id,
        email: user.email,
        role: user.role,
      };

      // sign jwt token
      const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      });

      // send token, & data back as success
      return res.json({
        message: "Login successful",
        token,
        user: {
          id: user.id,
          email: user.email,
          uesername: user.username,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("internal server error");
    }
  },
};

export default userController;
