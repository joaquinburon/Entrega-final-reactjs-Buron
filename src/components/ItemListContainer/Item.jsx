import { Button, Card, Image, ListGroup } from "react-bootstrap"
import { Link } from "react-router-dom"

function Item({ title, price, image, id }) {
  return (
    <Card className="shadow-sm" style={{backgroundColor: "#51585e"}}>
      <ListGroup className="list-group-flush">
        <ListGroup.Item className="text-center">
          <Image src={image} style={{ height: "175px" }} />
        </ListGroup.Item>
      </ListGroup>

      <Card.Body>
        <Card.Title
          className="fs-6"
          style={{ color: "#fff", marginBottom: 0 }}
        >
          {title}
        </Card.Title>
        <div className="d-flex align-items-center justify-content-between">
          <strong style={{color: "#fff"}}>${price}</strong>
          <Button variant="outline-info" as={Link} to={`/detail/${id}`}>
            Ver más
          </Button>
        </div>
      </Card.Body>
    </Card>
  )
}

export default Item
