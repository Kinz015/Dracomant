import { useState } from "react";

const useAtualizarNome = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const atualizarNome = async (userId, novoNome) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`/api/usuario/${userId}/nome`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ nome: novoNome }),
            });

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
            throw err; // Lança o erro para que o componente que chamou o hook possa lidar
        }
    };

    return { atualizarNome, loading, error };
};

export default useAtualizarNome;