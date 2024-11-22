import { useEffect, useState } from "react"
import clienteAxios, { configHeaders } from "../helpers/axios"
import { Col, Container, Row } from "react-bootstrap"


const UsuarioFavoritos = () => {
  const [favs, setFavs] = useState([])

  const getAllProductFavs = async() => {
    const result = await clienteAxios.get('/productos/obtenerFavoritoCarrito', configHeaders )
    console.log(result)
    setFavs(result.data.productos)
  }

  useEffect(() =>{
     getAllProductFavs()
  }, [])

  return (
    <Container className='my-5'>
      <Row>
        {
          favs.map((product) => 
            <Col key={product._id}>
              <CardC idProduct={product._id} titulo={product.nombre} descripcion={product.descripcion} precio={product.precio} imagen={product.imagen} idPage={'favs'}/>
            </Col>
          )
        }
      </Row>
    </Container>
  )
}

export default UsuarioFavoritos