import { useState } from "react";
import { auth, db } from "../firebase/firebaseConfig";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore"; // Firestore functions

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

      const userRef = doc(db, "usuarios", user.uid);
      const userSnap = await getDoc(userRef);

      let userData;

      if (userSnap.exists()) {
        // ✅ Se já existe no Firestore, pega os dados de lá
        userData = userSnap.data();
      } else {
        // 🆕 Se não existe, salva os dados do Google no Firestore
        userData = {
          uid: user.uid,
          nome: user.displayName,
          email: user.email,
          fotoURL: user.photoURL,
        };
        await setDoc(userRef, userData);
      }

      // 🔐 Armazena no localStorage
      localStorage.setItem("user", JSON.stringify(userData));

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
