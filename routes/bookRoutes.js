const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");
const authMiddleware = require("../middleware/authMiddleware");
const { body, param } = require("express-validator");

// Middleware de validação
const validateCreateBook = [
  body("title").notEmpty().withMessage("Title is required"),
  body("author").notEmpty().withMessage("Author is required"),
  body("genre").notEmpty().withMessage("Genre is required"),
  body("price").isNumeric().withMessage("Price must be a number"),
  body("stock")
    .isInt({ min: 0 })
    .withMessage("Stock must be a non-negative integer"),
];

const validateUpdateBook = [
  param("id").isMongoId().withMessage("Invalid book ID"),
  body("title").optional().notEmpty().withMessage("Title is required"),
  body("author").optional().notEmpty().withMessage("Author is required"),
  body("genre").optional().notEmpty().withMessage("Genre is required"),
  body("price").optional().isNumeric().withMessage("Price must be a number"),
  body("stock")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Stock must be a non-negative integer"),
];

/**
 * @swagger
 * /api/books:
 *   post:
 *     summary: Create a new book
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the book
 *               author:
 *                 type: string
 *                 description: The author of the book
 *               genre:
 *                 type: string
 *                 description: The genre of the book
 *               price:
 *                 type: number
 *                 description: The price of the book
 *               stock:
 *                 type: number
 *                 description: The stock quantity of the book
 *     responses:
 *       201:
 *         description: Book created successfully
 *       400:
 *         description: Bad request
 */
router.post(
  "/",
  authMiddleware.verifyAdmin,
  validateCreateBook,
  bookController.createBook
);

/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: Retrieve a list of books
 *     responses:
 *       200:
 *         description: A list of books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 */
router.get("/", bookController.getAllBooks);

/**
 * @swagger
 * /api/books/{id}:
 *   get:
 *     summary: Retrieve a book by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The book ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A book object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 */
router.get(
  "/:id",
  param("id").isMongoId().withMessage("Invalid book ID"),
  bookController.getBookById
);

/**
 * @swagger
 * /api/books/{id}:
 *   put:
 *     summary: Update a book by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The book ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the book
 *               author:
 *                 type: string
 *                 description: The author of the book
 *               genre:
 *                 type: string
 *                 description: The genre of the book
 *               price:
 *                 type: number
 *                 description: The price of the book
 *               stock:
 *                 type: number
 *                 description: The stock quantity of the book
 *     responses:
 *       200:
 *         description: Book updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Book not found
 */
router.put(
  "/:id",
  authMiddleware.verifyAdmin,
  validateUpdateBook,
  bookController.updateBook
);

/**
 * @swagger
 * /api/books/{id}:
 *   delete:
 *     summary: Delete a book by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The book ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Book deleted successfully
 *       404:
 *         description: Book not found
 */
router.delete(
  "/:id",
  authMiddleware.verifyAdmin,
  param("id").isMongoId().withMessage("Invalid book ID"),
  bookController.deleteBook
);

/**
 * @swagger
 * /api/books/top-stock:
 *   get:
 *     summary: Retrieve the top 3 books with the highest stock
 *     responses:
 *       200:
 *         description: A list of top 3 books with highest stock
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 */
router.get("/top-stock", bookController.getTopStockBooks);

module.exports = router;
