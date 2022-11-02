import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { useContext } from 'react'
import { CartContext } from '../../../context/CartContext'

function CartWidget(){
    const {totalUnidades} = useContext(CartContext);
    const totalUnid = totalUnidades()
    return(
        <div >
             <FontAwesomeIcon icon={faCartShopping} style={{color:'#ECE8E8'}} size='2x' bounce />
             <span  className='numeroCarrito' style={{ visibility: totalUnid === 0 ? 'hidden' : 'visible'}}>{totalUnid}</span>
        </div>
    )
}

export default CartWidget;