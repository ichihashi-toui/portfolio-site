import { useState, useRef } from 'react';
import styles from '../pages/ProjectDetail.module.scss';

export default function TypoContent() {
  const [scale, setScale] = useState(1);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isPinching, setIsPinching] = useState(false);
  
  const startPos = useRef({ x: 0, y: 0 });
  const initialTouchDistance = useRef(null);
  const initialScale = useRef(1);

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
  
  const handleEnd = () => {
    setIsDragging(false);
    setIsPinching(false);
    initialTouchDistance.current = null;
  };

  const getDistance = (touches) => {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const handleTouchStart = (e) => {
    if (e.touches.length === 1) { 
      setIsDragging(true);
      setIsPinching(false);
      startPos.current = { x: e.touches[0].clientX - pos.x, y: e.touches[0].clientY - pos.y };
      initialTouchDistance.current = null;
    } else if (e.touches.length === 2) {
      setIsDragging(false); 
      setIsPinching(true);
      initialTouchDistance.current = getDistance(e.touches);
      initialScale.current = scale;
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches.length === 1 && isDragging) {
      setPos({ x: e.touches[0].clientX - startPos.current.x, y: e.touches[0].clientY - startPos.current.y });
    } else if (e.touches.length === 2 && isPinching && initialTouchDistance.current !== null) {
      const currentDistance = getDistance(e.touches);
      const scaleChange = currentDistance / initialTouchDistance.current;
      const newScale = initialScale.current * scaleChange;
      setScale(Math.min(Math.max(0.5, newScale), 5));
    }
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
            PCはマウスホイールとドラッグ、スマホはピンチ操作とスワイプで自由に移動してご覧いただけます。
          </p>
          
          <div className={styles.mockupContainerGroup}>
            <div 
              className={styles.interactiveViewer}
              onWheel={handleWheel}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleEnd}
              onMouseLeave={handleEnd}
              onTouchStart={handleTouchStart} 
              onTouchMove={handleTouchMove}   
              onTouchEnd={handleEnd}      
              style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
            >
              <img 
                src={`${import.meta.env.BASE_URL}contents/typo.jpg`} 
                alt="Typography Artwork" 
                className={styles.viewerImage}
                style={{ 
                  transform: `translate(${pos.x}px, ${pos.y}px) scale(${scale})`, 
                  transition: (isDragging || isPinching) ? 'none' : 'transform 0.1s ease-out' 
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
          <h2 className={styles.sectionTitle}>濁流のような感情表現</h2>
          <p className={styles.text}>感情の濁流を表現するため水に溶けているようにして、文字同士の境界を曖昧にしました。画面下部を埋め尽くすような圧迫感を持たせ、制御不能になった感情の奔流を表現しました。</p>
        </div>
      </div>
    </section>
  );
}