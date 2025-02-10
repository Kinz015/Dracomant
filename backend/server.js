import { config } from "dotenv";
import express from "express";
import mysql from "mysql2";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

config();

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

db.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao banco:", err);
    return;
  }
  console.log("Conectado ao MySQL!");
});

app.post("/cadastro", async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    const saltRounds = 10;
    const senhacriptografada = await bcrypt.hash(senha, saltRounds);

    const sql = "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)";
    db.query(sql, [nome, email, senhacriptografada], (err, result) => {
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
      const senhacorreta = await bcrypt.compare(senha, user.senha);
      if (!senhacorreta) {
        return res.status(401).json({ message: "Senha incorreta" });
      }

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

app.listen(5000, () => {
  console.log("Servidor rodando na porta 5000");
});
