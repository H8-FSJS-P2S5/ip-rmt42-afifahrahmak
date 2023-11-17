import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';


function CustomNavbar() {
    const navigate = useNavigate()
    
    const handleLogout = () => {
        localStorage.clear()
        navigate("/login")
    }
    return (
        <Navbar expand="lg" className="bg-body-tertiary" data-bs-theme="dark">
            <Container>
                <Navbar.Brand href="/agents">Valopedia</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    
                    <Nav.Link><Link to="/agents" className='navbar-link'>AGENTS</Link></Nav.Link>
                    <Nav.Link><Link to="/bundles" className='navbar-link'>BUNDLES</Link></Nav.Link>
                    <Nav.Link onClick={handleLogout}>Logout</Nav.Link>          
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default CustomNavbar