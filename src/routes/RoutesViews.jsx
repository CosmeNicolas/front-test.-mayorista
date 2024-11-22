import { Routes, Route } from "react-router-dom"
import HomePage from "../pages/HomePage"
import RegisterPage from "../pages/RegisterPage"
import ErrorPage from "../pages/ErrorPage"
import NavBar from "../components/NavBar"
import Footer from "../components/Footer"
import LoginPage from "../pages/LoginPage"
import AdminPage from "../pages/AdminPage"
import UserPage from "../pages/UserPage"
import ProductPage from "../pages/ProductPage"
import AdminUserPage from "../pages/AdminUserPage"
import AdminProductsPage from "../pages/AdminProductsPage"

import UsuarioCarrito from "../pages/usuarioCarrito"
import UsuarioFavoritos from "../pages/UsuarioFavoritos"

const RoutesViews = () => {
  return (
    <>
    <NavBar/>
   <Routes>
    <Route path="/" element={<HomePage/>} />
    <Route path="/product/:idProducto" element={<ProductPage/>} />
    <Route path="/usuario-fav" element={<UsuarioFavoritos/>} />
    <Route path="/usuario-cart" element={<UsuarioCarrito/>} />
    <Route path="/admin" element={<AdminPage/>} />
    <Route path="/adminUser" element={<AdminUserPage/>} />
    <Route path="/adminProducto" element={<AdminProductsPage/>} />
    <Route path="/user" element={<UserPage/>} />
    <Route path="/register" element={<RegisterPage/>} />
    <Route path="/login" element={<LoginPage/>} />
    <Route path="*" element={<ErrorPage/>} />
   </Routes>
   <Footer/>
   </>
  )
}

export default RoutesViews