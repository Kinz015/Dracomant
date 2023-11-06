import { Outlet } from "react-router-dom";
import Footer from "../Footer";
import Header from "../Header";

export default function RootLayout() {
    return (
        <>
            <Header/>
            <Outlet/>
            <Footer/>
        </>
    )
} 