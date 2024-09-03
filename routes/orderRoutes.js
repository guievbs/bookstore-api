const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const authMiddleware = require("../middleware/authMiddleware");

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Create a new order
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               books:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     bookId:
 *                       type: string
 *                     quantity:
 *                       type: number
 *               totalPrice:
 *                 type: number
 *     responses:
 *       201:
 *         description: Order created successfully
 *       400:
 *         description: Bad request
 */
router.post("/", authMiddleware.verifyUser, orderController.createOrder);

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Retrieve a list of orders
 *     responses:
 *       200:
 *         description: A list of orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 */
router.get("/", authMiddleware.verifyAdmin, orderController.getAllOrders);

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Retrieve an order by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The order ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: An order object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 */
router.get("/:id", authMiddleware.verifyUser, orderController.getOrderById);

/**
 * @swagger
 * /api/orders/{id}:
 *   put:
 *     summary: Update an order by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The order ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               books:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     bookId:
 *                       type: string
 *                     quantity:
 *                       type: number
 *               totalPrice:
 *                 type: number
 *     responses:
 *       200:
 *         description: Order updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Order not found
 */
router.put("/:id", authMiddleware.verifyAdmin, orderController.updateOrder);

/**
 * @swagger
 * /api/orders/{id}:
 *   delete:
 *     summary: Delete an order by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The order ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order deleted successfully
 *       404:
 *         description: Order not found
 */
router.delete("/:id", authMiddleware.verifyAdmin, orderController.deleteOrder);

module.exports = router;
