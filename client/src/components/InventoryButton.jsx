import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import Swal from 'sweetalert2'

function InventoryButton({ inventoryId, musicId, onDelete }) {
    const navigate = useNavigate()

    const goToDetails = () => {
        navigate(`/details/${musicId}`)
    }

    const handleDelete = async(event) => {
        try {
            event.preventDefault()
            const inventory = await axios({
                method: "DELETE",
                url: `http://localhost:3000/inventories/${inventoryId}`,
                headers: {
                    Authorization: localStorage.getItem("Authorization")
                }
            })
            Swal.fire({
                title: "Delete Successful!",
                text: `You have completed deleted an item!`,
                icon: "success"
              });
            onDelete();
        } catch(err) {
            console.log(err)
            Swal.fire({
                icon: "error",
                title: "Error",
                text: err.response.data.message
              });
        }
        
    }

    return (
        <ButtonGroup aria-label="Basic example" style={{width: "100%"}}>
            <Button variant="secondary" style={{width: "50%"}} onClick={goToDetails}>See Details</Button>
            <Button variant="danger" style={{width: "50%"}} onClick={handleDelete}>Delete</Button>
        </ButtonGroup>
    )
}

export default InventoryButton