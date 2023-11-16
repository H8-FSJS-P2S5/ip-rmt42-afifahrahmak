import { Link, useNavigate } from "react-router-dom"

export const Navbar = () => {
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/login')
    }

    if (localStorage.getItem('token')) {
        return (
            <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "rgb(24, 24, 24)", color: "rgb(231, 231, 231)" }}>
                <div className="container mb-1">
                    <div className="nav-item">
                        <img src="https://i.imgur.com/xWgz4We.png" style={{width: "120px"}} alt="logo" />
                    </div>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                            <li className="nav-item mx-2">
                                <Link to="/" className="nav-link text-light" aria-current="page">Home</Link>
                            </li>
                            <li className="nav-item mx-2">
                                <Link to="/discusion" className="nav-link text-light" aria-current="page">Discusion</Link>
                            </li>
                            <li className="nav-item mx-2">
                                <Link to="/game-list" className="nav-link text-light" aria-current="page">Game List</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="d-flex nav-item">

                        <button onClick={handleLogout} className="submitButton"  aria-current="page">
                            Logout
                        </button>
                    </div>
                </div>
            </nav>
        )
    }

    return (
            <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "rgb(24, 24, 24)", color: "rgb(231, 231, 231)" }}>
                <div className="container mb-1">
                    <div className="nav-item">
                        <img src="https://i.imgur.com/xWgz4We.png" style={{width: "120px"}} alt="logo" />
                    </div>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                            <li className="nav-item mx-2">
                                <Link to="/" className="nav-link text-light" aria-current="page">Home</Link>
                            </li>
                            <li className="nav-item mx-2">
                                <Link to="/dashboard" className="nav-link text-light" aria-current="page">Discusion</Link>
                            </li>
                            <li className="nav-item mx-2">
                                <Link to="/game-list" className="nav-link text-light" aria-current="page">Game List</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="d-flex nav-item">
                    <Link to="/login" className="btn submitButton">
                        Login
                    </Link>
                </div>
            </div>
        </nav>
    )

}