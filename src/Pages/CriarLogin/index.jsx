import styles from "./index.module.css";
import { AiOutlineMail } from "react-icons/ai";
import { BsPerson, BsEyeSlash, BsEye } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import useVisiblePass from "../../hooks/useVisiblePass";
import useForm from "../../hooks/useForm";
import { useContext } from "react";
import UserContext from "../../UserContext";

const CriarLogin = () => {
  const { setUsername, setLogin, setUserEmail } = useContext(UserContext);
  const inputName = useForm();
  const inputEmail = useForm("email");
  const inputPassword = useForm("password");
  const inputPasswordConfirm = useForm();

  const navigate = useNavigate();

  const {
    visiblePass,
    setVisiblePass,
    visiblePassConfirm,
    setVisiblePassConfirm,
    error,
  } = useVisiblePass();


  const criarConta = async () => {

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

      const name = inputName.value;
      const email = inputEmail.value;
      const password = inputPassword.value;
      

      const response = await fetch("http://localhost:5000/cadastro", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, password })
      });
  
      const result = await response.json();
      alert(result.message);

      console.log(user)

      setUsername(name);
      setUserEmail(email);

      console.log("Usuário registrado:", user);
      alert("Usuário registrado com sucesso!");
        
    } else {
      inputName.onBlur()
      inputEmail.onBlur()
      inputPassword.onBlur()
      inputPasswordConfirm.onBlur()
    }

    // console.log(error);
    // setUsername(name.value);
    // setUserEmail(email.value);
  };

  // Tenho que concertar essa gambiarra ↴

  let err = null;

  if (
    inputPasswordConfirm.value.length !== 0 &&
    inputPasswordConfirm.value !== inputPassword.value
  ) {
    err = "As senhas não coincidem";
  }

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
          <button onClick={criarConta} className={styles.botao}>
            Registrar
          </button>
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
