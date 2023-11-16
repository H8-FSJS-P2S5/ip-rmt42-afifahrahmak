import Card from 'react-bootstrap/Card';

function AgentCard({agent}) {
        return (
          <Card border="danger" background="dark" style={{ width: '17rem' }}>
            <Card.Img variant="top" src={agent.icon} />
            <Card.Body>
              <Card.Title>{agent.name}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{agent.role}</Card.Subtitle>
              <Card.Text>
                {agent.description}
              </Card.Text>
            </Card.Body>
          </Card>
        );
      }

export default AgentCard