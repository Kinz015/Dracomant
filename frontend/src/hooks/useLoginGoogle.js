import { useState } from "react";
import { auth, db } from "../firebase/firebaseConfig";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; // Firestore functions

const useLoginGoogle = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const loginGoogle = async () => {
    setLoading(true);
    setError(null);
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      if (user.accessToken) {
        localStorage.setItem("token", user.accessToken);
      }

      const userData = {
        uid: user.uid,
        nome: user.displayName,
        email: user.email,
        fotoURL: user.photoURL,
      };

      localStorage.setItem("user", JSON.stringify(userData));

      // 🔥 Salvar dados no Firestore
      await setDoc(doc(db, "usuarios", user.uid), userData);

      setLoading(false);
      return user;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  return { loginGoogle, loading, error };
};

export default useLoginGoogle;
