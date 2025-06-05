import { useState } from "react";

const useAtualizarNome = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const atualizarNome = async (nome = tempName) => {
    setLoading(true);
    setError(null);

    try {
      if (nome) {
        await updateProfile(user, { displayName: nome });
      }

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
