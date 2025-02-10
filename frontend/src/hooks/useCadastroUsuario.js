import { useState } from "react";

const useCadastroUsuario = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const cadastrarUsuario = async (nome, email, senha, confirmarSenha) => {
    setLoading(true);
    setError(null);

    try {
      if (senha !== confirmarSenha) {
        throw new Error("As senhas não coincidem");
      }

      const response = await fetch("/api/cadastro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nome, email, senha }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erro ao cadastrar usuário");
      }

      const data = await response.json();
      setLoading(false);
      return data;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  return { cadastrarUsuario, loading, error };
};

export default useCadastroUsuario;
