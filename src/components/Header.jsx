import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <header className={styles.header}data-cursortext="TAP">
        <button className={`${styles.hamburger} ${isOpen ? styles.open : ''}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
        </button>
      </header>

      <div className={`${styles.menuOverlay} ${isOpen ? styles.active : ''}`}>
        <nav className={styles.nav}>
          <Link to="/" onClick={toggleMenu}>Home</Link>
          <Link to="/contents" onClick={toggleMenu}>Contents</Link>
          <Link to="/profile" onClick={toggleMenu}>Profile</Link>
          <Link to="/gallery" onClick={toggleMenu}>Gallery</Link>
        </nav>
      </div>
    </>
  );
}