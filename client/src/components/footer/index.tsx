import './index.css';
import { Link } from 'react-router-dom';

/**
 * Webpage footer component containing link to author's GitHub, last updated date, and link to
 * information and image sources.
 */
export default function Footer() {
  return (
    <div className='os-footer'>
      <a
        href='https://github.com/celiaburrington'
        id='os-github'
        className='os-footer-menu os-no-link'
        target='_blank'
        rel='noopener noreferrer'>
        Celia Burrington
      </a>
      Last modifed 2025
      <Link to='attribution' className='os-footer-menu os-no-link'>
        Bibliography and Image Attribution
      </Link>
    </div>
  );
}
