import styles from "./index.module.css";
import React from "react";
import LogoENome from "./LogoENome";
import Navbar from "./Navbar";
import Buttons from "./Buttons";

export default function Header() {
  return (
    <header className={styles.header}>
      <LogoENome />
      <Navbar />
      <Buttons />
    </header>
  );
}
