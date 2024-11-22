import { Container } from "react-bootstrap"
import TableC from "../components/TableC"
import { useEffect, useState } from "react"
import clienteAxios, { configHeaders } from "../helpers/axios"


const AdminUserPage = () => {
  const [usuarios, setUsuarios]=useState([])

const obtenerUsuarios = async ()=>{
  const result = await clienteAxios.get('/usuarios', configHeaders)
  console.log(result)
  setUsuarios(result.data.result.usuarios)
  console.log(usuarios)
}

  useEffect(() => {
   obtenerUsuarios()
  }, [])
  
  return (
    <Container className="my-5">
        <TableC usuarios={usuarios} idPage='adminUsuarios'/>
    </Container>
  )
}

export default AdminUserPage