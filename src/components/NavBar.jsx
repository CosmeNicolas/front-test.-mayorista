
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, useNavigate } from 'react-router-dom';



const NavBar = () => {
  const navigate = useNavigate()
  const token = JSON.parse(sessionStorage.getItem('token'))
  const rol = JSON.parse(sessionStorage.getItem('rol'))

  const logOutUser =()=>{
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('rol')

    setTimeout(() => {
      navigate('/')
    }, 500);
  }

  return (
    <Container fluid>
    <Navbar expand="lg" className="bg-body-tertiary">
      <NavLink className={'nav-link fs-2'} to={token && rol === 'admin' ? '/admin' : token && rol === 'usuario' ? '/user': '/'}>Logo</NavLink>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <NavLink className={'nav-link'} to={token && rol === 'admin' ? '/admin' : token && rol === 'usuario' ? '/user': '/'}>Inicio</NavLink>
          {
            rol !== 'admin' ? 
            rol === 'usuario' ? 
            <>
            <NavLink className={'nav-link'} to="/about">Sobre nosotros</NavLink>
            <NavLink className={'nav-link'} to="/contact">Contacto</NavLink>
            <NavLink className={'nav-link'} to="usuario-fav">Favorito💖</NavLink>
            <NavLink className={'nav-link'} to="usuario-cart">Carrito🛒</NavLink>
            </>
            :
            <>
            <NavLink className={'nav-link'} to="/about">Sobre nosotros</NavLink>
            <NavLink className={'nav-link'} to="/contact">Contacto</NavLink>
            </>
            : 
            <>
            <NavLink className={'nav-link'} to="/adminUser">Panel Usuario</NavLink>
            <NavLink className={'nav-link'} to="/adminProducto">Panel Productos</NavLink>
            </>
          }
        </Nav>
      
        {/* admin -token  */}
        {
          token ? <Nav className="me-auto">
          
          <NavLink className={'nav-link'}  to="#" onClick={logOutUser}>Cerrar Sesion</NavLink>
        </Nav>
         : 
        <Nav className="me-auto">
          <NavLink className={'nav-link'}  to="/login">Iniciar Sesion</NavLink>
          <NavLink className={'nav-link'}  to="/register">Registrarse</NavLink>
        </Nav>
        }
      </Navbar.Collapse>
  </Navbar>
    </Container>
  )
}

export default NavBar