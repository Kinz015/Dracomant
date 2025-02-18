import { useState } from "react";

const useLogin = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (email, senha) => {
    setLoading(true);
    setError(null);

    console.log("Variáveis de ambiente:", import.meta.env);

    const baseUrl = import.meta.env.DEV
      ? import.meta.env.VITE_API_URL_DEV
      : import.meta.env.VITE_API_URL_PROD;

    console.log("Modo de desenvolvimento?", import.meta.env.DEV);
    console.log("URL base:", baseUrl);

    try {
      const response = await fetch(`${baseUrl}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, senha }),
      });

      // Verifique o status da resposta
      console.log("Status da resposta:", response.status);

      // Verifique o texto da resposta (pode não ser JSON)
      const responseText = await response.text();
      console.log("Texto da resposta:", responseText);

      if (!response.ok) {
        // Tente processar o erro como JSON, mas trate caso não seja JSON válido
        let errorData;
        try {
          errorData = JSON.parse(responseText);
        } catch (e) {
          errorData = { message: responseText || "Erro ao fazer login" };
        }
        throw new Error(errorData.message || "Erro ao fazer login");
      }

      // Processar a resposta como JSON
      const data = JSON.parse(responseText);
      console.log("Dados recebidos:", data);

      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      setLoading(false);
      return data.user;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err; // Lança o erro para que o componente que chamou o hook possa lidar com ele
    }
  };

  return { login, loading, error };
};

export default useLogin;