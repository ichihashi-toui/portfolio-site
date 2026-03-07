import { useState, useRef } from 'react';
import styles from '../pages/ProjectDetail.module.scss';

export default function MeContent() {
  const [scale, setScale] = useState(1);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const startPos = useRef({ x: 0, y: 0 });

  const handleWheel = (e) => {
    e.stopPropagation(); 
    const newScale = scale - e.deltaY * 0.005;
    setScale(Math.min(Math.max(0.5, newScale), 5)); 
  };
  const handleMouseDown = (e) => {
    setIsDragging(true);
    startPos.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
  };
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setPos({ x: e.clientX - startPos.current.x, y: e.clientY - startPos.current.y });
  };
  const handleMouseUp = () => setIsDragging(false);

  const handleTouchStart = (e) => {
    if (e.touches.length === 1) { 
      setIsDragging(true);
      startPos.current = { x: e.touches[0].clientX - pos.x, y: e.touches[0].clientY - pos.y };
    }
  };
  const handleTouchMove = (e) => {
    if (!isDragging || e.touches.length !== 1) return;
    setPos({ x: e.touches[0].clientX - startPos.current.x, y: e.touches[0].clientY - startPos.current.y });
  };

  const resetView = () => {
    setScale(1);
    setPos({ x: 0, y: 0 });
  };

  return (
    <section className={styles.contentSection}>
      <div className={`${styles.block} ${styles.darkBlock}`}>
        <div className={styles.fullWidthContent}>
          <div className={`${styles.tag} ${styles.darkTag}`}>INTERACTIVE VIEWER</div>
          <p className={`${styles.text} ${styles.darkText}`}>
            PCはマウスホイールとドラッグ、スマホはスワイプで自由に移動してご覧いただけます。
          </p>
          
          <div className={styles.mockupContainerGroup}>
            <div 
              className={styles.interactiveViewer}
              onWheel={handleWheel}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart} 
              onTouchMove={handleTouchMove}   
              onTouchEnd={handleMouseUp}      
              style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
            >
              <img 
                src={`${import.meta.env.BASE_URL}contents/me.jpg`} 
                alt="Self Expression Collage" 
                className={styles.viewerImage}
                style={{ 
                  transform: `translate(${pos.x}px, ${pos.y}px) scale(${scale})`, 
                  transition: isDragging ? 'none' : 'transform 0.1s ease-out' 
                }} 
                draggable="false"
              />
              <div className={styles.viewerControls}>
                <button onClick={resetView}>Reset View</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.block}>
        <div className={styles.blockIndex}>01</div>
        <div className={styles.blockContent}>
          <div className={styles.tag}>CONCEPT</div>
          <h2 className={styles.sectionTitle}>内面的な衝動をキャッチーに</h2>
          <p className={styles.text}>自分のアイデンティティを構築するものを配置し、自分自身を押し込めている窮屈さを演出しました。</p>
        </div>
      </div>
    </section>
  );
}