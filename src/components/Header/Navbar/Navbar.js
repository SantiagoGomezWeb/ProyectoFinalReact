import { useEffect, useState } from 'react';
import { getTopNav } from '../../../data/navbars';
import CartWidget from './CartWidget';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
  const [navItems, setNavItems] = useState([]);
  const [collapse] = useState('nav__menu');
  

  useEffect(() => {
    setNavItems(getTopNav());
  }, []);

  return (
    <div className='nav__wrapper'>
      <div>
        <nav className='navbar navbar-light'>
          <Link to='/' className='nav__brand'>La Cava</Link>
          <ul className={collapse}>
            {navItems.map((item) => (
              <li key={item.id} className='nav-item'>
                <NavLink to={item.href} className='nav__link'>{item.label}</NavLink>
              </li>
            ))}
          </ul>
          <div>
            <Link to="/cart">
              <CartWidget className='nav__link'/>
            </Link>
          </div>
        </nav>
      </div>

    </div>
    
  );
};

export default Navbar;
