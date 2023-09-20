import { createBrowserRouter } from "react-router-dom"
import Home from "./Components/Home"
import Curiosidades from "./Pages/Curiosidades"
import Contato from "./Pages/Contato"
import Ajuda from "./Pages/Ajuda"
import RootLayout from "./Components/Layout/RootLayout"
import Login from "./Pages/Login"
import CriarLogin from "./Pages/CriarLogin"

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout/>,
        children: [ 
            {
                index: true,    
                element: <Home/>,       
            },
            {
                path: "/contato",
                element: <Contato/>,
            },
            {
                path: "/curiosidades",
                element: <Curiosidades/>,
            },
            {
                path: "/ajuda",
                element: <Ajuda/>,
            }  
        ]
    },
    {
        path: "/login",
        element: <Login/>
    },
    {
        path: "/criarlogin",
        element: <CriarLogin/>
    }
])

export default router