import React from "react";
import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

const Cart = () => {
    const { cart, vaciarCarrito, borrarItem, totalCompra } = useContext(CartContext);
    
    const totalComp = totalCompra()    
    
    if (cart.length === 0) {
        return (
        <div className="itemListContainer">
                <div className="row justify-content-center">
                    <h1>Carrito Vacio</h1>
                    <Link className="btn btn-primary add-btn" to="/">Ir al Home</Link>
                </div>
        </div>
        )
    }

    return (
        <div className="container">
            <div className="row justify-content-start">
                <div className="col-12">
                    <div className="cart-fondo">
                        {cart.map((prod) => (
                            <div className="cart-detail" key={prod.id}>
                                <img src={prod.img} alt={prod.title} width="80px" />
                                <div className="cart-detail-info">
                                    <h2>{prod.nombre}</h2>
                                    <h3>Cantidad: {prod.cantidad}</h3>
                                    <h3>Precio: ${prod.precio}.-</h3>
                                    <h4>Subtotal: ${prod.precio * prod.cantidad}.-</h4>
                                </div>

                                <FontAwesomeIcon icon={faTrash} onClick={() => borrarItem(prod.id)} style={{color:'#b0120d', cursor:'pointer'}} size='2x'/>
                            </div>
                        ))}
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-12">                        
                                    <h5 className = "totalCarrito">Total: ${totalComp}.-</h5>
                                    <div className="cart-detail">
                                        <Link className="btn btn-primary" to="/">Seguir Comprando</Link>
                                        <Link className="btn btn-warning" to="../../form">Finalizar Compra</Link>
                                        <button onClick={vaciarCarrito} className="btn btn-danger vaciar-btn">Vaciar carrito</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;


