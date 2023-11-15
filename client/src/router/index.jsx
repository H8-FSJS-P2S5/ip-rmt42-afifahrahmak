import {createBrowserRouter} from "react-router-dom"
import { Login } from "../views/login"
import { Register } from "../views/register"

const router = createBrowserRouter([
    {
        path: '/login',
        element: <Login/>
    },
    {
        path: '/register',
        element: <Register/>
    },
])

export default router