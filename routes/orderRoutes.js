const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const authMiddleware = require("../middleware/authMiddleware");
const { body, param } = require("express-validator");

// Middleware de validação
const validateCreateOrder = [
  body("books").isArray().withMessage("Books must be an array"),
  body("totalPrice")
    .isFloat({ gt: 0 })
    .withMessage("Total price must be a positive number"),
];

const validateUpdateOrder = [
  param("id").isMongoId().withMessage("Invalid order ID"),
  body("books").isArray().withMessage("Books must be an array"),
  body("totalPrice")
    .isFloat({ gt: 0 })
    .withMessage("Total price must be a positive number"),
];

// Certifique-se de que todos os handlers de rotas estejam corretamente definidos
router.post(
  "/",
  authMiddleware.authMiddleware,
  validateCreateOrder,
  orderController.createOrder
);

router.get("/", authMiddleware.verifyAdmin, orderController.getAllOrders);

router.get(
  "/:id",
  authMiddleware.authMiddleware,
  param("id").isMongoId().withMessage("Invalid order ID"),
  orderController.getOrderById
);

router.put(
  "/:id",
  authMiddleware.verifyAdmin,
  validateUpdateOrder,
  orderController.updateOrder
);

router.delete(
  "/:id",
  authMiddleware.verifyAdmin,
  param("id").isMongoId().withMessage("Invalid order ID"),
  orderController.deleteOrder
);

module.exports = router;
