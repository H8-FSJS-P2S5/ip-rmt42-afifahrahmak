import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, useNavigate } from 'react-router-dom';

function CustomNavbar () {
    const navigate = useNavigate()

    const logout = () => {
        localStorage.clear()
        navigate("/login")
    }

    const goToHome = (event) => {
        event.preventDefault()
        navigate("/home")
    }
    
    const goToInventory = (event) => {
        event.preventDefault()
        navigate("/inventory")
    }

    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark" style={{position: "-webkit-sticky"}}>
                <Container>
                    <Navbar.Brand onClick={goToHome} style={{cursor: "pointer"}}>Home</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link onClick={goToInventory}>Inventory</Nav.Link>
                        <Nav.Link onClick={logout} style={{position: "absolute", right: "8%"}}>Logout</Nav.Link>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default CustomNavbar