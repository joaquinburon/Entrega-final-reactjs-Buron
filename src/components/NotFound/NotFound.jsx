import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';

const NotFound = () => {
  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6} className="text-center">
          <h1>¡Oops!</h1>
          <p>No se encontró su búsqueda.</p>
          <p>Vuelve a inicio para encontrar lo que necesitas.</p>
          <Link to="/">
            <Button variant="primary">Volver a Inicio</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;
