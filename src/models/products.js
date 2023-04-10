// importar mongoose
const mongoose = require("mongoose");

// 2. schema
const productsSchema = mongoose.Schema(
  {
    img: {
      type: String,
      require: true,
    },
    title: {
      type: String,
      require: true,
    },
    brand: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    link: {
      type: String,
      require: true,
    },
  },
  {
    // funcion para agregar la fecha en la que fue creada
    timestamps: true,
  }
);

// 3. modelo

const Products = mongoose.model("Products", productsSchema);

module.exports = Products;
