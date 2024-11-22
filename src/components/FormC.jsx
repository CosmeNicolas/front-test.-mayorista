import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import clienteAxios from "../helpers/axios";
import { useNavigate } from "react-router-dom";

const FormC = ({ idPage }) => {
  const navigate = useNavigate();
  const [formRegister, setFormRegister] = useState({});
  const [formLogin, setFormLogin] = useState({});

  const handleChangeregister = (e) => {
    /* clonamos el estado */
    setFormRegister({ ...formRegister, [e.target.name]: e.target.value });
  };

  const handleChangeLogin = (e) => {
    /* clonamos el estado */
    setFormLogin({ ...formLogin, [e.target.name]: e.target.value });
  };

  /* registro */
  const handleClickRegister = async (e) => {
    e.preventDefault();
    const { nombreUsuario, password, rpassword, correo } = formRegister;
    if (!nombreUsuario || !password || !rpassword || !correo) {
      alert("Algun campo esta vacio");
    }
    /* llamamos al registro con el back */
    if (password === rpassword) {
      const result = await clienteAxios.post("/usuarios", {
        nombreUsuario,
        correo,
        password,
      });
      if (result.status === 201) {
        alert(`${result.data.msg}`);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    } else {
      alert("Las constraseñas no coinciden");
    }
  };

  /* Login */
  const handleClickLogin = async (e) => {
    e.preventDefault();
    const { nombreUsuario, password } = formLogin;
    if (!nombreUsuario || !password) {
      alert("Algun campo esta vacio");
    }
    /* llamamos al registro con el back */
    const result = await clienteAxios.post("/usuarios/login", {
      nombreUsuario,
      password,
    });
    if (result.status === 200) {
      console.log(result)
      alert(`${result.data.msg}`);
      sessionStorage.setItem('token',JSON.stringify(result.data.token))
        sessionStorage.setItem('rol',JSON.stringify(result.data.rol))
        sessionStorage.setItem('idUsuario',JSON.stringify(result.data.idUsuario))
      if(result.data.rol === 'usuario'){
        setTimeout(() => {
          navigate('/user')
        }, 1000);
      }else{
        setTimeout(() => {
          navigate('/admin')
        }, 1000);
      }
    }
  };

  return (
    <Form className="p-2 bg-dark text-white rounded-2">
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Usuario</Form.Label>
        <Form.Control
          type="email"
          placeholder="Ingrese un Usuario"
          name="nombreUsuario"
          onChange={
            idPage === "login" ? handleChangeLogin : handleChangeregister
          }
        />
      </Form.Group>

      {idPage !== "login" && (
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>correo</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="correo"
            onChange={handleChangeregister}
          />
        </Form.Group>
      )}

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Constraseña</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          name="password"
          onChange={
            idPage === "login" ? handleChangeLogin : handleChangeregister
          }
        />
      </Form.Group>

      {idPage !== "login" && (
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Repetir contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="rpassword"
            onChange={handleChangeregister}
          />
        </Form.Group>
      )}

      <Button
        variant="primary"
        type="submit"
        onClick={idPage === "login" ? handleClickLogin : handleClickRegister}
      >
        {idPage !== "login" ? "Registrarse" : "Ingresar"}
      </Button>
    </Form>
  );
};

export default FormC;
