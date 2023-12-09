import React, { useContext } from 'react'
import { Badge } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { ShopContext } from '../Context/ShopContext'

function CartWidget() {
  const { getTotalQuantity } = useContext(ShopContext)
  const total = getTotalQuantity()

  // Cambia el color del carrito si tiene o no productos dentro
  const textColor = total === 0 ? 'darkblue' : 'white'

  return (
    <Link to="/Cart" className="cart-link">
      <Badge pill style={{ color: textColor }}>
        <FontAwesomeIcon icon={faShoppingCart} className='cartIcon' />
        {total}
      </Badge>
    </Link>
  )
}

export default CartWidget



