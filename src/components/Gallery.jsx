import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Gallery.module.scss';

const images = ['gallery-12.jpg', 'gallery-10.jpg', 'gallery-23.jpg'];

export default function Gallery() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isNoisy, setIsNoisy] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsNoisy(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
        setIsNoisy(false);
      }, 200);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className={styles.gallerySection} onClick={() => navigate('/gallery')}>
      <h2 className={styles.sectionTitle}>gallery</h2>
      <div className={`${styles.tvContainer} ${isNoisy ? styles.glitchActive : ''}`}>
        <img src={`${import.meta.env.BASE_URL}${images[currentIndex]}`} alt="Gallery" className={styles.image} />
        <div className={styles.noiseOverlay}></div>
      </div>
    </section>
  );
}