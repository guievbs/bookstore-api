const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware.verifyAdmin, userController.getAllUsers);
router.get("/:id", authMiddleware.verifyAdmin, userController.getUserById);
router.put("/:id", authMiddleware.verifyAdmin, userController.updateUser);
router.delete("/:id", authMiddleware.verifyAdmin, userController.deleteUser);

module.exports = router;
