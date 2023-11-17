import { Link } from "react-router-dom";


export default function Landing() {

    return (
        <>
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-bottom">
                    <div className="container px-4 px-lg-5">
                        <a className="navbar-brand" href="#!">CYTO</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                        <div className="collapse navbar-collapse" id="navbarResponsive">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <Link to={"/register"}>
                                        <span><button id="regis-button" type="button"
                                            className="btn btn-outline-light flex-shrink-0 top-0 end-0 ms-3 mt-2">
                                            Register
                                        </button></span>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={"/login"}>
                                        <span><button id="regis-button" type="button"
                                            className="btn btn-outline-light flex-shrink-0 top-0 end-0 ms-3 mt-2">
                                            Login
                                        </button></span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>

                <section>
                    <div className="container px-4 px-lg-5">
                        <div className="row gx-4 gx-lg-5">
                            <div className="col-lg-6">
                                <h1 className="mt-5">CYTO</h1>
                                <p>“Doctors won’t make you healthy. Nutritionists won’t make you slim. 
                                    Teachers won’t make you smart. Gurus won’t make you calm. Mentors won’t make you rich. Trainers won’t make you fit. 
                                    Ultimately, you have to take responsibility. Save yourself.” – Naval Ravikant</p>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        </>
    );
};