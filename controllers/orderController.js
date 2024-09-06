const Order = require("../models/Order");
const Book = require("../models/Book");

// Cria um novo pedido
exports.createOrder = async (req, res) => {
  try {
    const { books } = req.body;
    const userId = req.user.id;

    // Calcular o preço total dos livros com base na quantidade
    let totalPrice = 0;
    const orderBooks = await Promise.all(
      books.map(async (item) => {
        const book = await Book.findById(item.book);
        if (!book) {
          throw new Error(`Livro com ID ${item.book} não encontrado`);
        }
        totalPrice += book.price * item.quantity;
        return { book: book._id, quantity: item.quantity };
      })
    );

    const order = new Order({
      user: userId,
      books: orderBooks,
      totalPrice,
    });

    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message || "Erro ao criar pedido" });
  }
};

// Obtém todos os pedidos
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("books.book");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Erro ao obter pedidos" });
  }
};

// Obtém um pedido por ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("books.book");
    if (!order) return res.status(404).json({ error: "Pedido não encontrado" });
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: "Erro ao obter pedido" });
  }
};

// Obtém todos os pedidos do usuário logado
exports.getUserOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await Order.find({ user: userId }).populate("books.book");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Erro ao obter pedidos do usuário" });
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
