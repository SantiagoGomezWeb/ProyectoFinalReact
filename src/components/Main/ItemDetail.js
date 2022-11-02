import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import ItemCount from './ItemCount';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

    const ItemDetail = ({ item }) => {
    const [unidades, setUnidades] = useState(0);
    const { agregarAlCarrito, cuentoProductos } = useContext(CartContext);

    const agrego = (numero) => {
        setUnidades(numero);
        agregarAlCarrito(item, numero);
        toast(`Agregaste ${numero} unidades!`, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });        
    };

    const cantEnElCarrito = cuentoProductos(item.id);

    return (
        <div className="container-detail">
            <ToastContainer />
            <img src={item.img} alt="{item.nombre}" />
            <div className='container'>
                <h2 className='cardPrecio'>{item.nombre}</h2>
                <p className="parrafo-detail">{item.descripcion}</p>

                <h5 style={{ color: unidades === 0 ? 'red' : 'green'}}>
                        {unidades === 0 ? `Aún no agregaste ${item.nombre}`:``}
                </h5>
                {unidades === 0 ? (
                    <ItemCount agrego={agrego} stock={item.stock} inicial={cantEnElCarrito} />
                ) : (
                    <Link className="btn btn-primary" to="/cart">Ir al carrito</Link>
                )}
            </div>
        </div>
    );
};

export default ItemDetail;
