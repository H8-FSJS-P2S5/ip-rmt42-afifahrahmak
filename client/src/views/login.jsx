import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Swal from 'sweetalert2'


export const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPasword] = useState('')
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios({
                method: 'POST',
                url: 'http://3.24.135.191/login',
                data: {
                    email,
                    password
                }
            })

            localStorage.setItem('token', data.access_token)
            navigate('/')
        } catch (error) {
            Swal.fire({
                text: error.response.data.message,
                icon: 'warning',
                confirmButtonText: "Back",
                confirmButtonColor: "red",
                customClass: {
                    popup: 'custom-pop-up'
                }
              })
        }
    }

    async function handleCredentialResponse(response) {
        try {
            const {data} = await axios({
                method: 'POST',
                url: 'http://3.24.135.191/login/google',
                headers: {
                    g_token: response.credential
                }
            })
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const G_CLIENT = import.meta.env.VITE_REACT_APP_G_CLIENT
        window.onload = function () {
            google.accounts.id.initialize({
                client_id: G_CLIENT,
                callback: handleCredentialResponse
            });
            google.accounts.id.renderButton(
                document.getElementById("buttonDiv"),
                { theme: "outline" }  // customization attributes
            );
            google.accounts.id.prompt(); // also display the One Tap dialog
        }
    }, [])

    return (
        <>
            <div className="formRegister">
                <div className="formWrapper">
                    <span><img className="logoRegister" src="https://i.imgur.com/xWgz4We.png" alt="logo" /></span>
                    <span className="title">Login</span>
                    <form onSubmit={handleLogin}>
                        <input onChange={(e) => setEmail(e.target.value)} className="inputForm" type="email" placeholder="email" />
                        <input onChange={(e) => setPasword(e.target.value)} className="inputForm" type="password" placeholder="password" />
                        <input className="submitButton" type="submit" value={'Login'} />
                    </form>
                    <p>-- or --</p>
                    <div id="buttonDiv"></div>
                    <p>Don't have an account? <Link to={'/register'}>Register</Link></p>
                </div>
            </div>
        </>
    )
}