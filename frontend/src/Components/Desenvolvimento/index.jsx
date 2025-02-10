import Loading from "../Loading/index";
import styles from "./index.module.css";
import React from "react";

export default function Desenvolvimento() {
  return (
    <div className={styles.content}>
      <h1 className={styles.h1}>Em Desenvolvimento . . .</h1>
      <Loading/>
    </div>
  );
}
