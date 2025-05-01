import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./index.module.css";
import { FaCircleUser } from "react-icons/fa6";
import { IoExitOutline } from "react-icons/io5";
import { MdModeEditOutline } from "react-icons/md";
import UserContext from "../../UserContext";
import { useNavigate } from "react-router-dom";
import useAtualizarNome from "../../hooks/useAtualizarNome";
import fundoDg from "../../assets/fundoDg.png"

const Conta = () => {
  const { userData, setUserData, clear, setLogin } = useContext(UserContext);
  const [tempName, setTempName] = useState();
  const inputName = useRef();
  const inputRef = useRef();
  const [avatarName, setAvatarName] = useState(null);
  const [avatarTemp, setAvatarTemp] = useState(null);
  const [userId, setUserId] = useState(null);
  const { atualizarNome, loading, error } = useAtualizarNome();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    if (token && user) {
      // Atualiza o estado da aplicação (por exemplo, usando Context API ou Redux)
      setLogin(true);
      setUserData((prevUserData) => ({
        ...prevUserData,
        nome: user.nome,
        email: user.email,
      }));
      setTempName(user.nome);
      setUserId(user.id);
    }
  }, []);

  function AlterarNome() {
    inputName.current.removeAttribute("disabled");
    inputName.current.focus();
  }

  function logout() {
    clear();
    navigate("/login");
  }

  function removerAv() {
    inputRef.current.value = null;
    setAvatarTemp(null);
  }

  function cancel() {
    setTempName(username);
  }

  const salvar = async (e) => {
    e.preventDefault();
    try {
      if (!tempName) {
        setError("Por favor, insira um nome válido.");
        return;
      }
      const data = await atualizarNome(userId, tempName);
      setUserData((prevUserData) => ({
        ...prevUserData,
        nome: tempName,
      }));
      alert(data.message || "Nome atualizado com sucesso!");
      // Faça algo com os dados, como atualizar o estado global do usuário
    } catch (err) {
      alert(err.message); // Exibe o alerta de erro
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.bloco}>
        <p className={styles.minhaConta}>Minha Conta</p>
        <div className={styles.components}>
          <div className={styles.fotoEBtn}>
            <div className={styles.fotoPerfil}>
              {avatarTemp ? (
                <img
                  src={avatarTemp}
                  className={styles.iconUser}
                  alt={avatarName}
                />
              ) : (
                <FaCircleUser className={styles.iconUser} />
              )}
            </div>
            <div className={styles.btsAv}>
              <label
                htmlFor="selecao-arquivo"
                className={`${styles.button} ${styles.btnFoto}`}
              >
                {avatarTemp ? <p>Alterar avatar</p> : <p>Adicionar avatar</p>}
              </label>
              {avatarTemp ? (
                <button
                  onClick={removerAv}
                  className={`${styles.button} ${styles.btnFoto} ${styles.btRemoveAv}`}
                >
                  <p>Remover avatar</p>
                </button>
              ) : null}
            </div>
            <input
              ref={inputRef}
              type="file"
              id="selecao-arquivo"
              hidden
              accept="imagem/jpg, image/jpeg, image/png"
              onChange={({ target: { files } }) => {
                files[0] && setAvatarName(files[0].name);
                if (files) {
                  setAvatarTemp(URL.createObjectURL(files[0]));
                }
              }}
              className={styles.inputImg}
            />
          </div>
          <div className={styles.blocoDois}>
            <div className={styles.escritas}>
              <label>Nome:</label>
              <div className={styles.ignorDiv}>
                <div className={styles.blocoInput}>
                  <input
                    type="text"
                    value={tempName || ""}
                    onChange={({ target }) => setTempName(target.value)}
                    disabled
                    ref={inputName}
                  />
                  <MdModeEditOutline
                    onClick={AlterarNome}
                    className={styles.btnEdit}
                  />
                </div>
                {tempName !== userData.nome && (
                  <button
                    onClick={cancel}
                    className={`${styles.button} ${styles.buttonIgn}`}
                  >
                    Ignorar mudanças
                  </button>
                )}
              </div>
              <label>E-mail:</label>
              <p>{userData.email || ""}</p>
            </div>
            <div className={styles.buttons}>
              <button className={`${styles.button}`}>Alterar Senha</button>
              <button
                onClick={salvar}
                className={`${styles.button} ${styles.btnSalvar}`}
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
        <div className={styles.sair}>
          <button
            onClick={logout}
            className={`${styles.button} ${styles.btnSair}`}
          >
            <IoExitOutline /> Sair
          </button>
        </div>
      </div>
    </main>
  );
};

export default Conta;
