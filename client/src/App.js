import "./App.css"
// import Products from "./components/Products/Products"
// import NavbarLink from "./components/Navbar/Navbar"

import { Products, Navbar } from "./components"

function App() {
  return (
    <div className="App">
      <Navbar />
      <Products />
    </div>
  )
}

export default App
