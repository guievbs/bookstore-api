const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware.verifyUser, orderController.createOrder);
router.get("/", authMiddleware.verifyAdmin, orderController.getAllOrders);
router.get("/:id", authMiddleware.verifyUser, orderController.getOrderById);
router.put("/:id", authMiddleware.verifyAdmin, orderController.updateOrder);
router.delete("/:id", authMiddleware.verifyAdmin, orderController.deleteOrder);

module.exports = router;
