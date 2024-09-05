const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Book = require("../models/Book");
const Author = require("../models/Author");
const bcrypt = require("bcryptjs");

// Dados iniciais
const authors = [
  { name: "J.R.R. Tolkien", bio: "Autor de O Senhor dos Anéis" },
  {
    name: "Arthur C. Clarke",
    bio: "Escritor e inventor britânico radicado no Sri Lanka",
  },
  { name: "Isaac Asimov", bio: "Um dos mestres da ficção científica" },
  {
    name: "Fiódor Dostoiévski",
    bio: "Um dos maiores romancistas e pensadores da história, bem como um dos maiores psicólogos que já existiram.",
  },
  {
    name: "Liev Tolstoi",
    bio: "Escritor russo, amplamente reconhecido como um dos maiores de todos os tempos",
  },
  {
    name: "Johann Wolfgang von Goethe",
    bio: "Polímata, autor e estadista alemão do Sacro Império Romano-Germânico que também fez incursões pelo campo da ciência natural",
  },
];

const books = [
  {
    title: "O Senhor dos Anéis",
    author: "J.R.R. Tolkien",
    genre: "Fantasia",
    price: 29.9,
    stock: 100,
  },
  {
    title: "2001: Uma Odisseia no Espaço",
    author: "Arthur C. Clarke",
    genre: "Ficção Científica",
    price: 25.9,
    stock: 50,
  },
  {
    title: "Fundação",
    author: "Isaac Asimov",
    genre: "Ficção Científica",
    price: 27.5,
    stock: 75,
  },
  {
    title: "Crime e Castigo",
    author: "Fiódor Dostoiévski",
    genre: "Literatura",
    price: 22.9,
    stock: 60,
  },
  {
    title: "Guerra e Paz",
    author: "Liev Tolstoi",
    genre: "Literatura",
    price: 35.0,
    stock: 40,
  },
  {
    title: "Fausto",
    author: "Johann Wolfgang von Goethe",
    genre: "Literatura",
    price: 30.0,
    stock: 55,
  },
  {
    title: "O Hobbit",
    author: "J.R.R. Tolkien",
    genre: "Fantasia",
    price: 19.9,
    stock: 80,
  },
  {
    title: "Encontro com Rama",
    author: "Arthur C. Clarke",
    genre: "Ficção Científica",
    price: 23.5,
    stock: 45,
  },
  {
    title: "Eu, Robô",
    author: "Isaac Asimov",
    genre: "Ficção Científica",
    price: 20.0,
    stock: 70,
  },
  {
    title: "Os Irmãos Karamazov",
    author: "Fiódor Dostoiévski",
    genre: "Literatura",
    price: 28.0,
    stock: 65,
  },
];

/**
 * @swagger
 * /api/install:
 *   get:
 *     summary: Initialize the database with default data
 *     responses:
 *       200:
 *         description: Initial data inserted successfully
 *       500:
 *         description: Error initializing database
 */
router.get("/", async (req, res) => {
  try {
    // Limpar coleções existentes
    await Author.deleteMany({});
    await Book.deleteMany({});
    await User.deleteMany({});

    // Criar autores
    const authorDocs = await Author.insertMany(
      authors.map((author) => ({ name: author.name, bio: author.bio }))
    );

    // Criar livros
    const bookDocs = await Book.insertMany(
      books.map((book) => ({
        title: book.title,
        genre: book.genre,
        price: book.price,
        stock: book.stock,
        author: authorDocs.find((a) => a.name === book.author)._id,
      }))
    );

    // Criar usuário admin
    const hashedPassword = await bcrypt.hash("admin123", 10);
    await User.create({
      name: "AdminDefault",
      email: "admin@roleadm.com",
      password: hashedPassword,
      role: "admin",
    });

    res.status(200).json({ message: "Dados iniciais inseridos com sucesso!" });
  } catch (error) {
    res.status(500).json({
      message: "Erro ao inicializar o banco de dados",
      error: error.message,
    });
  }
});

module.exports = router;
