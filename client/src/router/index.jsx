import { Outlet, createBrowserRouter, redirect } from "react-router-dom";
import { BookCard } from "../components/BookCard";
import { LoginPage } from "../views/Auth/Login";
import { RegisterPage } from "../views/Auth/Register";

const router = createBrowserRouter([
    {
        loader: () => {
            const isLogin = localStorage.getItem('access_token');
            if (!isLogin) {
                throw redirect("/login");
            }

            return null;
        },
        path: '/',
        element: <BookCard />
    },
    {
        loader: () => {
            const isLogin = localStorage.getItem('access_token');
            if (isLogin) {
                throw redirect("/");
            }

            return null;
        },
        path: '/login',
        element: <LoginPage />
    },
    {
        path: '/register',
        element: <RegisterPage />
    }
]);

export default router;