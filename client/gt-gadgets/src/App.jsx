import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Register from './views/Auth/Register'
import Login from './views/Auth/Login'
import { Router, RouterProvider } from 'react-router-dom'
import router from './router'

function App() {
return <RouterProvider router={router}/>
}

export default App
