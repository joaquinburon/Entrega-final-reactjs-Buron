import React, { useState, useContext } from 'react'
import { Form, Button, Container, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { ShopContext } from '../Context/ShopContext'
import { addDoc, collection, getFirestore } from 'firebase/firestore'
import Swal from 'sweetalert2'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { toast, ToastContainer, Flip } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const CheckOut = () => {
  const { cart, getTotalPrice, clearCart } = useContext(ShopContext)
  const [buyerInfo, setBuyerInfo] = useState({ name: '', phone: '', email: '' })
  const [orderId, setOrderId] = useState(null)

  const handleInputChange = (e) => {
    setBuyerInfo({ ...buyerInfo, [e.target.name]: e.target.value })
  }

  const handleCheckout = async () => {
    // Validación del formulario
    if (!buyerInfo.name || !buyerInfo.phone || !buyerInfo.email) {
      Swal.fire({
        title: 'Error',
        text: 'Por favor, completa todos los campos del formulario.',
        icon: 'error',
        background: '#51585e',
        color: '#fff'
      })
      return; // Detenemos la función si no se completan todos los campos
    }

    // Mostrar mensaje de carga
    toast.info('Procesando compra...', {
        transition: Flip,
        autoClose: false,
        position: 'bottom-center',
        style: {
           backgroundColor: '#212529',
           color: 'white',
        },
      })

    try {
      const orderItems = cart.map((item) => ({
        id: item.product.id,
        title: item.product.title,
        price: item.product.price,
        quantity: item.quantity,
      }))

      const order = {
        buyer: buyerInfo,
        items: orderItems,
        total: getTotalPrice(),
      }

      const db = getFirestore()
      const ordersCollection = collection(db, 'orders')

      // Agregamos la orden a la colección "orders"
      const docRef = await addDoc(ordersCollection, order)
      setOrderId(docRef.id)

      // Limpiamos el carrito después de completar la compra
      clearCart()

      // En caso de compra exitosa... SweetAlert
      Swal.fire({
        title: '¡Compra exitosa!',
        text: `Tu orden ha sido procesada con éxito. Número de orden: ${docRef.id}`,
        icon: 'success',
        background: '#51585e',
        color: '#fff'
      });
    } catch (error) {
      console.error('Error al procesar la orden:', error);

      // En caso de error... SweetAlert
      Swal.fire({
        title: 'Error',
        text: 'Hubo un error al procesar la orden. Por favor, inténtalo de nuevo.',
        icon: 'error',
        background: '#51585e',
        color: '#fff'
      });
    } finally {
      // Ocultar mensaje de carga
      toast.dismiss()
    }
  }

  return (
    <Container className="mt-5">
      <Col>
        <h1 className="mb-4 text-center" style={{ color: '#fff' }}>Checkout</h1>
      </Col>
      {orderId ? (
        <Col>
          <p className='text-center' style={{ color: '#fff' }}>Muchas gracias por confiar en nosotros! recuerda seguirnos en nuestras redes sociales:</p>
          <Col className='text-center'>
            <a href='www.google.com/' target='blank'><FontAwesomeIcon icon={faFacebook} className="mx-3" size="2x" /></a>
            <a href='www.google.com/' target='blank'><FontAwesomeIcon icon={faInstagram} className="mx-3" size="2x" /></a>
          </Col>
          <hr />
          <p className='text-center' style={{ color: '#fff' }}>Tu orden ha sido procesada con éxito. Número de orden:</p>
          <p className='text-center' style={{ color: 'yellow' }}>{orderId}</p>
          <Col className='text-center'>
            <Link to="/" className="btn btn-primary w-75 mt-2">
                Volver al inicio
              </Link>
          </Col>
        </Col>
      ) : (
        <Form>
          <Form.Label style={{ color: '#fff' }}>Complete todos los datos del formulario</Form.Label>
          <Form.Group className="mb-3">
            <Form.Control type="text" placeholder='Nombre' name="name" value={buyerInfo.name} onChange={handleInputChange} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control type="tel" placeholder='Telefono' name="phone" value={buyerInfo.phone} onChange={handleInputChange} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control type="email" placeholder='Email' name="email" value={buyerInfo.email} onChange={handleInputChange} required />
          </Form.Group>

          <Button variant="success" onClick={handleCheckout}>
            Finalizar Compra
          </Button>
        </Form>
      )}
      {/* ToastContainer para mostrar mensajes de carga */}
      <ToastContainer />
    </Container>
  )
}

export default CheckOut
