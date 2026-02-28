import Hero from '../components/Hero';
import Contents from '../components/Contents';
import Profile from '../components/Profile';
import Gallery from '../components/Gallery';
import Footer from '../components/Footer';
import styles from './Home.module.scss';
import HomeTvGallery from '../components/Gallery';

export default function Home() {
  return (
    <div className="container">
      <Hero />
      <Contents />
      <Profile />
      <Gallery />
      <Footer />
<section className={styles.gallerySection}>
        <div className={styles.galleryTitle}>
          <h2>Gallery</h2>
          <p>Analog vibes in digital world.</p>
        </div>
        
        <div className={styles.tvWrapper}>
          <HomeTvGallery />
        </div>
      </section>
    </div>
  );
}