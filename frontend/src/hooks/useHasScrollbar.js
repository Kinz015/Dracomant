import { useEffect, useState } from "react";

function useHasScrollbar() {
  const [hasScrollbar, setHasScrollbar] = useState(false);

  const checkScrollbar = () => {
    const hasVerticalScrollbar = document.documentElement.scrollHeight > window.innerHeight;
    setHasScrollbar(hasVerticalScrollbar);
  };

  useEffect(() => {
    // Verifica ao montar o componente
    checkScrollbar();

    // Escuta mudanças de tamanho da janela
    window.addEventListener("resize", checkScrollbar);
    return () => window.removeEventListener("resize", checkScrollbar);
  }, []);

  return { hasScrollbar, checkScrollbar };
}

export default useHasScrollbar;
