const { Router } = require("express");
const router = Router();
const { getProducts } = require("../controllers/products.controllers");

router.get("/", getProducts);

module.exports = router;
