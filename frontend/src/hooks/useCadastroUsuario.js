import { useState } from "react";

const useCadastroUsuario = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const cadastrarUsuario = async (nome, email, senha, confirmarSenha) => {
    setLoading(true);
    setError(null);

    const API_URL =
      import.meta.env.MODE === "development"
        ? import.meta.env.VITE_API_URL_DEV
        : import.meta.env.VITE_API_URL_PROD;

    console.log("Modo do Vite: ", import.meta.env.MODE);
    console.log("API_URL:", API_URL);

    try {
      if (senha !== confirmarSenha) {
        throw new Error("As senhas não coincidem");
      }

      const response = await fetch(`${API_URL}/cadastro`, {
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
