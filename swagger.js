const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "API de Livraria",
    description: "Documentação da API de gestão de livraria",
  },
  host: "localhost:3000", // Modifique conforme o ambiente (produção, desenvolvimento)
  schemes: ["http"], // Use "https" se necessário
};

const outputFile = "./src/swagger-output.json"; // Arquivo gerado com a documentação
const endpointsFiles = [
  "./src/routes/orderRoutes.js",
  "./src/routes/userRoutes.js",
]; // Rotas que serão documentadas

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require("./src/server.js"); // Inicializa o servidor após gerar a documentação
});
