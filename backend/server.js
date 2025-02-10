import dotenv from "dotenv";
import express from "express";
import mysql from "mysql2";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

dotenv.config({ path: '../.env' }); // Carrega as variáveis do arquivo .env

const app = express();
app.use(cors({
  origin: 'https://dracomant.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));
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
app.post("/cadastro", async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    // Criptografa a senha
    const saltRounds = 10; // Número de rounds para gerar o salt
    const senhaCriptografada = await bcrypt.hash(senha, saltRounds);

    // Insere o usuário no banco de dados com a senha criptografada
    const sql = "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)";
    db.query(sql, [nome, email, senhaCriptografada], (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Erro ao cadastrar usuário", error: err });
      }
      res.status(200).json({ message: "Usuário cadastrado com sucesso!" });
    });
  } catch (error) {
    console.error("Erro ao criptografar a senha:", error);
    res.status(500).json({ message: "Erro no servidor", error: error });
  }
});

// Endpoint para login de usuários
app.post("/login", async (req, res) => {
  const { email, senha } = req.body;

  const sql = "SELECT * FROM usuarios WHERE email = ?";
  db.query(sql, [email], async (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Erro no servidor", error: err });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: "Usuário não encontrado" });
    }

    const user = results[0];

    try {
      // Compara a senha fornecida com a senha criptografada
      const senhaCorreta = await bcrypt.compare(senha, user.senha);

      if (!senhaCorreta) {
        return res.status(401).json({ message: "Senha incorreta" });
      }

      // Gera um token JWT
      const token = jwt.sign({ userId: user.id }, "segredo", {
        expiresIn: "1h",
      });

      res.status(200).json({
        message: "Login realizado com sucesso!",
        user: { id: user.id, nome: user.nome, email: user.email },
        token,
      });
    } catch (error) {
      console.error("Erro ao verificar a senha:", error);
      res.status(500).json({ message: "Erro no servidor", error: error });
    }
  });
});

app.put("/usuario/:id/nome", (req, res) => {
  const userId = req.params.id;
  const { nome } = req.body;

  const sql = "UPDATE usuarios SET nome = ? WHERE id = ?";
  db.query(sql, [nome, userId], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Erro no servidor", error: err });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    res.status(200).json({ message: "Nome atualizado com sucesso!" });
  });
});

// Iniciar o servidor na porta 5000
app.listen(5000, () => {
  console.log("Servidor rodando na porta 5000");
});
