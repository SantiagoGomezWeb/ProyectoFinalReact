import React from 'react';
import './App.css';
import Navbar from './components/Header/Navbar/Navbar';
import ItemListContainer from './components/Main/ItemListContainer';
import ItemDetailContainer from './components/Main/ItemDetailContainer';
import Cart from './components/Main/Cart';
import PageNotFound from './components/Main/PageNotFound';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import OrdenCompra from './components/Form/OrdenCompra';
import Provider from './context/CartContext';

const App = () => {
  return (
    <Provider>
      <BrowserRouter>
          <div className='container-fluid'>
            <div className='fondo'>
              <Navbar />
              <Routes>
                  <Route path="/" element={<ItemListContainer />} />
                  <Route path='/categoria/:nombreCategoria' element={<ItemListContainer/>}/>
                  <Route path='/item/:id' element={<ItemDetailContainer />}/>
                  <Route path='/cart' element={<Cart />}/>
                  <Route path="/form" element={<OrdenCompra />} />
                  <Route path='*' element={<PageNotFound />}/>
              </Routes>
            </div> 
          </div>
        </BrowserRouter>
      </Provider>
  );
};

export default App;
