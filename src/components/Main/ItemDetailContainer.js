import React, { useState,  useEffect} from 'react';
import ItemDetail from './ItemDetail';
import { useParams } from 'react-router-dom';
import { collection, doc, getDoc} from 'firebase/firestore';
import { database } from '../../services/firebaseConfig';
import ClockLoader from 'react-spinners/ClockLoader';

const ItemDetailContainer = () => {
    const [item, setItem] = useState({});
    const [cargando, setCargando] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        const referencia = doc(collection(database,'productos'), id);

        getDoc(referencia)
        .then((respuesta)=>{
            setItem({
                id: respuesta.id,
                ...respuesta.data(),
            });
        })
        .catch((error)=>{
            console.log(error); 
        })
        .finally(()=>{
             setCargando(false)
        });
    return ()=> setCargando(true);
    }, [id]);
        
    if (cargando)
        { return (
            <div className="cargandoSpinner">
                <ClockLoader 
                    color="#36d7b7"
                    cssOverride={null}
                    speedMultiplier={1}
                />
                </div>
                )
        }
    ;

    return (
        <div className="itemListContainer">
            <ItemDetail item={item} />
        </div>
    )
}

export default ItemDetailContainer;

