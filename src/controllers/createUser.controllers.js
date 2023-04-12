const { response } = require("express");
const Users = require("../models/users");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
  try {
    const { firstName, lastName, age, email, password } = req.body;
    const newUser = await Users.create({
      firstName,
      lastName,
      age,
      email,
      password,
    });

    const payload = {
      user: {
        id: newUser._id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: 360000,
      },
      (error, token) => {
        if (error) throw error;
        res.json({ token });
      }
    );
  } catch (error) {
    res.json({
      msg: error.message,
    });
  }
};

module.exports = createUser;
