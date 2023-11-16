import {createBrowserRouter} from "react-router-dom"
import { Login } from "../views/login"
import { Register } from "../views/register"
import { Home } from "../views/home"
import { GameList } from "../views/gameList"
import { DetailPost } from "../views/detailPost"
import { Discusion } from "../views/discusion"

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
    {
        path: '/game-list',
        element: <GameList/>
    },
    {
        path: '/post/:postId',
        element: <DetailPost/>
    },
    {
        path: '/discusion',
        element: <Discusion/>
    },
    
])

export default router