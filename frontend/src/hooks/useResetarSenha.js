import { useState } from "react";
import { auth } from "../firebase/firebaseConfig";
import { sendPasswordResetEmail } from "firebase/auth";

const useResetarSenha = () => {
  const [error, setError] = useState(null);
  const [mensagem, setMensagem] = useState(null);
  const [loading, setLoading] = useState(false);

  const resetarSenha = async (email) => {
    setLoading(true);
    setError(null);
    setMensagem(null);

    try {
      await sendPasswordResetEmail(auth, email);
      setMensagem("Enviamos um link para redefinir sua senha por e-mail.");
    } catch (err) {
      setError("Erro ao enviar e-mail: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return { resetarSenha, loading, error, mensagem };
};

export default useResetarSenha;
