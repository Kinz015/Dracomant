import { Link } from "react-router-dom";
import styles from "./index.module.css";
import { useContext } from "react";
import { IoPersonCircleSharp } from "react-icons/io5";
import UserContext from "../../../UserContext";

export default function Buttons() {
  const { username, login, avatar } = useContext(UserContext);

  return (
    <>
      {login ? (
        <div className={styles.loged}>
          <Link to="minhaconta" className={styles.logado}>
            <p>{username}</p>
            {avatar ? (
              <img src={avatar} className={styles.userImg} />
            ) : (
              <IoPersonCircleSharp className={styles.userIcon} />
            )}
          </Link>
        </div>
      ) : (
        <div className={styles.divButtons}>
          <Link className={`${styles.login} ${styles.button}`} to="login">
            Login
          </Link>
          <Link
            className={`${styles.criarLogin} ${styles.button}`}
            to="criarlogin"
          >
            Criar Login
          </Link>
        </div>
      )}
    </>
  );
}
