import { useState,  useEffect} from 'react';
import { useParams } from 'react-router-dom';
import ItemList from './ItemList';
import { collection, getDocs, query, where} from 'firebase/firestore';
import { database } from '../../services/firebaseConfig';
import ClockLoader from 'react-spinners/ClockLoader';

const ItemListContainer = () => {
    const [items, setItems] = useState([]);
    const [cargando, setCargando] = useState(true);
    const { nombreCategoria } = useParams();

    useEffect(() => {
        getDocs(nombreCategoria ? query(collection(database,'productos'), where('categoria','==',nombreCategoria)) : collection(database,'productos'))
        .then((respuesta)=>{
            const products = respuesta.docs.map((producto)=>{
                return {
                    id: producto.id,
                    ...producto.data(),
                };
            });
            setItems(products);
        })
        .catch((error)=>{
            console.log(error); 
        })
        .finally(()=>{
             setCargando(false)
        });
        return ()=> setCargando(true);
    }, [nombreCategoria]);

    if (cargando)
        { 
            return (
                <main>
                    <div className='cargandoSpinner'>
                    <ClockLoader 
                    color="#36d7b7"
                    cssOverride={null}
                    speedMultiplier={1}
                />
                    </div>
                </main>
            )
        }
    ;


    return (
        <main>
            <div className='itemListContainer'>
                <ItemList items={items}/>
            </div>
        </main>
    )
}

export default ItemListContainer;


