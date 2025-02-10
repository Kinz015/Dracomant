import { useState } from "react";

const useLogin = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (email, senha) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, senha }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erro ao fazer login");
      }

      const data = await response.json();
      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      setLoading(false);
      return data.user;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err; // Lança o erro para que o componente que chamou o hook possa lidar
    }
  };

  return { login, loading, error };
};

export default useLogin;
