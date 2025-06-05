import { useState } from "react";
import useResetarSenha from "../../hooks/useResetarSenha";
import styles from "./index.module.css"

export default function EsqueciSenha() {
  const [email, setEmail] = useState("");
  const { resetarSenha, loading, error, mensagem } = useResetarSenha();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email) {
      await resetarSenha(email);
    }
  };

  return (
    <div className={styles.bloco} onClick={(e) => e.stopPropagation()}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.title}>Redefinição de senha
        </h2>
        <label htmlFor="email" className={styles.label}>
          Digite seu e-mail:
        </label>
        <input
            className={styles.input}
            id="email"
            type="email"
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            required
          />
        <button className={styles.button} type="submit" disabled={loading}>
          Enviar link de redefinição
        </button>
      </form>

      {mensagem && <p style={{ color: "green" }}>{mensagem}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}