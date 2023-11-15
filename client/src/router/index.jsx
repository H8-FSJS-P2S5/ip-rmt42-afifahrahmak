import {createBrowserRouter} from "react-router-dom"
import { Login } from "../views/login"
import { Register } from "../views/register"
import { Home } from "../views/home"

const router = createBrowserRouter([
    {
        path: '/login',
        element: <Login/>
    },
    {
        path: '/register',
        element: <Register/>
    },
    {
        path: '/',
        element: <Home/>
    },

])

export default router