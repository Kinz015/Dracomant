import { useState } from "react";
import { auth, db } from "../firebase/firebaseConfig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const useCadastroUsuario = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const cadastrarUsuario = async (nome, email, senha) => {
    setLoading(true);
    setError(null);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        senha
      );
      const user = userCredential.user;

      // Atualiza o nome do usuário no Auth
      if (nome) {
        await updateProfile(user, { displayName: nome });
      }

      const userData = {
        uid: user.uid,
        nome: nome,
        email: email,
        fotoURL: null,
      };

      // Salva no Firestore
      await setDoc(doc(db, "usuarios", user.uid), userData);

      // Salva localmente
      localStorage.setItem("token", user.accessToken);
      localStorage.setItem("user", JSON.stringify(userData));

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

