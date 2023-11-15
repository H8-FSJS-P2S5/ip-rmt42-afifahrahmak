import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"
import { GoogleLogin } from '@react-oauth/google';


export default function Login() {
    const navigate = useNavigate();

    async function handleCredentialResponse(response) {
        console.log("Encoded JWT ID token: " + response.credential);
        try {
            let {data} = await axios.post("http://localhost:3000/google-login", null, {
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

                                        <form className="mx-1 mx-md-4">

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                <div className="form-outline flex-fill mb-0">
                                                    {/* <label className="form-label" htmlFor="form3Example3c">Email</label> */}
                                                    <input name="email" type="email" id="form3Example3c"
                                                        placeholder="Email" className="form-control" />
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                <div className="form-outline flex-fill mb-0">
                                                    <input name="password" type="password" id="form3Example4c"
                                                        placeholder="Password" className="form-control" />
                                                </div>
                                            </div>

                                            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                <button type="submit" className="btn btn-dark mt-3">LOGIN</button>
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

        // <form className="mt-5">
        //     <div className="mb-3"><input className="form-control bg-light" type="email" placeholder="Email" /></div>
        //     <div className="mb-0"><input className="form-control bg-light" type="password" placeholder="Password" /></div>
        //     <div className="mb-3 d-grid"><button className="btn btn-dark mt-3" type="submit" name="submit">sign in</button></div>
        //     <div className="mb-3 w-100 position-relative text-center mt-4">
        //         <hr className="text-300" />
        //         <div className="absolute-centered px-3 font-sans-serif fs--1 text-500">or sign-in with</div>
        //     </div>
        //     <div className="mb-0">
        //         <div className="row gx-2">
        //             <div className="col-6 d-grid"><a className="btn btn-outline-danger btn-sm mt-2" href="#!"><span className="fab fa-google-plus-g me-2" data-fa-transform="grow-8"></span> google</a></div>
        //             <div className="col-6 d-grid"><a className="btn btn-outline-primary btn-sm mt-2" href="#!"><span className="fab fa-facebook me-2" data-fa-transform="grow-8"></span> facebook</a></div>
        //         </div>
        //     </div>
        // </form>

    )
}