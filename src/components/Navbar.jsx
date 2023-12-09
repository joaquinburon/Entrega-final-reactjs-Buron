import { Container, Nav, Navbar as BNavbar, NavDropdown, Col } from "react-bootstrap"
import { Link } from "react-router-dom"
import CartWidget from "./Cart/CartWidget"

function Navbar() {
  return (
    <>
  <BNavbar expand="lg" data-bs-theme="dark" className="bg-body-tertiary">
  <Container fluid className="d-flex justify-content-between align-items-center">
    <div className="d-flex align-items-center">
      <BNavbar.Brand as={Link} to="/" className="ms-3">Music Store</BNavbar.Brand>
      <CartWidget />
    </div>
    <BNavbar.Toggle aria-controls="basic-navbar-nav" />
    <BNavbar.Collapse id="basic-navbar-nav" className="justify-content-end">
      <Nav className="text-center">
        <Nav.Link as={Link} to="/">Productos</Nav.Link>
        <NavDropdown title="Categorias" id="basic-nav-dropdown">
          <NavDropdown.Item as={Link} to="/category/guitarra">Guitarras</NavDropdown.Item>
          <NavDropdown.Item as={Link} to="/category/bajo">Bajos</NavDropdown.Item>
          <NavDropdown.Item as={Link} to="/category/percusion">Percusion</NavDropdown.Item>
          <NavDropdown.Item as={Link} to="/category/teclado">Teclados</NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </BNavbar.Collapse>
  </Container>
</BNavbar>
    </>
  )
}

export default Navbar