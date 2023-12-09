import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Spinner } from "react-bootstrap"
// import mock from "../../mock"
import ItemList from "./ItemList"
import { db } from "../Firebase/Client"
import { collection, getDocs, getDoc, doc, query, where } from "firebase/firestore"

const ItemListContainer = ({ greeting }) => {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const { categoryId } = useParams()

  useEffect(() => {
    
    // firebase

    const fetchProducts = async () => {
      setIsLoading(true)

      try {
        const productRef = collection(db, "products")
        const snapshot = await getDocs(productRef)

        const productsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))

        // Filtramos la categoria si la categoria esta presente
        const filteredProducts = categoryId
          ? productsData.filter((product) => product.categoryId === categoryId)
          : productsData

        setProducts(filteredProducts)
      } catch (error) {
        console.error("Error fetching products:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [categoryId]) //categoryId

  return (
    <div>
      <h1>{greeting}</h1>
      {isLoading ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="grow" className="m-5" style={{color: "#fff"}} />
        </div>
      ) : (
        <ItemList products={products} />
      )}
    </div>
  )
}

export default ItemListContainer