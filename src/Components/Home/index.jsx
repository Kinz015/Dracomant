import { Link } from "react-router-dom";
import styles from "./index.module.css";
import Template from "./Templates";
import { IoIosArrowDown } from "react-icons/io";

export default function Home() {
  const scrollSuave = (ev) => {
    ev.preventDefault();
    const href = ev.currentTarget.getAttribute("href");
    const section = document.querySelector(href);
    section.scrollIntoView({
      behavior: "smooth",
    });
  };
  return (
    <>
      <main className={`${styles.blocos} ${styles.main}`}>
        <div className={styles.fundoImg}>
          <div className={styles.divAtendimento}>
            <h3>
              Dracomant Desenvolvimento
              <br />
              de Sites Web e Mobile
            </h3>
            <h4>
              Dracomant é uma empresa de profissionais em desenvolvimento de
              sites!
            </h4>
            <p className={styles.comentario}>
              Aqui entregamos seu site com a melhor qualidade e menor tempo.
            </p>
            <div className={styles.botoes}>
              <Link to={"/atendimento"} className={styles.botaoAgendamento}>
                <span>Começe o atendimento</span>
              </Link>
              <a
                onClick={scrollSuave}
                href="#templates"
                className={styles.botaoAgendamento}
              >
                <span>
                  Ver Templates{" "}
                  <IoIosArrowDown
                    style={{
                      position: "relative",
                      top: "3px",
                    }}
                  />
                </span>
              </a>
            </div>
          </div>
        </div>
        <h2 className={styles.dracTem} id="templates">
          Dracomant's Templates
        </h2>
        <div className={styles.divTemplates}>
          <Template />
        </div>
      </main>
    </>
  );
}
