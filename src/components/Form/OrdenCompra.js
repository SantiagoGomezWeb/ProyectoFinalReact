import React, {useState, useContext} from 'react';
import { CartContext } from '../../context/CartContext'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { database } from '../../services/firebaseConfig';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ClockLoader from 'react-spinners/ClockLoader';

const OrdenCompra = () => {
    const [cargando, setCargando] = useState(false);
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [correo, setCorreo] = useState('');
    const [correo2, setCorreo2] = useState('');
    const [telefono, setTelefono] = useState('');
    const [ordenId, setOrdenId] = useState('');
    const { cart, totalCompra, totalUnidades, vaciarCarritoSinPregunta } = useContext(CartContext);     

    const EnviarOrdenCompra = (event) => {
    
        setCargando(true);
    
        event.preventDefault();
        const ordenCompra = {
            buyer: { nombre, apellido, correo, telefono },
            items: cart,
            total: totalCompra(),
            fecha: serverTimestamp(),
        };
    
        const detalleOrden = collection(database, 'ordenesDeCompra');
        if (correo===correo2){
            addDoc(detalleOrden, ordenCompra)
                .then((res) => {
                    setOrdenId(res.id);
                    vaciarCarritoSinPregunta(); 
                })
                .catch((error) => {
                    console.log(error);
                })
                .finally(() => setCargando(false));
            }else{
                toast(`Los correos Electrónicos no coinciden`, {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });                
                    setCargando(false);
            }
            };

            const cambiaNombre = (event) => {
                setNombre(event.target.value);
                };
    
        const cambiaCorreo = (event) => {
            setCorreo(event.target.value);
        };
    
        const cambiaCorreo2 = (event) => {
            setCorreo2(event.target.value);
        };
        const cambiaApellido = (event) => {
            setApellido(event.target.value);
        };
    
        const cambiaTelefono = (event) => {
            setTelefono(event.target.value);
        };
    
        if (cargando) {
            return (
                <div className="cargandoSpinner">
                    <ClockLoader 
                    color="#36d7b7"
                    cssOverride={null}
                    speedMultiplier={1}
                    />
                </div>                
            );
        }
        
        if (ordenId) {
            return(
                    <div className="itemListContainer">
                        <div className="detalleCompra">
                            <div className="detalleInfo">
                                <h1>La Cava</h1>
                                <h3>Gracias por tu Compra..!!!</h3>
                                <h5>Tu número de seguimiento es:</h5>
                                <h2>{ordenId}</h2>
                                <Link  className ="btn btn-primary" to='/'>Seguir comprando</Link>
                            </div>
                        </div>
                    </div>
               ) 
        }
        
       return (
        <div className="contenedorFormulario">
            <div className="itemListContainer">
                <article className="detalleCompra">
                    <div className="detalleInfo">
                        <h1>Detalle de la Compra</h1>
                        {cart.map ((prod) => 
                            <p key={prod.id}>{prod.nombre} x {prod.cantidad}</p>
                        )}
                        <h5>Cant.Articulos: {totalUnidades()}</h5>
                        <h3>Total Compra: $ {totalCompra()}</h3>
                    </div>
                </article>         
        </div>
           <div className="formulario">
                <ToastContainer />
                <Form onSubmit={EnviarOrdenCompra}>
                    <h5>Formulario de compra</h5>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="6">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control placeholder="Nombre" name="nombre"  onChange={cambiaNombre} value={nombre} required/>
                        </Form.Group>
                        <Form.Group as={Col} md="6">
                            <Form.Label>Apellido</Form.Label>
                            <Form.Control placeholder="Apellido" name="apellido"  onChange={cambiaApellido} value={apellido} required/>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="6" controlId="formGridTelefono">
                            <Form.Label>Teléfono</Form.Label>
                            <Form.Control placeholder="Nro de Teléfono" onChange={cambiaTelefono} value={telefono} required/>
                        </Form.Group>
                    </Row>                    
                    <Row className="mb-3">
                        <Form.Group  as={Col} md="12" controlId="formGridEmail">
                            <Form.Label>Correo Electronico</Form.Label>
                            <Form.Control type="email" placeholder="correo@correo.com" name="correo" onChange={cambiaCorreo} value={correo} required/>
                        </Form.Group>
                        <Form.Group  as={Col} md="12" controlId="formGridEmail">
                            <Form.Label>Confirmar Correo Electronico</Form.Label>
                            <Form.Control type="email" placeholder="correo@correo.com" name="correo2" onChange={cambiaCorreo2} value={correo2} required/>
                        </Form.Group>
                    </Row>
                    <Button variant="primary" type="submit" disabled={totalUnidades() === 0}>
                        {cargando ? 'Enviando...' : 'Confirmar Compra'}
                    </Button>
                </Form>
            </div>
        </div>
      );
    }

export default OrdenCompra;