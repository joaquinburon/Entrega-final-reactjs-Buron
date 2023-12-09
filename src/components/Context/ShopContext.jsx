import { createContext, useState, useEffect } from "react"
import { getDocs, collection } from "firebase/firestore"
import { db } from "../Firebase/Client"

export const ShopContext = createContext()

const ShopComponentContext = ({ children }) => {
  const [numero, setNumero] = useState(1)
  const [cart, setCart] = useState([])
  const [products, setProducts] = useState([])

  useEffect(() => {
    // Obtenemos productos de Firebase al cargar el componente
    const fetchProducts = async () => {
      try {
        const productsCollection = collection(db, "products")
        const productsSnapshot = await getDocs(productsCollection)
        const productsData = productsSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        setProducts(productsData)
      } catch (error) {
        console.error("Error al obtener productos de Firebase:", error)
      }
    }

    fetchProducts()
  }, [])

  const suma = () => {
    setNumero((prevNumero) => prevNumero + 1)
  };

  const addToCart = (productCart) => {
    console.log('Añadiendo al carrito:', productCart);
    try {
      const { productId, quantity } = productCart
  
      // Obtenemos el producto de Firebase según el ID
      const product = products.find((p) => p.id === productId)
  
      // Añadimos el producto al carrito local
      const existingItemIndex = cart.findIndex((item) => item.product.id === product.id)
  
      if (existingItemIndex !== -1) {
        const updatedCart = [...cart]
        updatedCart[existingItemIndex].quantity += quantity;
        setCart(updatedCart)
      } else {
        setCart((prevCart) => [...prevCart, { product, quantity }])
      }
    } catch (error) {
      console.error("Error al agregar producto al carrito:", error)
    }
  }

  const removeFromCart = (productId, quantity = 1) => {
    const updatedCart = cart.reduce((acc, item) => {
      if (item.product.id === productId) {
        if (item.quantity > quantity) {
          acc.push({ product: item.product, quantity: item.quantity - quantity })
        }
      } else {
        acc.push(item)
      }
      return acc
    }, [])

    setCart(updatedCart)
  }

  const clearCart = () => {
    setCart([])
  }

  const getTotalPrice = () => {
    return cart.reduce((acc, item) => {
      return acc + item.product.price * item.quantity
    }, 0)
  }

  const getTotalQuantity = () => {
    return cart.reduce((acc, item) => {
      return acc + item.quantity
    }, 0)
  }

  const getQuantityById = (productId) => {
    const item = cart.find((element) => element.product.id === productId)
    return item ? item.quantity : 0
  }

  const data = {
    numero,
    setNumero,
    suma,
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    getTotalPrice,
    getTotalQuantity,
    getQuantityById,
    products,
  }

  return (
    <ShopContext.Provider value={data}>{children}</ShopContext.Provider>
  )
}

export default ShopComponentContext

