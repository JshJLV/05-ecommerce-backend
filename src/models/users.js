// importar mongoose
const mongoose = require("mongoose");

// 2. schema
const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    zipCode: {
      type: String,
      required: true,
    },
    street: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    // funcion para agregar la fecha en la que fue creada
    timestamps: true,
  }
);

// 3. modelo

const Users = mongoose.model("Users", userSchema);

module.exports = Users;
