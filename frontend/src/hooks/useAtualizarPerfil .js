import { useState } from "react";
import { auth, db } from "../firebase/firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";

const useAtualizarPerfilFirestore = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const atualizarPerfil = async ({ nome, fotoURL }) => {
    setLoading(true);
    setError(null);

    const user = auth.currentUser;
    if (!user) {
      setError("Usuário não autenticado.");
      setLoading(false);
      return;
    }

    try {
      // 🔄 Atualiza apenas no Firestore
      const userRef = doc(db, "usuarios", user.uid);
      const updateData = {};
      if (nome) updateData.nome = nome;
      if (fotoURL) updateData.fotoURL = fotoURL;

      if (Object.keys(updateData).length > 0) {
        await updateDoc(userRef, updateData);
      }

      // 🔄 Atualiza localStorage
      const updatedUserData = {
        uid: user.uid,
        nome: nome || auth.currentUser.displayName,
        email: user.email,
        fotoURL: fotoURL || null,
      };

      localStorage.setItem("user", JSON.stringify(updatedUserData));

      setLoading(false);
      return updatedUserData;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  return { atualizarPerfil, loading, error };
};

export default useAtualizarPerfilFirestore;
