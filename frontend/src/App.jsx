import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import Layout from './components/Layout'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/admin/Dashboard'
import ProductsManager from './pages/admin/ProductsManager'
import CategoriesManager from './pages/admin/CategoriesManager'
import Orders from './pages/Orders'

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="products" element={<Products />} />
              <Route path="products/:id" element={<ProductDetail />} />
              <Route path="cart" element={<Cart />} />
              <Route path="checkout" element={<Checkout />} />
              <Route path="orders" element={<Orders />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="admin" element={<Dashboard />} />
              <Route path="admin/products" element={<ProductsManager />} />
              <Route path="admin/categories" element={<CategoriesManager />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
