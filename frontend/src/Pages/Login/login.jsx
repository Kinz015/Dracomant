import React from "react";
import { BsEyeSlash, BsEye } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";
import styles from "../CriarLogin/index.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import useVisiblePass from "../../hooks/useVisiblePass";
import UserContext from "../../UserContext";
import useLogin from "../../hooks/useLogin";
import useForm from "../../hooks/useForm";
import BtnGoogle from "../../Components/BtnGoogle";
import EsqueciSenha from "../../Components/EsqueciSenha";

const Login = () => {
  const { setUserData } = useContext(UserContext);
  const inputEmail = useForm("email");
  const inputPassword = useForm("");
  const { login, loading: loadingEmail, error: errorEmail } = useLogin();
  const [visivel, setVisivel] = useState(false);
  const navigate = useNavigate();
  const { visiblePass, setVisiblePass } = useVisiblePass();

  const logar = async (e) => {
    e.preventDefault(); // Previne o reload da página
    const email = inputEmail;
    const senha = inputPassword;

    if (!inputEmail.error) {
      try {
        const userData = await login(email, senha);
        setUserData(userData);
        alert("Login realizado com sucesso!");
        navigate("/minhaconta");
      } catch (err) {
        alert(err.message);
      }
    } else {
      inputEmail.onBlur();
    }
  };

  const toggleModal = () => {
    setVisivel((prev) => !prev);
  };

  return (
    <div className={styles.main}>
      <div className={styles.bloco}>
        <form onSubmit={(ev) => ev.preventDefault()} className={styles.form}>
          <h2 className={styles.titulo}>DRACOMANT</h2>
          <p className={styles.criarConta}>Login</p>
          <div
            className={`${styles.blocos_input} ${
              inputEmail.error && styles.errInput
            }`}
          >
            <input
              type="email"
              placeholder="E-mail"
              onChange={inputEmail.onChange}
              onBlur={inputEmail.onBlur}
              value={inputEmail.value}
            />
            <AiOutlineMail className={styles.icons} />
          </div>
          <span className={styles.err}>
            {inputEmail.error && <p>{inputEmail.error}</p>}
          </span>
          <div
            className={`${styles.blocos_input} ${
              inputPassword.error && styles.errInput
            }`}
          >
            <input
              type={visiblePass ? "text" : "password"}
              placeholder="Senha"
              onChange={inputPassword.onChange}
              onBlur={inputPassword.onBlur}
              value={inputPassword.value}
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
          <span className={styles.err}>
            {inputPassword.error && <p>{inputPassword.error}</p>}
          </span>
          <button
            onClick={logar}
            className={styles.botao}
            disabled={loadingEmail}
          >
            {loadingEmail ? "Carregando..." : "Login"}
          </button>
          {errorEmail && <span>{errorEmail}</span>}
          <p className={styles.or}>ou</p>
          <BtnGoogle text="Sign in with Google" />
          <p className={styles.possuiConta}>
            Esqueceu a senha?
            <span className={styles.cliqueAqui} onClick={toggleModal}>
              Clique aqui
            </span>
          </p>
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
        {visivel && (
          <div className={styles.overlay} onClick={toggleModal}>
            <EsqueciSenha />
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
