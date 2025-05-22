import { useState } from "react";

const useAtualizarNome = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const atualizarNome = async (userId, nome = tempName) => {
    setLoading(true);
    setError(null);

    const API_URL = "http://localhost:5000";
    // const API_URL =
    // import.meta.env.MODE === "development"
    //   ? import.meta.env.VITE_API_URL_DEV
    //   : import.meta.env.VITE_API_URL_PROD;

    try {
      const response = await fetch(
        `${API_URL}/usuario/${userId}/nome`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ nome }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erro ao atualizar nome");
      }

      const data = await response.json();
      setLoading(false);
      return data;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err; // Lança o erro para que o componente que chamou o hook possa lidar com ele
    }
  };

  return { atualizarNome, loading, error };
};

export default useAtualizarNome;
