import { Outlet, createBrowserRouter, redirect } from "react-router-dom";
import { BookCard } from "../components/BookCard";
import { LoginPage } from "../views/Auth/Login";
import { RegisterPage } from "../views/Auth/Register";
import { SideBar } from "../components/Sidebar";

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
        // element: <CmsRootLayout />,
        children: [
          {
            path: "home",
            element: <BookCard />,
          },
         
        //   {
        //     path: "cuisine/create",
        //     element: <CuisineCreatePage />
        //   },
        //   {
        //     path: "cuisine/edit/:cuisineId",
        //     element: <CuisineEditPage />
        //   },
        //   {
        //     path: "category",
        //     element: <CategoryTablePage />
        //   },
        //   {
        //     path: "user",
        //     element: <RegisterStaffPage />
        //   }
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