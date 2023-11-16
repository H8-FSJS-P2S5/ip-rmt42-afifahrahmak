import { Outlet, createBrowserRouter, redirect } from "react-router-dom";
import Navbar from "../components/CustomNavbar"
import RegisterPage from "../views/RegisterPage"
import LoginPage from "../views/LoginPage"
import AgentsPage from "../views/AgentsPage"
import BundlesPage from "../views/BundlesPage";

const NavbarLayout = () => {
    return(
        <>
            <Navbar/>
            <Outlet/>
        </>
    )
}

const router = createBrowserRouter([
    {
      path: "/register",
      element: <RegisterPage/>
    },
    {
        path: "/login",
        element: <LoginPage/>
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
                path: "/agents",
                element: <AgentsPage/>
            },
            {
                path:"/bundles",
                element: <BundlesPage/>
            }
        ]
    }
  ]);

export default router


