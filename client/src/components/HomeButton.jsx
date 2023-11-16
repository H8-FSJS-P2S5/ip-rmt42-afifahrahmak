import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { useNavigate } from 'react-router-dom';
import axios from "axios"

function HomeButton({id}) {
    const navigate = useNavigate()

    const goToDetails = () => {
        navigate(`/details/${id}`)
    }

    // const purchase = () => {
    //     axios({
    //         method: "POST",
    //         url: `http://localhost:3000/inventories/${id}`,
    //         headers: {
    //             Authorization: localStorage.getItem("Authorization")
    //         }
    //     })
    // }

    return (
        <ButtonGroup aria-label="Basic example" style={{width: "100%"}}>
            <Button variant="secondary" style={{width: "50%"}} onClick={goToDetails}>See Details</Button>
            <Button variant="success" style={{width: "50%"}}>Purchase</Button>
        </ButtonGroup>
    )
}

export default HomeButton