import Card from 'react-bootstrap/Card'; 
import HomeButton from './HomeButton';
import InventoryButton from './InventoryButton';

function MusicKitCard({musicKit, inventory, onDelete, page}) {
    return (
        <>
            <Card style={{ width: '18rem', marginBottom: "2%" }}>
                <Card.Img variant="top" src={musicKit.imageUrl} />
                <Card.Body>
                    <Card.Title>{musicKit.name}</Card.Title>
                    <Card.Text>
                    {musicKit.description}
                    </Card.Text>
                </Card.Body>
                    {
                        page === "home" && <HomeButton
                            id = {musicKit.id}
                        />            
                    }
                    {
                        page === "inventory" && <InventoryButton
                            inventoryId = {inventory.id}
                            musicId = {musicKit.id}
                            onDelete={onDelete}
                        />
                    }
            </Card>
        </>
    )
}

export default MusicKitCard