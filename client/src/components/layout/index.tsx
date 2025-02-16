import React from 'react';
import './index.css';
import { Outlet } from 'react-router-dom';
import Header from '../header';
import Footer from '../footer';

/**
 * Layout component representing the layout of the main page, including a header menu,
 * the main content area, and footer.
 */
const Layout = () => (
  <div id='os-main' className='os-main'>
    <Header />
    <div id='os-body' className='os-body'>
      <Outlet />
    </div>
    <Footer />
  </div>
);

export default Layout;
