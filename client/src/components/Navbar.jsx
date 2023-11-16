import { Link } from "react-router-dom";

export default function Navbar() {

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
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <div class="container-fluid">
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
            </nav >
        </>
    );
}; 
