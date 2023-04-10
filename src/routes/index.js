const configureRoutes = (app) => {
  app.use("/users", require("./users.routes"));
  app.use("/products", require("./products.routes"));
};

module.exports = configureRoutes;
