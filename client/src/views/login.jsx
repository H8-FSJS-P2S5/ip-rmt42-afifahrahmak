import axios from "axios"
import { useState } from "react"
import { Link } from "react-router-dom"


export const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPasword] = useState('')

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const {data} = await axios({
                method: 'POST',
                url: 'http://localhost:3000/login',
                data: {
                    email,
                    password
                }
            })

            localStorage.setItem('token', data.access_token)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div className="formRegister">
                <div className="formWrapper">
                    <span className="logo">We Are...</span>
                    <span className="title">Login</span>
                    <form onSubmit={handleLogin}>
                        <input onChange={(e) => setEmail(e.target.value)} className="inputForm" type="email" placeholder="email" />
                        <input onChange={(e) => setPasword(e.target.value)} className="inputForm" type="password" placeholder="password" />
                        <input className="submitButton" type="submit" value={'Login'}/>
                    </form>
                    <p>Don't have an account? <Link to={'/register'}>Register</Link></p>
                </div>
            </div>
        </>
    )
}