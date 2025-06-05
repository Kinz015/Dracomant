import React from "react";
import styles from "./index.module.css";
import { AiOutlineMail } from "react-icons/ai";
import { BsPerson, BsEyeSlash, BsEye } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import useVisiblePass from "../../hooks/useVisiblePass";
import useForm from "../../hooks/useForm";
import { useContext } from "react";
import UserContext from "../../UserContext";
import useCadastroUsuario from "../../hooks/useCadastroUsuario";
import BtnGoogle from "../../Components/BtnGoogle";

const CriarLogin = () => {
  const { setUserData } = useContext(UserContext);
  const inputName = useForm();
  const inputEmail = useForm("email");
  const inputPassword = useForm("password");
  const inputPasswordConfirm = useForm();
  const { cadastrarUsuario, loading, error } = useCadastroUsuario();

  const navigate = useNavigate();

  const {
    visiblePass,
    setVisiblePass,
    visiblePassConfirm,
    setVisiblePassConfirm,
  } = useVisiblePass();

  const criarConta = async (e) => {
    e.preventDefault();
    // FAZER VERIFIÇÃO E ADICIONAR NO BANCODE DADOS
    if (
      !inputName.error &&
      !inputEmail.error &&
      !inputPassword.error &&
      !inputPasswordConfirm.error &&
      inputName.value &&
      inputEmail.value &&
      inputPassword.value &&
      inputPasswordConfirm.value
    ) {
      const nome = inputName.value;
      const email = inputEmail.value;
      const senha = inputPassword.value;

      console.log("E-mail que será enviado:", email);

      try {
        const data = await cadastrarUsuario(nome, email, senha);
        alert(data.message || "Cadastro de usuário realizado com sucesso!");
        navigate("/login");
        // Faça algo com os dados, como redirecionar o usuário
      } catch (err) {
        alert(err.message); // Exibe o alerta de erro
      }
    } else {
      inputName.onBlur();
      inputEmail.onBlur();
      inputPassword.onBlur();
      inputPasswordConfirm.onBlur();
    }
  };

  const validarSenhas = () => {
    if (
      inputPassword.value &&
      inputPasswordConfirm.value &&
      inputPasswordConfirm.value !== inputPassword.value
    ) {
      return "As senhas não coincidem";
    }
    return null;
  };

  let err = validarSenhas();

  return (
    <div className={styles.main}>
      <div className={styles.bloco}>
        <form onSubmit={(ev) => ev.preventDefault()} className={styles.form}>
          <h2 className={styles.titulo}>DRACOMANT</h2>
          <p className={styles.criarConta}>CRIE UMA CONTA</p>
          <div
            className={`${styles.blocos_input} ${
              inputName.error && styles.errInput
            }`}
          >
            <input
              className={styles.nome}
              id="name"
              type="text"
              placeholder="Nome do usuário"
              onChange={inputName.onChange}
              onBlur={inputName.onBlur}
              value={inputName.value}
            />
            <BsPerson className={styles.icons} />
          </div>
          <span className={styles.err}>
            {inputName.error && <p>{inputName.error}</p>}
          </span>
          <div
            className={`${styles.blocos_input} ${
              inputEmail.error && styles.errInput
            }`}
          >
            <input
              className={styles.email}
              id="email"
              type="text"
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
              className={styles.password}
              id="password"
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
          <div
            className={`${styles.blocos_input} ${
              (inputPasswordConfirm.error && styles.errInput) ||
              (err && styles.errInput)
            }`}
          >
            <input
              className={styles.passwordConfirm}
              id="passwordConfirm"
              type={visiblePassConfirm ? "text" : "password"}
              placeholder="Confirmar Senha"
              onChange={inputPasswordConfirm.onChange}
              onBlur={inputPasswordConfirm.onBlur}
              value={inputPasswordConfirm.value}
            />
            {visiblePassConfirm ? (
              <BsEye
                onClick={() => setVisiblePassConfirm(!visiblePassConfirm)}
                className={styles.icons}
              />
            ) : (
              <BsEyeSlash
                onClick={() => setVisiblePassConfirm(!visiblePassConfirm)}
                className={styles.icons}
              />
            )}
          </div>
          <span className={styles.err}>
            {inputPasswordConfirm.error && <p>{inputPasswordConfirm.error}</p>}
            {err}
          </span>
          <button
            onClick={criarConta}
            className={styles.botao}
            disabled={loading}
          >
            {loading ? "Cadastrando..." : "Cadastrar"}
          </button>
          {error && <p>{error}</p>}
          <BtnGoogle text="Sign up with Google"/>
          <p className={styles.possuiConta}>
            Já possui uma conta?
            <Link to="/login" className={styles.cliqueAqui}>
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

export default CriarLogin;
