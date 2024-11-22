import { useEffect, useState } from "react"
import Carousel from "../components/CarouselC"
import CardC from "../components/Cardc"
import {Container, Col, Row} from 'react-bootstrap';
import clienteAxios from "../helpers/axios";


const UserPage = () => {
  const [productos, setProductos] = useState([])

  const obtenerProductos = async()=>{
    const productosApi = await clienteAxios.get('/productos')
    setProductos(productosApi.data.productos)
  }
 
  useEffect(() => {
    obtenerProductos()
  }, [])
  
  return (
    <>
    <Carousel/>
    <Container className="my-5">
      <Row >
        {
          productos.map((producto)=>
          <Col key={producto._id} sm={12} md={6} lg={4}>
          <CardC nombreProducto={producto.nombreProducto} precio={producto.precio} descripcion={producto.descripcion}
          imagen={producto.imagen} idProducto={producto._id} />
          </Col>
          )
        }
      </Row>
    </Container>
    </>
  )
}

export default UserPage