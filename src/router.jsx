import { createBrowserRouter } from "react-router-dom";
import Home from "./Components/Home";
import Curiosidades from "./Pages/Curiosidades";
import Contato from "./Pages/Contato";
import Ajuda from "./Pages/Ajuda";
import RootLayout from "./Components/Layout/RootLayout";
import Login from "./Pages/Login";
import CriarLogin from "./Pages/CriarLogin";
import Atendimento from "./Pages/Atendimento";
import api from "./api"

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
        path: "/api",
        element: <Api />,
      },
    ],
  },
]);

export default router;
