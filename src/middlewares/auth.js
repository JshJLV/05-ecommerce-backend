const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ msg: "Permiso no valido" });
  }

  try {
    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);

    req.user = verifyToken.user;

    next();
  } catch (error) {
    res.json({ msg: "hubo un error" });
  }
};
