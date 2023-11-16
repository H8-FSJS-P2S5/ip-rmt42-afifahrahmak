import { createBrowserRouter, redirect } from "react-router-dom";
import Login from "../views/Login";
import Home from "../views/Home";
import Contact from "../views/Contact";
import Register from "../views/Register";
import Landing from "../views/Landing";
import Detail from "../views/Detail";
import AddPost from "../views/AddPost";
import EditPost from "../views/EditPost";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Landing />,
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        loader: () => {
            const access_token = localStorage.getItem("access_token")
            if (!access_token) {
                throw redirect("/login")
            }
            return null;
        },
        children: [
            {
                path: "/home",          // => /recipes
                element: <Home />,
            },
            {
                path: "/recipe/:id",
                element: <Detail />,
            },
            {
                path: "/contact-mail",
                element: <Contact />,
            },
            {
                path: "/posts",      // => HALAMAN ISINYA POST
                element: <></>,
            },
            {
                path: "/post/add",      // => comment
                element: <AddPost></AddPost>,
            },
            {
                path: "/post/edit/:id",
                element: <EditPost></EditPost>
            }
        ]
    },

    {/* {

        path: "/",
        element: <div></div>,
        loader: () => localStorage.access_token ? null : redirect ("/")
    } */}
]);

export default router