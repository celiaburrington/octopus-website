import React from 'react';
import './index.css';
import { Outlet } from 'react-router-dom';
import Header from '../header';

/**
 * Main component representing the layout of the main page, including a header menu and the main content area.
 */
const Layout = () => (
  <div id='os-main' className='os-main'>
    <Header />
    <div id='os-body' className='os-body'>
      <Outlet />
    </div>
  </div>
);

export default Layout;
