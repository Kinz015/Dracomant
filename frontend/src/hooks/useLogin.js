import { useState } from "react";
import { auth, db } from "../firebase/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const useLogin = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (email, senha) => {
    setLoading(true);
    setError(null);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, senha);
      const user = userCredential.user;

      const docRef = doc(db, "usuarios", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();

        localStorage.setItem("token", user.accessToken);
        localStorage.setItem("user", JSON.stringify(userData));

        setLoading(false);
        return userData;
      } else {
        throw new Error("Usuário não encontrado no Firestore.");
      }
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  return { login, loading, error };
};

export default useLogin;

