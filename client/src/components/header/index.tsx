import React from 'react';
import './index.css';
import { Link } from 'react-router-dom';

/**
 * Header component that renders the main title and a search bar.
 * The search bar allows the user to input a query and navigate to the search results page
 * when they press Enter.
 */
const Header = () => (
  <div id='os-header' className='os-header'>
    <img src='site-resources/icon.png' width={75}></img>
    <h2 className='os-title os-white'>Octopus Website!</h2>
    <Link to='/' className='os-no-link'>
      <h3 className='os-home-menu'>Home</h3>
    </Link>
    <Link to='how-to-help' className='os-no-link'>
      <h3 className='os-help-menu'>How To Help</h3>
    </Link>
    <Link to='game' className='os-no-link'>
      <h3 className='os-game-menu'>Play a Game</h3>
    </Link>
    <Link to='octoblog' className='os-no-link'>
      <h3 className='os-blog-menu'>Octoblog</h3>
    </Link>
  </div>
);

export default Header;
