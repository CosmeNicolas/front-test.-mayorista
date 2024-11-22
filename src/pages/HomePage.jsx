import { useEffect, useState } from "react"
import Carousel from "../components/CarouselC"
import CardC from "../components/Cardc"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import clienteAxios from "../helpers/axios";



const HomePage = () => {
  const [productos, setProductos] = useState([])

  const obtenerProductos = async()=>{
    const productosApi = await clienteAxios.get('/productos')
    console.log(productosApi)
    setProductos(productosApi.data.productos)
  }
 
  useEffect(() => {
    obtenerProductos()
  }, [])
  
/*   console.log(productos) */

  return (
    <>
    <Carousel/>
    <Container className="my-5">
      <Row >
        {
          productos.map((producto)=>
          <Col key={producto._id} sm={12} md={6} lg={4}>
          <CardC idProducto={producto._id} nombreProducto={producto.nombreProducto} precio={producto.precio} descripcion={producto.descripcion}
          imagen={producto.imagen}/>
          </Col>
          )
        }
      </Row>
    </Container>
    </>
  )
}

export default HomePage