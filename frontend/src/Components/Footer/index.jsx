import React from "react";
import styles from "./index.module.css";

export default function Footer() {
  const today = new Date()
  const year = today.getFullYear()

  return (
    <footer className={styles.footer}>
      <p>Dracomant &copy; 2023 - {year}</p>
    </footer>
  );
}
