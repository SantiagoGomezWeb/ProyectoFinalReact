import { createContext, useState } from 'react';
import Swal from 'sweetalert2'

export const CartContext = createContext();
const Provider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const agregarAlCarrito = (item, cantidad) => {
        const producto = { ...item, cantidad };
        if (yaExiste(producto.id)) {
            sumarCantidad(producto);
        } else {
            setCart([...cart, producto]);
        }
    };

    const sumarCantidad = (prodAgregado) => {
        const carritoActualizado = cart.map((prodDelCart) => {
            if (prodDelCart.id === prodAgregado.id) {
                const prodActualizado = {
                    ...prodDelCart,
                    cantidad: prodAgregado.cantidad,
                };
                return prodActualizado;
            } else {
                return prodDelCart;
            }
        });

        setCart(carritoActualizado);
    };

    const yaExiste = (id) => cart.some((prod) => prod.id === id);

    const vaciarCarrito = () => {
        Swal.fire({
            title: 'Vaciar Carrito',
            text: '¿Estás seguro de vaciar tu carrito?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, seguro',
            cancelButtonText: 'No, no quiero',
            backdrop: '#66f4ae22'
        }).then((result)=>{
            if(result.isConfirmed){
                setCart([]);
                Swal.fire('Proceso Exitoso!', 'Tu carrito ahora está vacio', 'success')
            }
            }) 
    };    

    const vaciarCarritoSinPregunta = () => setCart([]);

    const borrarItem = (id) => {
        const prodFiltrados = cart.filter((prod) => prod.id !== id);
        setCart(prodFiltrados);
    };    

    const totalUnidades = () => {
        let totalUnid = 0;
        const copiaCarrito = [...cart];
        copiaCarrito.forEach((produtos)=>{
            totalUnid += produtos.cantidad;
        });
        return totalUnid;
    }

    const totalCompra = () => {
        let totComp = 0;
        const copiaCarrito = [...cart];
        copiaCarrito.forEach((produtos) => {
            totComp = totComp + (produtos.cantidad * produtos.precio);
        });
        return totComp;
    };

    const cuentoProductos = (id) => {
        const producto = cart.find((prod) => prod.id === id)
        return producto?.cantidad
    }

    return (
        <CartContext.Provider 
            value={{ cart, agregarAlCarrito, vaciarCarrito, borrarItem, totalUnidades, totalCompra, cuentoProductos, vaciarCarritoSinPregunta }}>
            {children}
        </CartContext.Provider>
    );
};

export default Provider;


