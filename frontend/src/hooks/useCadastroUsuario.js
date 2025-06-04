import { useState } from "react";
import { auth } from "../firebase/firebaseConfig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const useCadastroUsuario = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const cadastrarUsuario = async (nome, email, senha) => {
    setLoading(true);
    setError(null);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
      const user = userCredential.user;

      // Atualiza o nome do usuário
      if (nome) {
        await updateProfile(user, { displayName: nome });
      }

      console.log("Usuário cadastrado:", user);
      setLoading(false);
      return user;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  return { cadastrarUsuario, loading, error };
};

export default useCadastroUsuario;
