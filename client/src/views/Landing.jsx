

export default function Landing() {

    return (

        <header>

            <nav className="navbar navbar-expand-lg navbar-dark d-none d-lg-block" style={{ zIndex: "2000" }}>
                <div className="container-fluid">

                    <a className="navbar-brand nav-link" target="_blank" href="https://mdbootstrap.com/docs/standard/">
                        <strong>MDB</strong>
                    </a>
                    <button className="navbar-toggler" type="button" data-mdb-toggle="collapse" data-mdb-target="#navbarExample01"
                        aria-controls="navbarExample01" aria-expanded="false" aria-label="Toggle navigation">
                        <i className="fas fa-bars"></i>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarExample01">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item active">
                                <a className="nav-link" aria-current="page" href="#intro">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="https://www.youtube.com/channel/UC5CF7mLQZhvx8O5GODZAhdA" rel="nofollow"
                                    target="_blank">Learn Bootstrap 5</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="https://mdbootstrap.com/docs/standard/" target="_blank">Download MDB UI KIT</a>
                            </li>
                        </ul>

                        <ul className="navbar-nav list-inline">
                            <li className="">
                                <a className="nav-link" href="https://www.youtube.com/channel/UC5CF7mLQZhvx8O5GODZAhdA" rel="nofollow"
                                    target="_blank">
                                    <i className="fab fa-youtube"></i>
                                </a>
                            </li>
                            <li className="">
                                <a className="nav-link" href="https://www.facebook.com/mdbootstrap" rel="nofollow" target="_blank">
                                    <i className="fab fa-facebook-f"></i>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="https://twitter.com/MDBootstrap" rel="nofollow" target="_blank">
                                    <i className="fab fa-twitter"></i>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="https://github.com/mdbootstrap/mdb-ui-kit" rel="nofollow" target="_blank">
                                    <i className="fab fa-github"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>



            <div id="introCarousel" className="carousel slide carousel-fade shadow-2-strong" data-mdb-ride="carousel">

                <ol className="carousel-indicators">
                    <li data-mdb-target="#introCarousel" data-mdb-slide-to="0" className="active"></li>
                    <li data-mdb-target="#introCarousel" data-mdb-slide-to="1"></li>
                    <li data-mdb-target="#introCarousel" data-mdb-slide-to="2"></li>
                </ol>


                <div className="carousel-inner">

                    <div className="carousel-item active">
                        <div className="mask" style={{ backgroundColor: "rgba(0, 0, 0, 0.6);" }}>
                            <div className="d-flex justify-content-center align-items-center h-100">
                                <div className="text-white text-center">
                                    <h1 className="mb-3">Learn Bootstrap 5 with MDB</h1>
                                    <h5 className="mb-4">Best & free guide of responsive web design</h5>
                                    <a className="btn btn-outline-light btn-lg m-2" href="https://www.youtube.com/watch?v=c9B4TPnak1A"
                                        role="button" rel="nofollow" target="_blank">Start tutorial</a>
                                    <a className="btn btn-outline-light btn-lg m-2" href="https://mdbootstrap.com/docs/standard/"
                                        target="_blank" role="button">Download MDB UI KIT</a>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="carousel-item">
                        <div className="mask" style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}>
                            <div className="d-flex justify-content-center align-items-center h-100">
                                <div className="text-white text-center">
                                    <h2>You can place here any content</h2>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="carousel-item">
                        <div className="mask" style={{
                        background: "linear-gradient( 45deg, rgba(29, 236, 197, 0.7), rgba(91, 14, 214, 0.7) 100% )"}}>
                        <div className="d-flex justify-content-center align-items-center h-100">
                            <div className="text-white text-center">
                                <h2>And cover it with any mask</h2>
                                <a className="btn btn-outline-light btn-lg m-2"
                                    href="https://mdbootstrap.com/docs/standard/content-styles/masks/" target="_blank" role="button">Learn
                                    about masks</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <a className="carousel-control-prev" href="#introCarousel" role="button" data-mdb-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#introCarousel" role="button" data-mdb-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
            </a>
        </div>

        </header >

    )
}