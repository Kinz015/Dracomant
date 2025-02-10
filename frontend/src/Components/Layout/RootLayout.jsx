import styles from "./index.module.css";
import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../Footer";
import Header from "../Header";
import { useEffect } from "react"
import { useLocation } from "react-router-dom";

import useHasScrollbar from "../../hooks/useHasScrollbar" 



export default function RootLayout() {
  const { hasScrollbar, checkScrollbar } = useHasScrollbar();
  const location = useLocation();

  useEffect(() => {
    // Verifica se há barra de rolagem sempre que a rota muda
    checkScrollbar();
  }, [location.pathname, checkScrollbar]);

  return (
    <main className={hasScrollbar ? `${styles.hasBar }` : `${styles.noHasBar }`}>
      <Header />
      <Outlet />
      <Footer />
    </main>
  );
}
