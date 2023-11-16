import axios from "axios";
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import Navbar from "../components/Navbar";

export default function Register() {

    const navigate = useNavigate();
    const [formData, setData] = useState({
        username: "",
        email: "",
        password: "",
    })

    const handleInput = (event) => {
        const { name, value } = event.target
        setData({ ...formData, [name]: value });
    };


    const handleRegister = async (event) => {
        event.preventDefault();
        try {
            const { data } = await axios({
                url: "http://localhost:3000/register",
                method: "post",
                data:
                {
                    username: formData.username,
                    email: formData.email,
                    password: formData.password
                }
            })
            console.log(data)

            toast.success('Thank You For Joining 🥰', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });

            navigate("/login");

        } catch ({ response }) {

            toast.error(response.data.message, {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });

            console.log({ response })
        }
    }

    
    return (
        <>
        <section className="vh-100" style={{ backgroundColor: "#eee" }}>
        <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-lg-12 col-xl-11">
                    <div className="card text-black" style={{ borderRadius: "25px" }}>
                        <div className="card-body p-md-5">
                            <div className="row justify-content-center">
                                <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-5">Register</p>

                                    <form onSubmit={handleRegister} className="mx-1 mx-md-4">

                                        <div className="d-flex flex-row align-items-center mb-4">
                                            <div className="form-outline flex-fill mb-0">
                                                <label className="form-label" htmlFor="username">Username</label>
                                                <input onChange={handleInput} type="text" id="username" name="username" className="form-control" />
                                            </div>
                                        </div>

                                        <div className="d-flex flex-row align-items-center mb-4">
                                            <div className="form-outline flex-fill mb-0">
                                                <label className="form-label" htmlFor="email">Email</label>
                                                <input onChange={handleInput} type="email" id="email" name="email" className="form-control" />
                                            </div>
                                        </div>

                                        <div className="d-flex flex-row align-items-center mb-4">
                                            <div className="form-outline flex-fill mb-0">
                                                <label className="form-label" htmlFor="password">Password</label>
                                                <input onChange={handleInput} type="password" id="password" name="password" className="form-control" />
                                            </div>
                                        </div>


                                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                            <button type="submit" className="btn btn-dark me-3">Register</button>
                                            <Link to={"/"}>
                                                <button type="button" className="btn btn-outline-dark flex-shrink-0">Cancel</button>
                                            </Link>
                                        </div>

                                    </form>

                                </div>
                                <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                                    <img src="https://npr.brightspotcdn.com/dims4/default/ff62923/2147483647/strip/true/crop/1024x1024+0+0/resize/880x880!/quality/90/?url=http%3A%2F%2Fnpr-brightspot.s3.amazonaws.com%2Flegacy%2Fsites%2Fkufm%2Ffiles%2F202103%2Flanguages_iStock.jpg"
                                        className="img-fluid" alt="Sample image" />

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </>

    )
}