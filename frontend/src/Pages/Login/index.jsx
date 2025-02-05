import { BsEyeSlash, BsEye } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";
import styles from "../CriarLogin/index.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import useVisiblePass from "../../hooks/useVisiblePass";
import UserContext from "../../UserContext";

const Login = () => {
  const { setUsername, setLogin, setUserEmail } = useContext(UserContext);
  const [inputEmail, setEmail] = useState("");
  const [inputPassword, setPassword] = useState("");

  const navigate = useNavigate();

  const { visiblePass, setVisiblePass } = useVisiblePass();

  const logar = async (e) => {
    e.preventDefault(); // Previne o reload da página
    const email = inputEmail;
    const senha = inputPassword;

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, senha }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.message || "Erro ao fazer login");
        return;
      }

      const data = await response.json();
      alert("Login realizado com sucesso!");

      // Opcional: Armazene o token no localStorage para usar depois
      if (data.token) {
        localStorage.setItem("token", data.token);
      }
    } catch (err) {
      alert("Erro de conexão com o servidor");
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.bloco}>
        <form onSubmit={(ev) => ev.preventDefault()} className={styles.form}>
          <h2 className={styles.titulo}>DRACOMANT</h2>
          <p className={styles.criarConta}>Login</p>
          <div className={styles.blocos_input}>
            <input
              type="email"
              placeholder="E-mail"
              value={inputEmail}
              onChange={(e) => setEmail(e.target.value)}
            />

            <AiOutlineMail className={styles.icons} />
          </div>
          <span className={styles.err}></span>
          <div className={styles.blocos_input}>
            <input
              type={visiblePass ? "text" : "password"}
              placeholder="Senha"
              value={inputPassword}
              onChange={(e) => setPassword(e.target.value)}
            />
            {visiblePass ? (
              <BsEye
                onClick={() => setVisiblePass(!visiblePass)}
                className={styles.icons}
              />
            ) : (
              <BsEyeSlash
                onClick={() => setVisiblePass(!visiblePass)}
                className={styles.icons}
              />
            )}
          </div>
          <span className={styles.err}></span>
          <button onClick={logar} className={styles.botao}>
            "Entrar"
          </button>
          <p className={styles.possuiConta}>
            Não possui uma conta?
            <Link to="/criarLogin" className={styles.cliqueAqui}>
              Clique aqui
            </Link>
          </p>
        </form>
        <div className={styles.img}>
          <h1 className={styles.coment}>
            Amplie seu negócio de forma rapida e tecnológica
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Login;
