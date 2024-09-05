const express = require("express");
const router = express.Router();
const authorController = require("../controllers/authorController");

// Exemplo de rotas para autores
router.post("/", authorController.createAuthor); // Cria um autor
router.get("/", authorController.getAllAuthors); // Obtém todos os autores
router.get("/:id", authorController.getAuthorById); // Obtém um autor por ID
router.put("/:id", authorController.updateAuthor); // Atualiza um autor por ID
router.delete("/:id", authorController.deleteAuthor); // Deleta um autor por ID

module.exports = router;
