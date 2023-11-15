import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios'

export const Register = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPasword] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await axios({
                method: 'POST',
                url: 'http://localhost:3000/register',
                data: {
                    username, email, password
                }
            })

            navigate('/login')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div className="formRegister">
                <div className="formWrapper">
                    <span className="logo">We Are...</span>
                    <span className="title">Register</span>
                    <form onSubmit={handleSubmit}>
                        <input className="inputForm" onChange={(e) => setUsername(e.target.value)} type="text" placeholder="username" />
                        <input className="inputForm" onChange={(e) => setEmail(e.target.value)} type="email" placeholder="email" />
                        <input className="inputForm" onChange={(e) => setPasword(e.target.value)} type="password" placeholder="password" />
                        <input className="submitButton" type="submit" value={'Sign Up'}></input>
                    </form>
                    <p>You do have an account? <Link to={'/login'}>Login</Link></p>
                </div>
            </div>
        </>
    )
}