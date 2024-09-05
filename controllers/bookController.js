const Book = require("../models/Book");

// Cria um novo livro
exports.createBook = async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar livro" });
  }
};

// Obtém todos os livros com paginação
exports.getAllBooks = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const books = await Book.find()
      .skip((page - 1) * limit)
      .limit(Number(limit));
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: "Erro ao obter livros" });
  }
};

// Obtém um livro por ID
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ error: "Livro não encontrado" });
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: "Erro ao obter livro" });
  }
};

// Atualiza um livro por ID
exports.updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!book) return res.status(404).json({ error: "Livro não encontrado" });
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar livro" });
  }
};

// Deleta um livro por ID
exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ error: "Livro não encontrado" });
    res.json({ message: "Livro deletado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar livro" });
  }
};

// Obtém os 3 livros com maior estoque
exports.getTopStockBooks = async (req, res) => {
  try {
    const topBooks = await Book.find().sort({ stock: -1 }).limit(3);
    res.status(200).json(topBooks);
  } catch (error) {
    res.status(500).json({ error: "Erro ao obter livros com maior estoque" });
  }
};
