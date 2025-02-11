import styles from "./index.module.css";
import logoWpp from "../../assets/logo-whatsapp.png"
import logoInsta from "../../assets/logo-insta.png"
import emailLogo from "../../assets/Email-logo.png"
import logoLinkedin from "../../assets/logo-linkedin.png"

export default function Contato() {
  return (
    <main className={styles.content}>
      <div className={styles.bloco}>
        <h1 className={styles.h1}>ENTRE EM CONTATO CONOSCO</h1>
        <div className={styles.buttons}>
          <a className={styles.button}>
            <img src={logoWpp} alt="" className={styles.logo}/>
            <h2 className={styles.logoName}>Whatsapp</h2>
            <p className={styles.paragraf}>(85) 98807-3262</p>
          </a>
          <a href="https://www.instagram.com/guillins15/" target="blank" className={styles.button}>
            <img src={logoInsta} alt="" className={styles.logo}/>
            <h2 className={styles.logoName}>Instagram</h2>
            <p className={styles.paragraf}>@guillins15</p>
          </a>
          <a className={styles.button}>
            <img src={emailLogo} alt="" className={styles.logo}/>
            <h2 className={styles.logoName}>Email</h2>
            <p className={styles.paragraf}>contato@dracomant.com</p>
          </a>
          <a href="https://www.linkedin.com/in/guilherme-lins-ab2ab3255/" 
          target="blank" className={styles.button}>
            <img src={logoLinkedin} alt="" className={styles.logo}/>
            <h2 className={styles.logoName}>linkedin</h2>
            <p className={styles.paragraf}>Guilherme Lins</p>
          </a>
        </div>
      </div>
    </main>
  );
}
