import { config } from "dotenv";
import express from "express";
import mysql from "mysql2";
import cors from "cors";

// Carregar variáveis de ambiente do arquivo .env
config();  // Carrega as variáveis do arquivo .env

const app = express();
app.use(cors());
app.use(express.json());

// Configuração da conexão com o banco de dados
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

// Verificar a conexão com o banco de dados
db.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao banco:", err);
    return;
  }
  console.log("Conectado ao MySQL!");
});

// Endpoint para cadastro de usuários
app.post("/cadastro", (req, res) => {
  const { nome, email, senha } = req.body;
  
  const sql = "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)";
  
  db.query(sql, [nome, email, senha], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Erro ao cadastrar usuário", error: err });
    }
    res.status(200).json({ message: "Usuário cadastrado com sucesso!" });
  });
});

// Endpoint para login de usuários
app.post("/login", (req, res) => {
  const { email, senha } = req.body;

  const sql = "SELECT * FROM usuarios WHERE email = ?";
  db.query(sql, [email], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Erro no servidor", error: err });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: "Usuário não encontrado" });
    }

    const user = results[0];

    // Comparar senhas (aqui, sem criptografia)
    if (user.senha !== senha) {
      return res.status(401).json({ message: "Senha incorreta" });
    }

    // Se quiser, você pode usar JWT para gerar um token
    res.status(200).json({ message: "Login realizado com sucesso!", user: { id: user.id, nome: user.nome, email: user.email } });
  });
});


// Iniciar o servidor na porta 5000
app.listen(5000, () => {
  console.log("Servidor rodando na porta 5000");
});
