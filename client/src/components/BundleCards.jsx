import Card from 'react-bootstrap/Card';

function BundleCard({bundle}) {
        return (
            <div className='cardcolor'>
          <Card style={{ width: '25rem' }}>
            <Card.Img variant="top" src={bundle.image} />
            <Card.Body>
              <Card.Title>{bundle.name}</Card.Title>
            </Card.Body>
          </Card>

            </div>
        );
      }

export default BundleCard