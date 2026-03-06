import { useLayoutEffect, useRef, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import styles from './ProjectDetail.module.scss';
import FomoContent from '../project-contents/FomoContent';
import EqdContent from '../project-contents/EqdContent';
import CosmeContent from '../project-contents/CosmeContent';
import InterContent from '../project-contents/InterContent';
import FukudaContent from '../project-contents/FukudaContent';
import TypoContent from '../project-contents/TypoContent';
import MeContent from '../project-contents/MeContent';
import SyoboContent from '../project-contents/SyoboContent';

const projects = [
  { id: 1, slug: 'fomo', cat: 'Web design', title: 'FOMO啓発サイト', date: '2026.02', type: '個人制作', role: '企画・デザイン・実装', stack: 'Figma / HTML / CSS / JavaScript', img: 'moc/fomo.png' },
  { id: 2, slug: 'eqd', cat: 'Web design', title: 'ブランドサイトリデザイン', date: '2025.11', type: '個人制作', role: 'ブランディング / Webデザイン / フロントエンド実装', stack: 'Figma / Blender / React / Sass', img: 'moc/eqd.png' },
  { id: 3, slug: 'cosme', cat: 'Web design', title: 'メンズ美容ブランド', date: '2026.02', type: '個人制作', role: 'Webデザイン / フロントエンド実装', stack: 'Figma / React / Sass', img: 'moc/cosme.png' },
  { id: 4, slug: 'inter', cat: 'Web design', title: 'コーポレートサイト改修', date: '2025.11', type: '個人制作', role: 'ブランディング / Webデザイン / フロントエンド実装', stack: 'Figma / Blender / React / Sass', img: 'moc/inter.png' },
  { id: 5, slug: 'fukuda', cat: 'graphic design', title: '展示会リーフレット', date: '2026.02', type: '個人制作', role: 'Webデザイン / フロントエンド実装', stack: 'Figma / React / Sass', img: 'moc/fukuda.png' },
  { id: 6, slug: 'typo', cat: 'graphic design', title: 'タイポグラフィアートワーク', date: '2025.11', type: '個人制作', role: 'ブランディング / Webデザイン / フロントエンド実装', stack: 'Figma / Blender / React / Sass', img: 'moc/typo.png' },
  { id: 7, slug: 'me', cat: 'graphic design', title: '自己表現コラージュ', date: '2026.02', type: '個人制作', role: 'Webデザイン / フロントエンド実装', stack: 'Figma / React / Sass', img: 'moc/me.png' },
  { id: 8, slug: 'syobo', cat: 'graphic design', title: '危険物事故防止ポスター', date: '2025.11', type: '個人制作', role: 'ブランディング / Webデザイン / フロントエンド実装', stack: 'Figma / Blender / React / Sass', img: 'moc/syobo.png' },
];

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const lastNavTime = useRef(0);
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);
  const scrollContainerRef = useRef(null);
  const [sectionCount, setSectionCount] = useState(1);

  // ★ useEffect から useLayoutEffect に変更＆統合しました
  useLayoutEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // 1. スクロール位置を一番上へ強制リセット
    container.scrollTo(0, 0);

    // 2. セクション数を取得
    const sections = document.querySelectorAll(`.${styles.snapSection}`);
    setSectionCount(sections.length || 1);

    // 3. 3D配置の計算ロジック
    const handleScroll = () => {
      const scrollY = container.scrollTop;
      const windowHeight = window.innerHeight;
      // 再度最新のセクションを取得
      const currentSections = document.querySelectorAll(`.${styles.snapSection}`);

      currentSections.forEach((sec, i) => {
        const sectionOffset = i * windowHeight;
        const distance = scrollY - sectionOffset;
        const zPosition = distance / windowHeight;

        let scale = 1;
        let opacity = 1;

        if (zPosition > 0) {
          scale = 1 + zPosition * 3; 
          opacity = 1 - zPosition * 1.5;
        } else {
          scale = 1 + zPosition * 0.4; 
          opacity = 1 + zPosition * 1.5;
        }

        scale = Math.max(0.1, scale);
        opacity = Math.max(0, Math.min(1, opacity));

        sec.style.transform = `translate3d(0, 0, 0) scale(${scale})`;
        sec.style.opacity = opacity;
        sec.style.pointerEvents = opacity > 0.8 ? 'auto' : 'none';
        sec.style.visibility = opacity > 0 ? 'visible' : 'hidden';
      });
    };

    // 4. スクロールイベントを登録し、遅延なく【即時実行】する！
    container.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); 

    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [id]); // プロジェクト（id）が変わるたびに瞬時に計算し直す

  const currentIndex = projects.findIndex(p => p.slug === id);
  if (currentIndex === -1) return <div>Not Found</div>;

  const project = projects[currentIndex];
  const prevProject = projects[(currentIndex - 1 + projects.length) % projects.length];
  const nextProject = projects[(currentIndex + 1) % projects.length];
  const categoryNum = String(currentIndex + 1).padStart(2, '0');

  const handleWheel = (e) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 40) {
      const now = Date.now();
      if (now - lastNavTime.current < 1000) return;
      lastNavTime.current = now;

      if (e.deltaX > 0) {
        navigate(`/contents/${nextProject.slug}`);
      } else {
        navigate(`/contents/${prevProject.slug}`);
      }
    }
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null || touchStartY.current === null) return;

    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;

    const deltaX = touchStartX.current - touchEndX;
    const deltaY = touchStartY.current - touchEndY;

    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
      const now = Date.now();
      if (now - lastNavTime.current < 1000) return;
      lastNavTime.current = now;

      if (deltaX > 0) {
        navigate(`/contents/${nextProject.slug}`);
      } else {
        navigate(`/contents/${prevProject.slug}`);
      }
    }
    
    touchStartX.current = null;
    touchStartY.current = null;
  };

  const renderContent = () => {
    switch (id) {
      case 'fomo': return <FomoContent />;
      case 'eqd': return <EqdContent />;
      case 'cosme': return <CosmeContent />;
      case 'inter': return <InterContent />;
      case 'fukuda': return <FukudaContent />;
      case 'typo': return <TypoContent />;
      case 'me': return <MeContent />;
      case 'syobo': return <SyoboContent />;
      default:
        return (
          <section className={styles.contentSection}>
            <div style={{ textAlign: 'center', padding: '100px 0' }}>
              <p>Coming Soon...</p>
            </div>
          </section>
        );
    }
  };

  return (
    <div 
      id="portfolio-scroll-wrapper" 
      className={styles.pageWrapper} 
      ref={scrollContainerRef}
      data-cursortext="SCROLL"
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className={styles.dummyScroll}>
        {Array.from({ length: sectionCount }).map((_, i) => (
          <div key={i} className={styles.snapPoint} />
        ))}
      </div>

      <div className={styles.stickyContainer}>
        <Link to="/contents" className={styles.backButton} data-cursortext="TAP">
          Exit
        </Link>

        <section className={`${styles.fvSection} ${styles.snapSection}`}>
          <img 
            src={`${import.meta.env.BASE_URL}${project.img}`} 
            alt={project.title} 
            className={styles.fvImage} 
          />
          
          <div className={styles.navArrows}>
            <button 
              onClick={() => navigate(`/contents/${prevProject.slug}`)}
              data-cursortext="TAP"
            >
              &lt;
            </button>
            <button 
              onClick={() => navigate(`/contents/${nextProject.slug}`)}
              data-cursortext="TAP"
            >
              &gt;
            </button>
          </div>

          <div className={styles.fvInfo}>
            <div className={styles.category}>{project.cat} {categoryNum}</div>
            <h1 className={styles.title}>{project.title}</h1>
            <div className={styles.meta}>
              <p>担当: {project.role}</p>
              <p>{project.date}</p>
              <p>{project.type}</p>
              <p>{project.stack}</p>
            </div>
          </div>
        </section>

        {renderContent()}
      </div>
    </div>
  );
}