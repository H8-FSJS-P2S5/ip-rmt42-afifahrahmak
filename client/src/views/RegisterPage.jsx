import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from "axios"
import Swal from 'sweetalert2'

function RegisterPage() {
    const [user, setUser] = useState({fullName: "", email: "", password: ""})
    const navigate = useNavigate()

    const formHandler = (event) => {
        const {name, value} = event.target
        const data = {...user, [name]: value}
        setUser(data)
    }

    const register = async(event) => {
        try{
            event.preventDefault()
            const form = await axios({
                method: "POST",
                url: "http://localhost:3000/register",
                data: user
            })
            Swal.fire({
                title: "Registration Done!",
                text: "You have created a new account!",
                icon: "success"
              });
            navigate("/login")
        } catch(err) {
            console.log(err)
            Swal.fire({
                icon: "error",
                title: "Error",
                text: err.response.data.message,
              });
        }
    }

    return (
        <>

            <div className="valo-bg">
                <div className="login-content" style={{position: "fixed"}}>
                    <h2 className="white">Register</h2>
                    <br />
                    <Form onSubmit={register}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Control type="email" placeholder="Email" name='email' value={user.email} onChange={formHandler}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Control type='password' placeholder='Password' name='password' value={user.password} onChange={formHandler}/>
                        </Form.Group>
                        <Button as="input" type="submit" value="REGISTER" style={{width: "100%"}}/>{' '}
                    </Form>
                    <div className='flex-row' style={{gap: "1%", justifyContent: "center", marginTop: "2%"}}>
                        <p className='white' style={{gap: "1%"}}>Already have an account?</p>
                        <Link to="/login" style={{color: "turquoise"}}>Login</Link>
                    </div>
                    <div className='flex-row' style={{justifyContent:"center", gap: "2%"}}>
                        <div id="buttonDiv"></div>
                    </div>
                </div>               
            </div>
        </>
    )
}

export default RegisterPage