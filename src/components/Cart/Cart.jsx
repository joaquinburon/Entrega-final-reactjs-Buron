import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Button, Container, Card, Row } from 'react-bootstrap'
import { ShopContext } from '../Context/ShopContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import Swal from 'sweetalert2'

const Cart = () => {
  const { cart, removeFromCart, clearCart, getTotalPrice } = useContext(ShopContext);

  const handleClearCart = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción vaciará tu carrito. ¿Quieres continuar?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, vaciar carrito',
      cancelButtonText: 'Cancelar',
      background: '#51585e',
      color: '#fff'
    }).then((result) => {
      if (result.isConfirmed) {
        clearCart()
        Swal.fire({
          title: 'Carrito vaciado',
          text: 'Has vaciado el carrito.',
          icon: 'success',
          background: '#51585e',
          color: '#fff',
          confirmButtonColor: '#3085d6'
        })
      }
    })
  }

  return (
    <Container className="mt-5">
      <div className="text-center mb-4" style={{color: '#fff'}}>
        <h1>Carrito de Compras</h1>
      </div>
      {cart.length === 0 ? (
        <div className="text-center mb-4" style={{color: '#fff'}}>
          <p>El carrito está vacío</p>
        </div>
      ) : (
        <>
          <Row xs={1} md={2} lg={3} className="g-4">
            {cart.map((item) => (
              <Card key={item.product.id} style={{ backgroundColor: '#51585e', maxWidth: '300px', margin: '10px' }}>
                <Card.Img variant="top" src={item.product.image} style={{ height: '175px', objectFit: 'contain' }} />
                <Card.Body>
                  <Card.Title style={{color: '#fff'}}>{item.product.title}</Card.Title>
                  <Card.Text style={{color: '#fff'}}>
                    Precio: ${item.product.price}<br />
                    Cantidad: {item.quantity}<br />
                    Valor: ${item.product.price * item.quantity}
                  </Card.Text>
                  <Button
                    variant="outline-danger"
                    onClick={() => removeFromCart(item.product.id)}
                    className="w-100"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                </Card.Body>
              </Card>
            ))}
          </Row>
          <div className="d-flex flex-column align-items-center mb-3">
            <p className="mb-2 fs-3" style={{ color: '#fff', fontWeight: 'bold' }}>
              Total: ${getTotalPrice()}
            </p>
            <Link to="/CheckOut" className="btn btn-success w-75 mb-2">
              Comprar
            </Link>
            <Button variant="danger" className="w-75" onClick={handleClearCart}>
              Vaciar Carrito
            </Button>
            <Link to="/" className="btn btn-primary w-75 mt-2">
              Seguir comprando
            </Link>
          </div>
        </>
      )}
    </Container>
  )
}

export default Cart



