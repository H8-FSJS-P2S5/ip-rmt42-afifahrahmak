import { Outlet, createBrowserRouter, redirect } from "react-router-dom";
import { BookCard } from "../components/BookCard";
import { LoginPage } from "../views/Auth/Login";
import { RegisterPage } from "../views/Auth/Register";
import { SideBar } from "../components/Sidebar";
import { HomePage } from "../views/Books";
import { GamePage } from "../views/game";
import { GameCard } from "../components/GameCard";
import { MyBookPage } from "../views/History";

// const RootLayout = () => {
//     return (
//       <>
//         <SideBar />
//         <Outlet />
//       </>
//     );
//   };
const router = createBrowserRouter([
    {
        loader: () => {
            const isLogin = localStorage.getItem('access_token');
            if (!isLogin) {
                throw redirect("/login");
            }

            return null;
        },
        path: "/",
        // element: <RootLayout />,
        children: [
          {
            path: "",
            element: <HomePage />,
          },
          {
            path: "game",
            element: <GamePage />,
          },
          {
            path: "mybooks",
            element: <MyBookPage />,
          },
        ],
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