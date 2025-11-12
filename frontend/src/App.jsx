import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import { FavoritesProvider } from './context/FavoritesContext'
import { ToastProvider } from './context/ToastContext'
import Layout from './components/Layout'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import ProductLanding from './pages/ProductLanding'
import ProductLandingParallax from './pages/ProductLandingParallax'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Favorites from './pages/Favorites'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/admin/Dashboard'
import ProductsManager from './pages/admin/ProductsManager'
import CategoriesManager from './pages/admin/CategoriesManager'
import SiteSettings from './pages/admin/SiteSettings'
import HomeEditor from './pages/admin/HomeEditor'
import UsersManager from './pages/admin/UsersManager'
import EmailTemplates from './pages/admin/EmailTemplates'
import NewsletterManager from './pages/admin/NewsletterManager'
import OrdersManager from './pages/admin/OrdersManager'
import Orders from './pages/Orders'
import TrackOrder from './pages/TrackOrder'

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <FavoritesProvider>
          <ToastProvider>
            <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="products" element={<Products />} />
              <Route path="products/:id" element={<ProductDetail />} />
              <Route path="product/:id/landing" element={<ProductLanding />} />
              <Route path="product/:id/parallax" element={<ProductLandingParallax />} />
              <Route path="cart" element={<Cart />} />
              <Route path="checkout" element={<Checkout />} />
              <Route path="favorites" element={<Favorites />} />
              <Route path="orders" element={<Orders />} />
              <Route path="track-order" element={<TrackOrder />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="admin" element={<Dashboard />} />
              <Route path="admin/products" element={<ProductsManager />} />
              <Route path="admin/categories" element={<CategoriesManager />} />
              <Route path="admin/settings" element={<SiteSettings />} />
              <Route path="admin/home-editor" element={<HomeEditor />} />
              <Route path="admin/users" element={<UsersManager />} />
              <Route path="admin/email-templates" element={<EmailTemplates />} />
              <Route path="admin/newsletter" element={<NewsletterManager />} />
              <Route path="admin/orders" element={<OrdersManager />} />
            </Route>
          </Routes>
        </BrowserRouter>
          </ToastProvider>
        </FavoritesProvider>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
