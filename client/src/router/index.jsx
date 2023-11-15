import { createBrowserRouter, redirect } from "react-router-dom";
import Login from "../views/Login";
import Home from "../views/Home";
import Contact from "../views/Contact";

const router = createBrowserRouter([
    // {
    //     path: "/",
    //     element: <Landing />,
    // },
    {
        path: "/",
        element: <Login />,
    },
    {
        path: "/home",
        element: <Home />,
    },
    {
        path: "/contact",
        element: <Contact />,
    },
    {/* {

        path: "/",
        element: <div></div>,
        loader: () => localStorage.access_token ? null : redirect ("/")
    } */}
]);

export default router