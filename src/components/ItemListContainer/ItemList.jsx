import Item from "./Item"
import { Container, Row, Col } from "react-bootstrap"

function ItemList({ products }) {
  return (
    <Container>
      <Row>
        {products.map((product) => (
          <Col key={product.id} className="mt-5" xs={12} lg={4}>
            <Item {...product} />
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default ItemList