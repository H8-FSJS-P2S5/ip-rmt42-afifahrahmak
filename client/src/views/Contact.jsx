import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import axios from "axios";

export default function Contact() {

    const navigate = useNavigate();
    const token = localStorage.getItem("access_token")
    const [formData, setData] = useState({
        username: "",
        email: "",
        message: ""
    })

    const handleChange = (event) => {
        const { name, value } = event.target
        setData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await axios({
                url: "http://localhost:3000/contact",
                method: "post",
                headers: {
                    Authorization: `Bearer ${token}`
                },
                data:
                {
                    username: formData.username,
                    email: formData.email,
                    message: formData.message,
                }
            })
            // console.log(data)
            toast.success('Your message sent successfully 📩', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });

            navigate("/home");

        } catch ({ response }) {

            toast.error("Unauthenticated", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            console.log({response})
        }
    }

    return (
        <section className="vh-100" style={{ backgroundColor: "#eee" }}>
            <div className="container h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-lg-12 col-xl-11">
                        <div className="card text-black" style={{ borderRadius: "25px" }}>
                            <div className="card-body p-md-5">
                                <div className="row justify-content-center">
                                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Welcome back!</p>

                                        <form onSubmit={handleSubmit} className="mx-1 mx-md-4">


                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <div className="form-outline flex-fill mb-0">
                                                    <input onChange={handleChange} value={formData.username}
                                                        name="username" type="text" id="username"
                                                        placeholder="username" className="form-control" />
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <div className="form-outline flex-fill mb-0">
                                                    <input value={formData.email} onChange={handleChange}
                                                        name="email" type="email" id="email"
                                                        placeholder="Email" className="form-control" />
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <div className="form-outline flex-fill mb-0">
                                                    <textarea onChange={handleChange} value={formData.message}
                                                        name="message" id="message"
                                                        placeholder="Write your message here" className="form-control"></textarea>
                                                </div>
                                            </div>

                                            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                <button type="submit" className="btn btn-dark mt-3">SEND</button>
                                            </div>

                                            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                <Link to={"/home"}>
                                                    <button type="button" className="btn btn-outline-dark flex-shrink-0">CANCEL</button>
                                                </Link>
                                            </div>

                                        </form>

                                    </div>
                                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                                        <img src="https://img.fixthephoto.com/blog/images/gallery/news_preview_mob_image__preview_746.jpg"
                                            className="img-fluid" alt="Sample image" />

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}