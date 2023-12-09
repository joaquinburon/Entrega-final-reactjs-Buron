import { useEffect, useState } from "react"
import { Spinner } from "react-bootstrap"
import { useParams } from "react-router-dom"
// import mock from "../../mock"
import ItemDetail from "./ItemDetail"
import { db } from "../Firebase/Client"
import { collection, doc, getDoc, query, where } from "firebase/firestore"

const ItemDetailContainer = () => {
  const [product, setProduct] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const { id } = useParams()

  useEffect(() => {

    // Firebase

    const fetchProduct = async () => {
      setIsLoading(true)
      try {
        const productRef = doc(db, "products", id)

        const snapshot = await getDoc(productRef)

        if (snapshot.exists()) {
          setProduct({
            id: snapshot.id,
            ...snapshot.data(),
          })
        }
      } catch (error) {
        console.error("Error fetching product:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  return (
    <div>
      {isLoading ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="grow" className="m-5" />
        </div>
      ) : (
        <>
          <ItemDetail {...product} />
        </>
      )}
    </div>
  )
}

export default ItemDetailContainer
