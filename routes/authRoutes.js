const express = require("express");
const router = express.Router();
const authorController = require("../controllers/authorController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware.verifyAdmin, authorController.createAuthor);
router.get("/", authorController.getAllAuthors);
router.get("/:id", authorController.getAuthorById);
router.put("/:id", authMiddleware.verifyAdmin, authorController.updateAuthor);
router.delete(
  "/:id",
  authMiddleware.verifyAdmin,
  authorController.deleteAuthor
);

module.exports = router;
