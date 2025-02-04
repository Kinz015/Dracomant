import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./index.module.css";
import { FaCircleUser } from "react-icons/fa6";
import { IoExitOutline } from "react-icons/io5";
import { MdModeEditOutline } from "react-icons/md";
import UserContext from "../../UserContext";
import { useNavigate } from "react-router-dom";
import { getAuth, updateProfile, onAuthStateChanged } from "firebase/auth";

const Conta = () => {
  const { username, setUsername, userEmail, setUserEmail, avatar, setAvatar, clear, setLogin } =
    useContext(UserContext);
  const [tempName, setTempName] = useState();
  const inputName = useRef();
  const inputRef = useRef();
  const [avatarName, setAvatarName] = useState(null);
  const [avatarTemp, setAvatarTemp] = useState(null);
  const [loading, setLoading] = useState(false);  // Indicador de carregamento
  const [error, setError] = useState(null); 
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    
    // Observa o estado de autenticação
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Usuário está logado
        setLogin(true); // Atualiza o estado de login
        setUsername(user.displayName); // Armazena o nome
        setTempName(user.displayName)
        setUserEmail(user.email); // Armazena o e-mail
      } else {
        // Usuário não está logado
        setLogin(false); // Atualiza o estado de login
        setUsername(null); // Limpa o nome
        setUserEmail(null); // Limpa o e-mail
      }
    });

    return () => unsubscribe();
  }, [setLogin, setUsername, setUserEmail]);

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
  
  const salvar = async () => {
    const auth = getAuth();  // Obtém a instância de autenticação do Firebase
    const user = auth.currentUser;  // Obtém o usuário autenticado atualmente

    if (!user) {
      setError("Você precisa estar logado para alterar o nome.");
      return;
    }

    if (!tempName) {
      setError("Por favor, insira um nome válido.");
      return;
    }

    setLoading(true);  // Inicia o carregamento

    try {
      // Atualiza o nome de exibição do usuário
      await updateProfile(user, {
        displayName: tempName,  // Atualiza o displayName
      });

      // Atualiza o nome no contexto global
      setUsername(tempName);

      setLoading(false);  // Finaliza o carregamento
      alert("Nome alterado com sucesso!");
    } catch (err) {
      setLoading(false);  // Finaliza o carregamento
      setError("Erro ao alterar o nome. Tente novamente.");
      console.error(err);
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
              <label>Nome</label>
              <div className={styles.ignorDiv}>
                <div className={styles.blocoInput}>
                  <input
                    type="text"
                    value={tempName}
                    onChange={({ target }) => setTempName(target.value)}
                    disabled
                    ref={inputName}
                  />
                  <MdModeEditOutline
                    onClick={AlterarNome}
                    className={styles.btnEdit}
                  />
                </div>
                {tempName !== username && (
                  <button
                    onClick={cancel}
                    className={`${styles.button} ${styles.buttonIgn}`}
                  >
                    Ignorar mudanças
                  </button>
                )}
              </div>
              <label>E-mail</label>
              <p>{userEmail}</p>
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
