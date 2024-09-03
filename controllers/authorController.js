const Author = require("../models/Author");

// Cria um novo autor
exports.createAuthor = async (req, res) => {
  try {
    const author = new Author(req.body);
    await author.save();
    res.status(201).json(author);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar autor" });
  }
};

// Obtém todos os autores
exports.getAllAuthors = async (req, res) => {
  try {
    const authors = await Author.find();
    res.json(authors);
  } catch (error) {
    res.status(500).json({ error: "Erro ao obter autores" });
  }
};

// Obtém um autor por ID
exports.getAuthorById = async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    if (!author) return res.status(404).json({ error: "Autor não encontrado" });
    res.json(author);
  } catch (error) {
    res.status(500).json({ error: "Erro ao obter autor" });
  }
};

// Atualiza um autor por ID
exports.updateAuthor = async (req, res) => {
  try {
    const author = await Author.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!author) return res.status(404).json({ error: "Autor não encontrado" });
    res.json(author);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar autor" });
  }
};

// Deleta um autor por ID
exports.deleteAuthor = async (req, res) => {
  try {
    const author = await Author.findByIdAndDelete(req.params.id);
    if (!author) return res.status(404).json({ error: "Autor não encontrado" });
    res.json({ message: "Autor deletado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar autor" });
  }
};
