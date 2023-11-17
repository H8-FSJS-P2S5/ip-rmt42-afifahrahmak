import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios"
import Swal from 'sweetalert2'

function LoginPage() {
    const [user, setUser] = useState({email: "", password: ""})
    const navigate = useNavigate()

    const formHandler = (event) => {
        const {name, value} = event.target
        const data = {...user, [name]: value}
        setUser(data)
    }

    const login = async (event) => {
        try {
            event.preventDefault()
            const form = await axios({
                method: "POST",
                url: "http://localhost:3000/login",
                data: user
            })
            localStorage.Authorization = `Bearer ${form.data.access_token}`

            Swal.fire({
                title: "Logged in successfully!",
                text: `Welcome!`,
                icon: "success"
              });

            navigate("/")
        } catch(err) {
            console.log(err)
            Swal.fire({
                icon: "error",
                title: "Error",
                text: err.response.data.message,
              });
        }
    }

    async function handleCredentialResponse(response) {
        try {
            let form = await axios({
                method: "POST",
                url: "http://localhost:3000/login/google",
                headers: {
                    g_token: response.credential
                }
            })
            localStorage.Authorization = `Bearer ${form.data.access_token}`
            Swal.fire({
                title: "Logged in successfully!",
                text: `Welcome!`,
                icon: "success"
              });
              navigate("/agents")

        } catch(err) {
            console.log(err)
            Swal.fire({
                icon: "error",
                title: "Error",
                text: err.response.data.message,
              });
        }
      }


    useEffect(() => { 
        google.accounts.id.initialize({
            client_id: "295306160107-ecmg73tvpfbo8c99clqe0l793ffo2qb1.apps.googleusercontent.com",
            callback: handleCredentialResponse
          });
          google.accounts.id.renderButton(
            document.getElementById("buttonDiv"),
            { theme: "outline", size: "large" }  // customization attributes
          );
          google.accounts.id.prompt(); // also display the One Tap dialog
    })


    // return <h1>Heloo</h1>
    return (
        <>
            <div className="valo-bg">
                <div className="login-content" style={{position: "fixed"}}>
                    <h2 className="white">Login</h2>
                    <br />
                    <Form onSubmit={login}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Control type="email" placeholder="Email" name='email' value={user.email} onChange={formHandler}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Control type='password' placeholder='Password' name='password' value={user.password} onChange={formHandler}/>
                        </Form.Group>
                        <Button as="input" type="submit" value="LOG IN" style={{width: "100%"}}/>{' '}
                    </Form>
                    <div className='flex-row' style={{gap: "1%", justifyContent: "center", marginTop: "2%"}}>
                        <p className='white' style={{gap: "1%"}}>You're new here?</p>
                        <Link to="/register" style={{color: "turquoise"}}>Create a new account</Link>
                    </div>
                    <div className='flex-row' style={{justifyContent:"center", gap: "2%"}}>
                        <div id="buttonDiv"></div>
                    </div>
                </div>               
            </div>
        </>
    )
}

export default LoginPage