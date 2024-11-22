import { Table, Button, Modal, Form } from "react-bootstrap";
import clienteAxios, {
  configHeaders,
  configHeadersImagen,
} from "../helpers/axios";
import { useEffect, useState } from "react";

const TableC = ({ productos, idPage, usuarios }) => {
  const [show, setShow] = useState(false);
  const [productoInfo, setProductoInfo] = useState(null);
  const [imagenProducto, setImagenProducto] = useState(null);
  const [usuarioinfo, setUsuarioInfo] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  /*  productos*/
  const deleteProducto = async (idProducto) => {
    const confirmDeleteProducto = confirm(
      "Estas seguro de eliminar el producto?"
    );

    if (confirmDeleteProducto) {
      try {
        console.log("ID del producto a eliminar:", idProducto); // Verifica el ID
        const result = await clienteAxios.delete(
          `/productos/${idProducto}`,
          configHeaders
        );
        console.log(result);
      } catch (error) {
        console.error("Error al eliminar el producto:", error); // Muestra el error en consola
      }
    }
  };

  const enableProduct = async (idProducto) => {
    const confirmEnableProduct = confirm(
      "Estas seguro que deseas habilitar el producto?"
    );
    if (confirmEnableProduct) {
      const result = await clienteAxios.put(
        `/productos/habilitar/${idProducto}`,
        {},
        configHeaders
      );
      console.log(result);
    }
  };

  const disableProduct = async (idProducto) => {
    const confirmdisableProduct = confirm(
      "Estas seguro que deseas deshabilitar el producto?"
    );
    if (confirmdisableProduct) {
      const result = await clienteAxios.put(
        `/productos/deshabilitar/${idProducto}`,
        {},
        configHeaders
      );
      console.log(result);
    }
  };

  const handlerInfoProducto = (producto) => {
    handleShow();
    setProductoInfo(producto);
  };

  /* cambio de valores producto ,carga - input */
  const handleChangeProductoInfo = (ev) => {
    setProductoInfo({ ...productoInfo, [ev.target.name]: ev.target.value });
  };

  /* actualizamos los valores y enviamos */
  const handleClickProductoInfo = async (ev) => {
    ev.preventDefault();
    const result = await clienteAxios.put(
      `/productos/${productoInfo._id}`,
      productoInfo,
      configHeaders
    );
    if (result.status === 200) {
      console.log(result);
      if (imagenProducto) {
        const formData = new FormData();
        formData.append("imagen", imagenProducto);
        const result = await clienteAxios.post(
          `/productos/agregarImagen/${productoInfo._id}`,
          formData,
          configHeadersImagen
        );
        if (result.status === 200) {
          alert(`${result.data.msg}`);
          handleClose();
        }
      } else {
        alert(`${result.data.msg}`);
        handleClose();
      }
    }
    console.log(result);
  };
  /*  productos*/

  /* Usuarios */
  const deleteUsuario = async (idUsuario) => {
    const confirmDeleteUsuario = confirm(
      "Estas seguro de eliminar el usuario?"
    );

    if (confirmDeleteUsuario) {
      try {
        console.log("ID del producto a eliminar:", idUsuario); // Verifica el ID
        const result = await clienteAxios.delete(
          `/usuarios/${idUsuario}`,
          configHeaders
        );
        console.log(result);
      } catch (error) {
        console.error("Error al eliminar el producto:", error); // Muestra el error en consola
      }
    }
  };

  const handlerInfoUsuario = (usuario) => {
    handleShow();
    setUsuarioInfo(usuario);
  };

  const handleChangeUsuarioInfo = (ev) => {
    setUsuarioInfo({ ...usuarioinfo, [ev.target.name]: ev.target.value });
  };

  const handleClickUsuarioInfo = async (ev) => {
    ev.preventDefault();

    const result = await clienteAxios.put(
      `/usuarios/${usuarioinfo._id}`,
      usuarioinfo,
      configHeaders
    );
    if (result.status === 200) {
      alert(`${result.data.msg}`);
      handleClose();
    } else {
      alert(`${result.data.msg}`);
      handleClose();
    }
    console.log(result);
  };

  const enableUsuario = async (idUsuario) => {
    const confirmEnableUsuario = confirm(
      "Estas seguro que deseas habilitar el Usuario?"
    );
    if (confirmEnableUsuario) {
      const result = await clienteAxios.put(
        `/usuarios/habilitar/${idUsuario}`,
        {},
        configHeaders
      );
      console.log(result);
    }
  };

  const disableUsuario = async (idUsuario) => {
    const confirmdisableUsuario = confirm(
      "Estas seguro que deseas deshabilitar el Usuario?"
    );
    if (confirmdisableUsuario) {
      const result = await clienteAxios.put(
        `/usuarios/deshabilitar/${idUsuario}`,
        {},
        configHeaders
      );
      console.log(result);
    }
  };
  /* Usuarios */

  return (
    <Table variant="dark" striped bordered hover responsive>
      <thead>
        {idPage === "adminProductos" ? (
          <tr>
            <th>ID</th>
            <th>Nombre Producto</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Imagen</th>
            <th>Opciones</th>
          </tr>
        ) : (
          <tr>
            <th>ID</th>
            <th>Usuario</th>
            <th>Rol</th>
            <th>Opciones</th>
          </tr>
        )}
      </thead>
      {idPage === "adminProductos" ? (
        <tbody>
          {productos.map((producto) => (
            <tr key={producto._id}>
              <td>{producto._id}</td>
              <td>{producto.nombreProducto}</td>
              <td>{producto.descripcion}</td>
              <td>{producto.precio}</td>
              <td className="text-center">
                <img src={producto.imagen} alt="producto" width={"100"} />
              </td>
              <td className="d-flex justify-content-evenly">
                <Button
                  variant="warning"
                  onClick={() => handlerInfoProducto(producto)}
                  onChange={(ev) => handleChangeProductoInfo(ev)}
                >
                  Editar
                </Button>

                <Modal show={show} onHide={handleClose} centered>
                  <Modal.Header closeButton>
                    <Modal.Title>Editar Producto</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Nombre del Producto</Form.Label>
                        <Form.Control
                          type="text"
                          name="nombreProducto"
                          value={productoInfo?.nombreProducto}
                          onChange={(ev) => handleChangeProductoInfo(ev)}
                        />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Descripción</Form.Label>
                        <Form.Control
                          type="text"
                          name="descripcion"
                          value={productoInfo?.descripcion}
                          onChange={(ev) => handleChangeProductoInfo(ev)}
                        />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Precio $</Form.Label>
                        <Form.Control
                          type="number"
                          name="precio"
                          value={productoInfo?.precio}
                          onChange={(ev) => handleChangeProductoInfo(ev)}
                        />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Imagen</Form.Label>
                        <Form.Control
                          type="file"
                          name="imagen"
                          onChange={(ev) =>
                            setImagenProducto(ev.target.files[0])
                          }
                        />
                      </Form.Group>

                      <Button
                        variant="primary"
                        type="submit"
                        onClick={handleClickProductoInfo}
                      >
                        Guardar Cambios
                      </Button>
                    </Form>
                  </Modal.Body>
                </Modal>
                <Button
                  variant="danger"
                  onClick={() => deleteProducto(producto._id)}
                >
                  Eliminar
                </Button>

                <Button
                  variant={producto.bloqueado ? "success" : "secondary"}
                  onClick={() =>
                    producto.bloqueado
                      ? enableProduct(producto._id)
                      : disableProduct(producto._id)
                  }
                >
                  {producto.bloqueado ? "Habilitar" : "Bloquear"}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      ) : (
        <tbody>
          {usuarios.map(
            (usuario) =>
              usuario._id !==
                JSON.parse(sessionStorage.getItem("idUsuario")) && (
                <tr key={usuario._id}>
                  <td>{usuario._id}</td>
                  <td>{usuario.nombreUsuario}</td>
                  <td>{usuario.rol}</td>
                  <td className="d-flex justify-content-evenly">
                    <Button
                      variant="warning"
                      onClick={() => handlerInfoUsuario(usuario)}
                      onChange={(ev) => handleChangeUsuarioInfo(ev)}
                    >
                      Editar
                    </Button>

                    <Modal show={show} onHide={handleClose} centered>
                      <Modal.Header closeButton>
                        <Modal.Title>Editar Usuario</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form>
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicEmail"
                          >
                            <Form.Label>Nombre del Usuario</Form.Label>
                            <Form.Control
                              type="text"
                              name="nombreUsuario"
                              value={usuarioinfo?.nombreUsuario}
                              onChange={(ev) => handleChangeUsuarioInfo(ev)}
                            />
                          </Form.Group>

                          <Form.Group
                            className="mb-3"
                            controlId="formBasicRole"
                          >
                            <Form.Label>Rol</Form.Label>
                            <Form.Select
                              name="rol"
                              value={usuarioinfo?.rol}
                              onChange={(ev) => handleChangeUsuarioInfo(ev)}
                            >
                              <option value="usuario">Usuario</option>
                              <option value="admin">Administrador</option>
                            </Form.Select>
                          </Form.Group>

                          <Button
                            variant="primary"
                            type="submit"
                            onClick={handleClickUsuarioInfo}
                          >
                            Guardar Cambios
                          </Button>
                        </Form>
                      </Modal.Body>
                    </Modal>

                    <Button
                      variant="danger"
                      onClick={() => deleteUsuario(usuario._id)}
                      disabled={usuario.rol === "admin" && true}
                    >
                      Eliminar
                    </Button>

                    <Button
                      variant={usuario.bloqueado ? "success" : "secondary"}
                      onClick={() =>
                        usuario.bloqueado
                          ? enableUsuario(usuario._id)
                          : disableUsuario(usuario._id)
                      }
                    >
                      {usuario.bloqueado ? "Habilitar" : "Bloquear"}
                    </Button>
                  </td>
                </tr>
              )
          )}
        </tbody>
      )}
    </Table>
  );
};

export default TableC;
