import { Link } from "react-router-dom";
import React from "react";
import logo from "../../../assets/logo.png";
import styles from "./index.module.css";

export default function LogoENome() {
  return (
    <div className={styles.iconeENome}>
      <Link href="#">
        <img className={styles.logo} src={logo} alt="" />
      </Link>
      <Link href="#">
        <h1 className={styles.titulo}>Dracomant</h1>
      </Link>
    </div>
  );
}
