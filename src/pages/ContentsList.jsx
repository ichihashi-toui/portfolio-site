import { useState, useRef, Suspense, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Image, Environment } from '@react-three/drei';
import { useWheel } from '@use-gesture/react';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';
import styles from './ContentsList.module.scss';
import LoadingScreen from '../components/LoadingScreen'; 

const projects = [
  { id: 1, slug: 'fomo', cat: 'Web design', title: 'FOMO啓発サイト', date: '2026-02', type: '個人制作', role: 'Webデザイン / フロントエンド実装', stack: 'Figma / HTML / CSS / JavaScript', img: 'moc/fomo.png' },
  { id: 2, slug: 'eqd', cat: 'Web design', title: 'ブランドサイトリデザイン', date: '2025-11', type: '個人制作', role: 'ブランディング / Webデザイン / フロントエンド実装', stack: 'Figma / Blender / React / Sass', img: 'moc/eqd.png' },
  { id: 3, slug: 'cosme', cat: 'Web design', title: 'メンズ美容ブランド', date: '2026-02', type: '個人制作', role: 'Webデザイン / フロントエンド実装', stack: 'Figma / React / Sass', img: 'moc/cosme.png' },
  { id: 4, slug: 'inter', cat: 'Web design', title: 'コーポレートサイト改修', date: '2025-11', type: '個人制作', role: 'ブランディング / Webデザイン / フロントエンド実装', stack: 'Figma / Blender / React / Sass', img: 'moc/inter.png' },
  { id: 5, slug: 'fukuda', cat: 'graphic design', title: '展示会リーフレット', date: '2026-02', type: '個人制作', role: 'Webデザイン / フロントエンド実装', stack: 'Figma / React / Sass', img: 'moc/fukuda.png' },
  { id: 6, slug: 'typo', cat: 'graphic design', title: 'タイポグラフィアートワーク', date: '2025-11', type: '個人制作', role: 'ブランディング / Webデザイン / フロントエンド実装', stack: 'Figma / Blender / React / Sass', img: 'moc/typo.png' },
  { id: 7, slug: 'me', cat: 'graphic design', title: '自己表現コラージュ', date: '2026-02', type: '個人制作', role: 'Webデザイン / フロントエンド実装', stack: 'Figma / React / Sass', img: 'moc/me.png' },
  { id: 8, slug: 'syobo', cat: 'graphic design', title: '危険物事故防止ポスター', date: '2025-11', type: '個人制作', role: 'ブランディング / Webデザイン / フロントエンド実装', stack: 'Figma / Blender / React / Sass', img: 'moc/syobo.png' },
];

function CursorWrapper({ children }) {
  const [cursorText, setCursorText] = useState('SCROLL');

  useEffect(() => {
    const handleUpdate = (e) => setCursorText(e.detail);
    window.addEventListener('updateCursorText', handleUpdate);
    return () => window.removeEventListener('updateCursorText', handleUpdate);
  }, []);

  return (
    <div className={styles.canvasWrapper} data-cursortext={cursorText}>
      {children}
    </div>
  );
}

function ProjectImage({ project, angle, radius, navigate }) {
  const [hovered, setHovered] = useState(false);
  const x = radius * Math.cos(angle);
  const y = radius * Math.sin(angle);

  const updateCursor = (text) => {
    window.dispatchEvent(new CustomEvent('updateCursorText', { detail: text }));
  };

  return (
    <Image
      url={`${import.meta.env.BASE_URL}${project.img}`}
      position={[x, y, 0]}
      scale={hovered ? [5.7, 3.8, 1] : [5.5, 3.6, 1]} 
      rotation={[0, 0, angle]}
      side={THREE.DoubleSide}
      onClick={() => navigate(`/contents/${project.slug}`)}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        updateCursor('TAP'); 
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHovered(false);
        updateCursor('SCROLL'); 
      }}
    />
  );
}

function RotatingGallery({ activeIndex, setActiveIndex, navigate }) {
  const groupRef = useRef();
  const rotationTarget = useRef(0);
  const rotationCurrent = useRef(0);
  
  const isInteracting = useRef(false);
  const interactTimeout = useRef(null);
  const autoPlayTimer = useRef(0);
  
  const numItems = projects.length;
  const radius = 11; 
  const angleStep = (Math.PI * 2) / numItems; 

  useWheel(({ delta: [, dy] }) => {
    isInteracting.current = true;
    autoPlayTimer.current = 0;

    rotationTarget.current -= dy * 0.0007; 

    if (interactTimeout.current) clearTimeout(interactTimeout.current);
    interactTimeout.current = setTimeout(() => {
      isInteracting.current = false;
      const snappedIndex = Math.round(rotationTarget.current / angleStep);
      rotationTarget.current = snappedIndex * angleStep;
    }, 300);
  }, { target: window }); 

  useFrame((state, delta) => {
    if (!isInteracting.current) {
      autoPlayTimer.current += delta;
      if (autoPlayTimer.current > 10.0) {
        const currentIndex = Math.round(rotationTarget.current / angleStep);
        rotationTarget.current = (currentIndex - 1) * angleStep;
        autoPlayTimer.current = 0;
      }
    }

    rotationCurrent.current = THREE.MathUtils.lerp(
      rotationCurrent.current,
      rotationTarget.current,
      0.08 
    );
    groupRef.current.rotation.z = rotationCurrent.current;

    let normalizedRotation = rotationCurrent.current % (Math.PI * 2);
    if (normalizedRotation > 0) normalizedRotation -= Math.PI * 2;
    
    const rawIndex = Math.round(Math.abs(normalizedRotation) / angleStep);
    const newIndex = rawIndex % numItems;

    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  });

  return (
    <group ref={groupRef} position={[-11, 0, 0]}>
      {projects.map((project, i) => (
        <ProjectImage 
          key={project.id} 
          project={project} 
          angle={angleStep * i} 
          radius={radius} 
          navigate={navigate} 
        />
      ))}
    </group>
  );
}

export default function ContentsList() {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();
  // ★ スマホサイズかどうかを判定する変数を追加
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const carouselRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const originalHtmlOverflow = document.documentElement.style.overflow;
    const originalBodyOverflow = document.body.style.overflow;
    
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    
    const preventTouch = (e) => {
      // ★ スマホの横カルーセル部分だけは指でのスワイプ（スクロール）を許可する
      if (e.target.closest(`.${styles.mobileCarousel}`)) return;
      e.preventDefault();
    };
    document.addEventListener('touchmove', preventTouch, { passive: false });

    return () => {
      document.documentElement.style.overflow = originalHtmlOverflow;
      document.body.style.overflow = originalBodyOverflow;
      document.removeEventListener('touchmove', preventTouch);
    };
  }, []);

  // ★ カルーセルをスワイプした時に、今どの画像が真ん中にあるか計算してテキストを切り替える
  const handleScroll = () => {
    if (!carouselRef.current) return;
    const scrollLeft = carouselRef.current.scrollLeft;
    const itemWidth = window.innerWidth;
    const index = Math.round(scrollLeft / itemWidth);
    if (index !== activeIndex && index >= 0 && index < projects.length) {
      setActiveIndex(index);
    }
  };

  return (
    <section className={styles.container}>
      <LoadingScreen />

      <div className={styles.leftPane}>
        <h2 className={styles.pageTitle}>contents</h2>

        <div className={styles.indicator}>
            <span className={styles.currentNum}>{String(activeIndex + 1).padStart(2, '0')}</span>
            <span className={styles.totalNum}>/ {String(projects.length).padStart(2, '0')}</span>
          </div>
        
        <div key={activeIndex} className={styles.infoArea}>
          <p className={styles.category}>{projects[activeIndex].cat}</p>
          <h3 className={styles.projectTitle}>{projects[activeIndex].title}</h3>
          <div className={styles.details}>
            <p>{projects[activeIndex].date} / {projects[activeIndex].type}</p>
            <p className={styles.roles}>{projects[activeIndex].role}</p>
            <p>{projects[activeIndex].stack}</p>
          </div>
        </div>
      </div>

      {/* ★ スマホの時は横カルーセル、PCの時は3Dキャンバスを表示するように分岐 */}
      {isMobile ? (
        <>
        <div 
          className={styles.mobileCarousel} 
          ref={carouselRef} 
          onScroll={handleScroll}
        >
          {projects.map((project) => (
            <div 
              key={project.id} 
              className={styles.carouselItem}
              onClick={() => navigate(`/contents/${project.slug}`)}
            >
              <img src={`${import.meta.env.BASE_URL}${project.img}`} alt={project.title} className={styles.carouselImg} />
              <div className={styles.tapToView}>TAP TO VIEW</div>
            </div>
          ))}
        </div>
        <div className={styles.dotsContainer}>
            {projects.map((_, index) => (
              <div
                key={index}
                className={`${styles.dot} ${index === activeIndex ? styles.activeDot : ''}`}
              />
            ))}
          </div>
        </>
      ) : (
        <CursorWrapper>
          <Canvas camera={{ position: [0, 0, 10], fov: 40 }}>
            <color attach="background" args={['#e5e5e5']} />
            <ambientLight intensity={0.5} />
            <Environment preset="city" />

            <Suspense fallback={null}>
              <RotatingGallery 
                activeIndex={activeIndex} 
                setActiveIndex={setActiveIndex} 
                navigate={navigate}
              />
            </Suspense>
          </Canvas>
        </CursorWrapper>
      )}
    </section>
  );
}