import { useEffect } from "react" 
import { BrowserRouter, Route, Routes } from "react-router-dom"
import ItemDetailContainer from "./components/ItemDetailContainer/ItemDetailContainer"
import ItemListContainer from "./components/ItemListContainer/ItemListContainer"
import Navbar from "./components/Navbar"
import NotFound from "./components/NotFound/NotFound"
import ShopContextProvider from "./components/Context/ShopContext"
import Cart from "./components/Cart/Cart"
import CheckOut from "./components/CheckOut/CheckOut"
import './App.css'

function App() {

  useEffect(() => {
    // Hacemos que al recargar la pagina el fondo siga siendo negro
    document.body.style.backgroundColor = '#333'
  }, []);

  return (
    <ShopContextProvider>
      <BrowserRouter basename="/EcommerceReact-Final">
        <Navbar />
        <Routes>
          <Route path="/" element={<ItemListContainer />} />
          <Route exact path="/category/:categoryId" element={<ItemListContainer />} />
          <Route exact path="/detail/:id" element={<ItemDetailContainer />} />
          <Route exact path="/Cart" element={<Cart />}></Route>
          <Route exact path="/CheckOut" element={<CheckOut />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </ShopContextProvider>
  );
}

export default App