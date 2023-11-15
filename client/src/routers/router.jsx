import { Outlet, createBrowserRouter, redirect } from "react-router-dom";
import LoginPage from "../views/LoginPage";
import HomePage from "../views/HomePage";
import RegisterPage from "../views/RegisterPage";
import CustomNavbar from "../components/CustomNavbar";
const NavbarLayout = () => {
    return (
        <>
            <CustomNavbar/>
            <Outlet/>
        </>
    )
}

const router = createBrowserRouter([
    {
        loader: () => {
            const access_token = localStorage.getItem("Authorization")
            if(access_token) {
                throw redirect ("/home")
            }
            return null
        },
        path: "/login",
        element: <LoginPage/>
    },
    {
        path: "/register",
        element: <RegisterPage/>
    },
    {
        loader: () => {
            const access_token = localStorage.getItem("Authorization")
            if(!access_token) {
                throw redirect ("/login")
            }
            return null
        },
        path: "/",
        element: <NavbarLayout/>,
        children: [
            {
                path: "home",
                element: <HomePage/>
            }
        ]
    }
])

export default router