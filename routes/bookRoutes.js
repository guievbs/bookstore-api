const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware.verifyAdmin, bookController.createBook);
router.get("/", bookController.getAllBooks);
router.get("/:id", bookController.getBookById);
router.put("/:id", authMiddleware.verifyAdmin, bookController.updateBook);
router.delete("/:id", authMiddleware.verifyAdmin, bookController.deleteBook);

module.exports = router;
