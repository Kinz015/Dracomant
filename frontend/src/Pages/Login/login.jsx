import React from "react";
import { BsEyeSlash, BsEye } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";
import styles from "../CriarLogin/index.module.css";
import "./GoogleSignInButton.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import useVisiblePass from "../../hooks/useVisiblePass";
import UserContext from "../../UserContext";
import useLogin from "../../hooks/useLogin";
import useLoginGoogle from "../../hooks/useLoginGoogle";

const Login = () => {
  const { setUserData } = useContext(UserContext);
  const [inputEmail, setEmail] = useState("");
  const [inputPassword, setPassword] = useState("");
  const { login, loading: loadingEmail, error: errorEmail } = useLogin();
  const {
    loginGoogle,
    loading: loadingGoogle,
    error: errorGoogle,
  } = useLoginGoogle();

  const navigate = useNavigate();

  const { visiblePass, setVisiblePass } = useVisiblePass();

  const logar = async (e) => {
    e.preventDefault(); // Previne o reload da página
    const email = inputEmail;
    const senha = inputPassword;

    try {
      const userData = await login(email, senha);
      setUserData(userData);
      alert("Login realizado com sucesso!");
      navigate("/minhaconta");
    } catch (err) {
      alert(err.message);
    }
  };

  const logarGoogle = async (e) => {
    e.preventDefault(); // Previne o reload da página

    try {
      await loginGoogle();
      alert("Login realizado com sucesso!");
      navigate("/minhaconta");
    } catch (err) {
      alert(err.message); // Exibe o alerta de erro
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
          <button
            onClick={logar}
            className={styles.botao}
            disabled={loadingEmail}
          >
            {loadingEmail ? "Carregando..." : "Login"}
          </button>
          {errorEmail && <span>{errorEmail}</span>}
          <button
            onClick={logarGoogle}
            className="gsi-material-button"
            disabled={loadingGoogle}
          >
            <div className="gsi-material-button-state"></div>
            <div className="gsi-material-button-content-wrapper">
              <div className="gsi-material-button-icon">
                <svg
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  style={{ display: "block" }}
                >
                  <path
                    fill="#EA4335"
                    d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 
            2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 
            13.22l7.98 6.19C12.43 13.72 17.74 9.5 
            24 9.5z"
                  />
                  <path
                    fill="#4285F4"
                    d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 
            2.96-2.26 5.48-4.78 7.18l7.73 
            6c4.51-4.18 7.09-10.36 7.09-17.65z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 
            16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 
            10.78l7.97-6.19z"
                  />
                  <path
                    fill="#34A853"
                    d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 
            1.45-4.92 2.3-8.16 2.3-6.26 
            0-11.57-4.22-13.47-9.91l-7.98 
            6.19C6.51 42.62 14.62 48 24 48z"
                  />
                  <path fill="none" d="M0 0h48v48H0z" />
                </svg>
              </div>
              <span className="gsi-material-button-contents">
                {loadingGoogle ? "Carregando..." : "Sign in with Google"}
              </span>
            </div>
          </button>
          {errorGoogle && <span>{errorGoogle}</span>}
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
