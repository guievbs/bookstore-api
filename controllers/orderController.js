const Order = require("../models/Order");

// Cria um novo pedido
exports.createOrder = async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar pedido" });
  }
};

// Obtém todos os pedidos
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Erro ao obter pedidos" });
  }
};

// Obtém um pedido por ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ error: "Pedido não encontrado" });
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: "Erro ao obter pedido" });
  }
};

// Atualiza um pedido por ID
exports.updateOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!order) return res.status(404).json({ error: "Pedido não encontrado" });
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar pedido" });
  }
};

// Deleta um pedido por ID
exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ error: "Pedido não encontrado" });
    res.json({ message: "Pedido deletado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar pedido" });
  }
};
