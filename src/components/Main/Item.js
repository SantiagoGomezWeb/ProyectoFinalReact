import React from "react";
import { Link } from 'react-router-dom';


    const Item = ({ prod }) => {
    return (
        <Link  to={`/item/${prod.id}`} className='detalle__link__Card'>
            <article className="card">
                <img src={prod.img} alt={prod.nombre} style={{ width: 250 }} />
                <div className="cardInfo">
                    <h2 className="cardTitulo">{prod.nombre} </h2>
                    <h4 className="cardPrecio">${prod.precio}</h4>
                    <h5>#{prod.categoria}</h5>
                    <Link  to={`/item/${prod.id}`} className='detalle__link'>Ver detalle</Link>
                </div>
            </article>            
        </Link>
    )
}


export default Item;