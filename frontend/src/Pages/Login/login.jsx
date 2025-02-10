import { BsEyeSlash, BsEye } from "react-icons/bs";
import React from "react";
import { AiOutlineMail } from "react-icons/ai";
import styles from "../CriarLogin/index.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import useVisiblePass from "../../hooks/useVisiblePass";
import UserContext from "../../UserContext";
import useLogin from "../../hooks/useLogin";

const Login = () => {
  const { setUserData } = useContext(UserContext);
  const [inputEmail, setEmail] = useState("");
  const [inputPassword, setPassword] = useState("");
  const { login, loading, error } = useLogin();

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
          <button onClick={logar} className={styles.botao} disabled={loading}>
            {loading ? "Carregando..." : "Login"}
          </button>
          {error && <p>{error}</p>}
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
