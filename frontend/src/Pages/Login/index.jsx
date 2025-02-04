import { BsEyeSlash, BsEye } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";
import styles from "../CriarLogin/index.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import useVisiblePass from "../../hooks/useVisiblePass";
import UserContext from "../../UserContext";

const Login = () => {
  const { setUsername, setLogin, setUserEmail } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const {
    visiblePass,
    setVisiblePass,
  } = useVisiblePass();

  const logar = async () => {
    console.log("logou")
  };


  return (
    <div className={styles.main}>
      <div className={styles.bloco}>
        <form onSubmit={(ev) => ev.preventDefault()} className={styles.form}>
          <h2 className={styles.titulo}>DRACOMANT</h2>
          <p className={styles.criarConta}>Login</p>
          <div
            className={styles.blocos_input}
          >
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <AiOutlineMail className={styles.icons} />
          </div>
          <span className={styles.err}></span>
          <div
            className={styles.blocos_input}
          >
            <input
              type={visiblePass ? "text" : "password"}
              placeholder="Senha"
              value={password}
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
