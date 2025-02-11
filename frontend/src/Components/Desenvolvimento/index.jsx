import React from "react";
import Loading from "../Loading/index";
import styles from "./index.module.css";

export default function Desenvolvimento() {
  return (
    <div className={styles.content}>
      <h1 className={styles.h1}>Em Desenvolvimento . . .</h1>
      <Loading/>
    </div>
  );
}
