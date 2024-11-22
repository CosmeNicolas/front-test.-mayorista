import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

const CardC = ({nombreProducto, precio, descripcion, imagen, idProducto}) => {
 console.log(idProducto)
  return (
    <Card className='my-3' style={{ width: '18rem' }}>
      <Card.Img variant="top" src={imagen}/>
      <Card.Body>
        <Card.Title>{nombreProducto}</Card.Title>
        <Card.Text>
         {descripcion}
        </Card.Text>
        <Card.Text>
         {precio}
        </Card.Text>
        <Button as={Link} to={`/product/${idProducto}`} variant="primary">Ver Mas</Button>
      </Card.Body>
    </Card>
  )
}

export default CardC