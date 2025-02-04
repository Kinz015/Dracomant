import logo from "../../../assets/logo.png";
import styles from "./index.module.css";

export default function LogoENome() {
  return (
    <div className={styles.iconeENome}>
      <a href="#">
        <img className={styles.logo} src={logo} alt="" />
      </a>
      <h1 className={styles.titulo}>Dracomant</h1>
    </div>
  );
}
