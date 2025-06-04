import { useState } from "react";
import { auth } from "../firebase/firebaseConfig";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const useLoginGoogle = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const loginGoogle = async () => {
    setLoading(true);
    setError(null);
    const provider = new GoogleAuthProvider();

    try {
      const data = await signInWithPopup(auth, provider);
      console.log("Usuário logado:", data.user)
      console.log("Usuário name:", data.user.displayName)
      console.log("Usuário token:", data.user.accessToken)
      if (data.user.accessToken) {
        localStorage.setItem("token", data.user.accessToken);
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      setLoading(false);
      return data.user;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err; // Lança o erro para que o componente que chamou o hook possa lidar com ele
    }
  };

  return { loginGoogle, loading, error };
};

export default useLoginGoogle;
