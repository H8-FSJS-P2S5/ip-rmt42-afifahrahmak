import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { useNavigate } from 'react-router-dom';
import axios from "axios"

function InventoryButton({id}) {
    const navigate = useNavigate()

    const goToDetails = () => {
        navigate(`/details/${id}`)
    }

    return (
        <ButtonGroup aria-label="Basic example" style={{width: "100%"}}>
            <Button variant="secondary" style={{width: "50%"}} onClick={goToDetails}>See Details</Button>
            <Button variant="danger" style={{width: "50%"}}>Delete</Button>
        </ButtonGroup>
    )
}

export default InventoryButton