import { useState, useRef } from 'react';
import styles from '../pages/ProjectDetail.module.scss';

export default function FukudaContent() {
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
    setPos({
      x: e.clientX - startPos.current.x,
      y: e.clientY - startPos.current.y,
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  const resetView = () => {
    setScale(1);
    setPos({ x: 0, y: 0 });
  };

  return (
    <section className={styles.contentSection}>
      <div className={`${styles.block} ${styles.snapSection} ${styles.darkBlock}`}>
        <div className={styles.fullWidthContent}>
          <div className={`${styles.tag} ${styles.darkTag}`}>INTERACTIVE VIEWER</div>
          <h2 className={`${styles.sectionTitle} ${styles.darkText}`}>作品のディテールを見る</h2>
          <p className={`${styles.text} ${styles.darkText}`}>
            マウスホイールで拡大縮小、ドラッグで自由に移動してご覧いただけます。
          </p>
          
          <div className={styles.mockupContainerGroup}>
            <div 
              className={styles.interactiveViewer}
              onWheel={handleWheel}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
            >
              <img 
                src={`${import.meta.env.BASE_URL}moc/fukuda.png`} 
                alt="Graphic Artwork" 
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

      <div className={`${styles.block} ${styles.snapSection}`}>
        <div className={styles.blockIndex}>01</div>
        <div className={styles.blockContent}>
          <div className={styles.tag}>CONCEPT</div>
          <h2 className={styles.sectionTitle}>デザインコンセプト</h2>
          <p className={styles.text}>ここにテキストを追加</p>
        </div>
      </div>
    </section>
  );
}