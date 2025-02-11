import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Home from "./Components/Home";
import Curiosidades from "./Pages/Curiosidades";
import Contato from "./Pages/Contato";
import Ajuda from "./Pages/Ajuda";
import RootLayout from "./Components/Layout/RootLayout";
import Login from "./Pages/Login/login";
import CriarLogin from "./Pages/CriarLogin/criarLogin";
import Atendimento from "./Pages/Atendimento";
import Conta from "./Pages/Conta/Conta";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/contato",
        element: <Contato />,
      },
      {
        path: "/curiosidades",
        element: <Curiosidades />,
      },
      {
        path: "/ajuda",
        element: <Ajuda />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/criarlogin",
        element: <CriarLogin />,
      },
      {
        path: "/atendimento",
        element: <Atendimento />,
      },
      {
        path: "/minhaconta",
        element: <Conta />,
      }
    ],
  },
]);

export default router;
