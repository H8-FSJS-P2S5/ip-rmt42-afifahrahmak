import axios from "axios";
import { Link, useNavigate } from "react-router-dom"
import { GoogleLogin } from '@react-oauth/google';
import { useState } from "react";
import { toast } from "react-toastify";


export default function Login() {
    const navigate = useNavigate();
    const [formData, setData] = useState({
        email: "",
        password: ""
    })

    const handleChange = (event) => {
        const { name, value } = event.target
        setData({ ...formData, [name]: value });
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const { data } = await axios({
                url: "https://cyto-h8.pramresto.site/login",
                method: "post",
                data:
                {
                    email: formData.email,
                    password: formData.password,
                }
            })
            console.log(data)
            localStorage.setItem("access_token", data.access_token)

            toast.success('Welcome Home ViCYTOr ❣️', {
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


    // GOOGLE LOGIN
    async function handleCredentialResponse(response) {
        console.log("Encoded JWT ID token: " + response.credential);
        try {
            let { data } = await axios.post("https://cyto-h8.pramresto.site/google-login", null, {
                headers: {
                    g_token: response.credential
                }
            })
            localStorage.setItem("access_token", data.access_token)
            navigate("/home")
        } catch (error) {
            console.log(error)
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

                                        <form onSubmit={handleLogin} className="mx-1 mx-md-4">

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <div className="form-outline flex-fill mb-0">
                                                    <input name="email" type="email" id="email"
                                                        onChange={handleChange} value={formData.email}
                                                        placeholder="Email" className="form-control" />
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                <div className="form-outline flex-fill mb-0">
                                                    <input name="password" type="password" id="password"
                                                        onChange={handleChange} value={formData.password}
                                                        placeholder="Password" className="form-control" />
                                                </div>
                                            </div>

                                            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                <button type="submit" className="btn btn-dark mt-3">LOGIN</button>
                                            </div>

                                            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                <Link to={"/register"}>
                                                    <button type="button" className="btn btn-outline-dark flex-shrink-0">REGISTER</button>
                                                </Link>
                                            </div>

                                            <div className="mb-3 w-100 position-relative text-center mt-4">
                                                <hr className="text-300" />
                                                <div className="absolute-centered px-3 font-sans-serif fs--1 text-500">OR</div>
                                            </div>

                                        </form>


                                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                            {/* <div id="buttonDiv"></div> */}
                                            <GoogleLogin
                                                onSuccess={credentialResponse => {
                                                    handleCredentialResponse(credentialResponse);
                                                }}
                                                onError={() => {
                                                    console.log('Login Failed');
                                                }}
                                            />;
                                        </div>

                                    </div>
                                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                                        <img src="https://thumbs.dreamstime.com/b/welcome-different-languages-wordcloud-vector-92521661.jpg"
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