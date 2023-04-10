const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const configureRoutes = require("./routes");

(async () => {
  await connectDB();
  // MIDDLEWARES
  app.use(cors());

  // BODYPARSER
  app.use(express.json());

  // ROUTES
  configureRoutes(app);

  app.listen(+process.env.PORT, () => {
    console.log(`servidor en ${process.env.PORT}`);
  });
})();
