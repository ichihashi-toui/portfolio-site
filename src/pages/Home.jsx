import { Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import Contents from '../components/Contents';
import Profile from '../components/Profile';
import Footer from '../components/Footer';
import LoadingScreen from '../components/LoadingScreen';
import HomeTvGallery from '../components/HomeTvGallery';
import styles from './Home.module.scss';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="container">
      {/* 画面全体を覆うローディング画面 */}
      <LoadingScreen />

      <Hero />
      <Contents />
      <Profile />

      <section className={styles.gallerySection}>
        <div className={styles.galleryTitle}>
          <h2>Gallery</h2>
        </div>

        <div
          className={styles.tvWrapper}
          onClick={() => navigate('/gallery')}
          data-cursortext="TAP"
        >
          {/* 3Dコンテンツの読み込み完了を待機 */}
          <Suspense fallback={null}>
            <HomeTvGallery />
          </Suspense>
        </div>
      </section>

      <Footer />
    </div>
  );
}