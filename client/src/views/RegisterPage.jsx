import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios"
import Swal from 'sweetalert2'

function RegisterPage() {
    const [user, setUser] = useState({email: "", password: ""})
    const navigate = useNavigate()

    const formHandler = (event) => {
        const {name, value} = event.target
        const data = {...user, [name]: value}
        setUser(data)
    }

    const register = async (event) => {
        try {
            event.preventDefault()
            const form = await axios({
                method: "POST",
                url: "http://localhost:3000/register",
                data: user
            })

            Swal.fire({
                title: "Register Success!",
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
            <div className="cs2-main2-bg">
                <div className="login-content" style={{position: "fixed"}}>
                    <h2 className='white'>Register Page</h2>
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
                        <Link to="/login" style={{color: "turquoise"}}>Login to your account</Link>
                    </div>
                </div>
            </div>           
        </>
    )
}

export default RegisterPage