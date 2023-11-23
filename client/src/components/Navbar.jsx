
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify";

export default function Navbar() {

    const navigate = useNavigate();

    const handleLogout = async () => {
        localStorage.removeItem("access_token");
        toast.info('🖐️ SEE YOU LATER 🖐️', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });

        navigate("/");
    }

    return (
        <>
            <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
                <Link to={"/home"}>
                    <span><button id="regis-button" type="button"
                        className="btn btn-outline-light flex-shrink-0 top-0 end-0 ms-3 mt-2">
                        CYTO
                    </button></span>
                </Link>

                <div className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
                    <ul>
                        <li className="nav-item">
                            <Link to={"/posts"}>
                                <span><button id="login-button" type="button"
                                    className="btn btn-outline-light flex-shrink-0 top-0 end-0 ms-3 mt-2">
                                    Posts
                                </button></span>
                            </Link>
                        </li>
                    </ul>
                </div>

                <ul>
                    <li className="nav-item">
                        <Link to={"/contact-mail"}>
                            <span><button id="login-button" type="button"
                                className="btn btn-outline-light flex-shrink-0 top-0 end-0 ms-3 mt-2">
                                Contact Us
                            </button></span>
                        </Link>
                    </li>
                </ul>


                <ul>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle ms-3 me-3" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" className="bi bi-person-circle" viewBox="0 0 16 16">
                                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                            </svg></a>
                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">

                            <li><Link to={"/post/add"}><button className="dropdown-item">Add Post</button></Link></li>
                            <li><hr className="dropdown-divider" /></li>
                            <li><button onClick={handleLogout} className="dropdown-item">Logout</button></li>
                        </ul>
                    </li>
                </ul>

            </nav >
        </>
    );
}; 


            {/* <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to={"/home"}>
                                    <span><button id="regis-button" type="button"
                                        className="btn btn-outline-light flex-shrink-0 top-0 end-0 ms-3 mt-2">
                                        CYTO
                                    </button></span>
                                </Link>
                            </li>
                        </ul>
                        <ul>
                            <li className="nav-item">
                                <Link to={"/posts"}>
                                    <span><button id="login-button" type="button"
                                        className="btn btn-outline-light flex-shrink-0 top-0 end-0 ms-3 mt-2">
                                        Posts
                                    </button></span>
                                </Link>
                            </li>
                        </ul>

                        <ul>
                            <li className="nav-item">
                                <Link to={"/contact-mail"}>
                                    <span><button id="login-button" type="button"
                                        className="btn btn-outline-light flex-shrink-0 top-0 end-0 ms-3 mt-2">
                                        Contact Us
                                    </button></span>
                                </Link>
                            </li>
                        </ul>

                        <ul>
                            <li className="nav-item">
                                <span><button id="admin-button" type="button"
                                    className="btn btn-outline-light flex-shrink-0 top-0 end-0 ms-3 mt-2"
                                    onClick={handleLogout}>
                                    Log Out
                                </button></span>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav > */}
