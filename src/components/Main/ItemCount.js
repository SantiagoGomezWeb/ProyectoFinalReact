import React, { useState } from 'react';
import { useEffect } from 'react';

const ItemCount = ({stock, inicial = 1, agrego}) => {
    const [contador, setContador] = useState(inicial);

    const sumar = () => {
        contador < stock && setContador(contador + 1)
    };

    const restar = () => {
        contador > 1 && setContador(contador - 1)
    };

    const add = () => {
        agrego(contador);
    };   
    
    useEffect(()=>{
        setContador(inicial)
    },[inicial]);

    return (
        <div className="container-detail">
            <div className="count-btn">
                <button className="btn btn-primary add-btn" disabled={contador === stock} onClick={sumar}> + </button>
                <p align="center">{contador}</p>
                <button className="btn btn-primary add-btn" onClick={restar}> - </button>
            </div>
            <button onClick={add} className="btn btn-success add-btn">Agregar al carrito</button>
        </div>
    );
};

export default ItemCount;
