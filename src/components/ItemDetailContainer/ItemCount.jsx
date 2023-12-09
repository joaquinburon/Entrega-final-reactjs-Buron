import { useState } from "react"
import { Button, Form, InputGroup } from "react-bootstrap"

const ItemCount = ({ stock, initial, onAdd, className }) => {
  const [counter, setCounter] = useState(initial)

  function sumar() {
    if (counter === stock) return

    setCounter(counter + 1)
  }

  function restar() {
    if (counter === 0) return

    setCounter(counter - 1)
  }

  function agregarAlCarrito() {
    if (counter > 0 && counter <= stock) {
      onAdd(counter)
    }
  }

  return (
    <div className={className}>
      <InputGroup className="mb-3">
        <InputGroup.Text as={Button} variant="secondary" onClick={restar}>
          -
        </InputGroup.Text>
        <Form.Control className="text-center" value={counter} disabled />
        <InputGroup.Text as={Button} variant="secondary" onClick={sumar}>
          +
        </InputGroup.Text>
      </InputGroup>
      <Button variant="outline-info" className="w-100" onClick={agregarAlCarrito}>
        Agregar al carrito
      </Button>
    </div>
  )
}

export default ItemCount
