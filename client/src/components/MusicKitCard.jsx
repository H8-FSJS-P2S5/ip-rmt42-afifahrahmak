import Card from 'react-bootstrap/Card'; 
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import HomeButton from './HomeButton';
import InventoryButton from './InventoryButton';

function MusicKitCard({musicKit, page}) {
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
                            id = {musicKit.id}
                        />
                    }
            </Card>
        </>
    )
}

export default MusicKitCard