const router = require("express").Router();
const { User } = require("../../db/models");
const cookieConfig = require("../configs/cookiesConfig");
const bcrypt = require("bcrypt");
const generateTokens = require("../utils/generateToken");
const main = require('../utils/nodemailer');

const validateEmail = (email) => {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(email);
};

const validatePassword = (password) => {
  const re = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/;
  return re.test(password);
};

const validatePhone = (phone) => {
  const re = /^\+\d{1} \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
  return re.test(phone);
};

router
  .post("/signup", async (req, res) => {
    const { username, email, password, phone } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ message: "Invalid email" });
    }

    if (!validatePassword(password)) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters" });
    }

    if (phone && !validatePhone(phone)) {
      return res.status(400).json({ message: "Invalid phone number" });
    }

    try {
      const [user, isCreated] = await User.findOrCreate({
        where: { email },
        defaults: {
          username,
          email,
          password: await bcrypt.hash(password, 10),
          phone,
          isAdmin: false,
          isManager: false,
        },
      });

      if (!isCreated) {
        return res.status(400).json({ message: "User already exists" });
      } else {
        const plainUser = user.get();
        delete plainUser.password;
        delete plainUser.createdAt;
        delete plainUser.updatedAt;

        const { accessToken, refreshToken } = generateTokens({
          user: plainUser,
        });
        main(email, username)
        res
          .cookie("refreshToken", refreshToken, cookieConfig.refresh)
          .json({ user: plainUser, accessToken });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Ошибка сервера" });
    }
  })
  .post("/signin", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ message: "Invalid email" });
    }

    if (!validatePassword(password)) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters" });
    }

    try {
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.status(401).json({ message: "Incorrect email or password" });
      }

      const isCorrectPassword = await bcrypt.compare(password, user.password);

      if (!isCorrectPassword) {
        return res.status(401).json({ message: "Incorrect email or password" });
      } else {
        const plainUser = user.get();
        delete plainUser.password;
        delete plainUser.createdAt;
        delete plainUser.updatedAt;

        const { accessToken, refreshToken } = generateTokens({
          user: plainUser,
        });

        res
          .cookie("refreshToken", refreshToken, cookieConfig.refresh)
          .json({ user: plainUser, accessToken });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Ошибка сервера" });
    }
  })
  .get("/logout", async (req, res) => {
    try {
      res.clearCookie("refreshToken").sendStatus(200);
    } catch (error) {
      console.error(error);
      res.sendStatus(400);
    }
  });

module.exports = router;
