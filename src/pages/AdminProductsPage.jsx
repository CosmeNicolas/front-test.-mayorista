import { useEffect, useState } from "react"
import {Container} from 'react-bootstrap'
import TableC from "../components/TableC"
import clienteAxios from "../helpers/axios"



const AdminProductsPage = () => {
  const [productos, setProductos] = useState([])

  const obtenerProductosApi = async()=>{
    const result = await clienteAxios.get('/productos')
    setProductos(result.data.productos)
    
}

useEffect(() => {
obtenerProductosApi()
}, [])

  return (
   <>
   <Container className="my-5">
    <TableC productos={productos} idPage='adminProductos'/>
   </Container>
   </>
  )
}

export default AdminProductsPage