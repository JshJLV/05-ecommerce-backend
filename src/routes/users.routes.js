const { Router } = require("express");
const router = Router();
const auth = require("../middlewares/auth");
const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  verifyUser,
  loginUser,
} = require("../controllers/users.controllers");

router.get("/", auth, getUsers);
router.post("/", createUser);
router.put("/:email", updateUser);
router.delete("/:email", deleteUser);
router.post("/verify", verifyUser);
router.post("/login", loginUser);

module.exports = router;
