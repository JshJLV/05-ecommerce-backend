// IMPORTAR MONGOOSE
const mongoose = require("mongoose");

// FUNCION PARA CONECTAR LA DB
const connectDB = async () => {
  try {
    // CONEXION A BASE DE DATOS
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("running db");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
