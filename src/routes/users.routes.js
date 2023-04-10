const { Router } = require("express");
const router = Router();
const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/users.controllers");

router.get("/", getUsers);
router.post("/", createUser);
router.put("/:email", updateUser);
router.delete("/:email", deleteUser);

module.exports = router;
