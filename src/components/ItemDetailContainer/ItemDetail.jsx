import { Container, Row, Col, Image } from "react-bootstrap"
import ItemCount from "./ItemCount"
import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { collection, doc, getDoc } from "firebase/firestore"
import { db } from "../Firebase/Client"
import { ShopContext } from "../Context/ShopContext"
import { toast, ToastContainer, Flip } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const ItemDetail = () => {
  const { addToCart } = useContext(ShopContext)
  const { id } = useParams()
  const [product, setProduct] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productRef = doc(collection(db, "products"), id)
        const snapshot = await getDoc(productRef)
  
        if (snapshot.exists()) {
          setProduct({ ...snapshot.data(), id: snapshot.id })
        }
      } catch (error) {
        console.error("Error fetching product:", error)
      } finally {
        setIsLoading(false)
      }
    };
  
    fetchProduct()
  }, [id])

  const handleOnAdd = (quantity) => {
    const { id: productId, title, price, categoryId } = product
  
    const productCart = {
      productId,
      title,
      price,
      categoryId,
      quantity,
    }
  
    addToCart(productCart)

    toast.success('Producto agregado exitosamente', {
      transition: Flip,
      autoClose: 500,
      pauseOnHover: false,
      closeOnClick: false,
      draggable: false,
      position: 'bottom-center',
      style: {
        backgroundColor: '#212529',
        color: 'white',
      },
    })
  }

  // if (isLoading) {
  //   return <p style={{ color: "#fff" }}>Cargando...</p>
  // }

  return (
    <Container className="mt-5">
      <Row>
        <Col xs={12} lg={6}>
          <Image src={product.image} alt={product.title} thumbnail />
        </Col>
        <Col xs={12} lg={6}>
          <h4 className="fs-4" style={{ color: "#fff" }}>
            {product.title}
          </h4>
          <h5 className="fs-5" style={{ color: "#fff" }}>
            ${product.price} - {product.stock} unidades disponibles
          </h5>
          <p style={{ color: "#fff" }}>{product.description}</p>
          <div className="d-flex justify-content-center mt-4">
            <ItemCount
              initial={0}
              stock={product.stock}
              onAdd={handleOnAdd}
              className="w-50"
            />
          </div>
        </Col>
      </Row>
      <ToastContainer />
    </Container>
  )
}

export default ItemDetail