import React from 'react';
import './index.css';
import { Link } from 'react-router-dom';

/**
 * Header component that renders the main title and a menu bar.
 */
const Header = () => (
  <div id='os-header' className='os-header'>
    <Link to='/' className='os-icon'>
      <img src='/site-resources/icon(2).png' width={75} height={80}></img>
    </Link>
    <Link to='/' className='os-title os-menu-item os-no-link'>
      Octopus Project
    </Link>
    <Link to='/how-to-help' className='os-menu-item os-no-link'>
      Get involved
    </Link>
    <Link to='/octopus-facts' className='os-menu-item os-no-link'>
      Octoids
    </Link>
    <Link to='/game' className='os-menu-item os-no-link'>
      Game time!
    </Link>
    <Link to='/octoblog' className='os-menu-item os-blog-menu os-no-link'>
      Octoblog!
    </Link>
  </div>
);

export default Header;
