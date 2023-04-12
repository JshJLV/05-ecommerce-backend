const { response } = require("express");
const Users = require("../models/users");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");

// obtener usuarios
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

// crear un nuevo usuario
const createUser = async (req, res) => {
  try {
    const { firstName, lastName, age, email, password } = req.body;

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = await Users.create({
      firstName,
      lastName,
      age,
      email,
      password: hashedPassword,
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

// verificar si el usuario existe
const verifyUser = async (req, res) => {
  try {
    const verify = await Users.findOne(res.user.id).select("-password");
    res.json({ verify });
  } catch (error) {
    res.status(500).json({
      msg: "Hubo un error",
      error,
    });
  }
};

// login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    let foundUser = await Users.findOne({ email: email });

    if (!foundUser) {
      return res.status(400).json({ msg: "el usuario no existe" });
    }

    const verifyPassword = await bcryptjs.compare(password, foundUser.password);

    if (!verifyPassword) {
      return await res.status(500).json({ msg: "password incorrecto" });
    }

    const payload = {
      user: {
        id: foundUser._id,
      },
    };

    if (email && verifyPassword) {
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
    }
  } catch (error) {
    res.json({
      msg: "No se puede logear",
      error: error,
    });
  }
};

// actualizar un usuario
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

// eliminar un usuario
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

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  verifyUser,
  loginUser,
};
