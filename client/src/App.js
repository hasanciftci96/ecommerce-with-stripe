import "./App.css"
import React, { useState, useEffect } from "react"
import { commerce } from "./lib/commerce"
import { Products, Navbar } from "./components"

function App() {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState({})

  const fetchProducts = async () => {
    const { data } = await commerce.products.list()

    setProducts(data)
  }

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve())
  }

  const handleAddCart = async (productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity)

    setCart(item.card)
  }

  useEffect(() => {
    fetchProducts()
    fetchCart()
  }, [])

  console.log(products)
  console.log(cart)

  return (
    <div className="App">
      <Navbar />
      <Products products={products} onAddToCart={handleAddCart} />
    </div>
  )
}

export default App
