import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import clienteAxios, { configHeaders } from "../helpers/axios"
import { Button,  Container, Image } from "react-bootstrap"

const ProductPage = () => {
  const [producto, setProducto] = useState({})
  const params = useParams()
 console.log(params)

const obtenerProducto = async()=>{
  try {
    const result = await  clienteAxios.get(`/productos/${params.idProducto}`, configHeaders);
    console.log(result)
    setProducto(result.data.producto)
  } catch (error) {
    console.error("Error al obtener el producto", error);
  }
}


useEffect(() => {
  obtenerProducto()
}, [])
  
  const handleAddCart = async()=>{
    const res = await clienteAxios.post(`/productos/agregarProdCart/${producto._id}`,{},configHeaders)
    console.log(res)
  } 
  const handleAddFav = async ()=>{
    const res = await clienteAxios.post(`/productos/agregarProdFav/${producto._id}`,{},configHeaders)
    console.log(res)
  }

  return (
    <>
      {producto ? (
      <Container className='d-flex justify-content-center'>
        <div className="d-flex justify-content-center align-content-center text-center">
          <div>
            <Image variant="top" src={`${producto?.imagen}`} thumbnail />
          </div>
          <div>
            <h5>{producto?.nombreProducto}</h5>
            <p>{producto?.descripcion}</p>
            <p>${producto?.precio}</p>
            <Button className="" variant="secondary" onClick={handleAddCart}>
              Agregar a favoritos
            </Button>
            <Button variant="primary" onClick={handleAddFav}>
              Agregar al carrito
            </Button>
          </div>
        </div>
      </Container>
    ) : (
      <p>Cargando...</p> // Mostrar mientras se carga el producto
    )}
    </>
  )
}

export default ProductPage