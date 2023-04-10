const { response } = require("express");
const Users = require("../models/users");

const getUsers = async (req, res) => {
  try {
    const users = await Users.find({});

    res.json(users);
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
};

const createUser = async (req, res) => {
  try {
    const { firstName, lastName, age, email, password } = req.body;
    await Users.create({
      firstName,
      lastName,
      age,
      email,
      password,
    });

    res.json("user created");
  } catch (error) {
    res.json({
      msg: error.message,
    });
  }
};

const updateUser = async (req, res) => {
  const { email } = req.params;
  const { firstName, lastName, age, password } = req.body;

  try {
    const updatingUser = await Users.updateOne(
      { email },
      { firstName, lastName, age, password }
    );
    if (updateUser === null) {
      return response.status(400).json({
        msg: "user not found",
      });
    }

    res.json("usuario actualizado");
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  const { email } = req.params;

  try {
    const userRemove = await Users.findOne({ email });
    if (userRemove === null) {
      return response.status(400).json({
        msg: "user not found",
      });
    }

    await Users.deleteOne({ email });
    res.json("usuario eliminado");
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
};

module.exports = { getUsers, createUser, updateUser, deleteUser };
