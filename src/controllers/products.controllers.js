const Products = require("../models/products");

const getProducts = async (req, res) => {
  try {
    const products = await Products.find({});

    res.json(products);
  } catch (error) {
    res.status(500).json({
      msg: "Hubo un error con los datos",
    });
  }
};

module.exports = { getProducts };
