import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import styles from './Gallery.module.scss';

export default function Gallery() {
  const location = useLocation();

  const galleryData = [
    { id: 1, src: "gallery/gallery-14.jpg" },
    { id: 2, src: "gallery/gallery-10.jpg" },
    { id: 3, src: "gallery/gallery-23.jpg" },
    { id: 4, src: "gallery/gallery-17.jpg" },
    { id: 5, src: "gallery/gallery-12.jpg" },
    { id: 6, src: "gallery/gallery-19.jpg" },
    { id: 7, src: "gallery/gallery-05.jpg" },
    { id: 8, src: "gallery/gallery-01.jpg" },
    { id: 9, src: "gallery/gallery-02.jpg" },
    { id: 10, src: "gallery/gallery-03.jpg" },
    { id: 11, src: "gallery/gallery-04.jpg" },
    { id: 12, src: "gallery/gallery-06.jpg" },
    { id: 13, src: "gallery/gallery-07.jpg" },
    { id: 14, src: "gallery/gallery-08.jpg" },
    { id: 15, src: "gallery/gallery-09.jpg" },
    { id: 16, src: "gallery/gallery-11.jpg" },
    { id: 17, src: "gallery/gallery-13.jpg" },
    { id: 18, src: "gallery/gallery-16.jpg" },
    { id: 19, src: "gallery/gallery-18.jpg" },
    { id: 20, src: "gallery/gallery-20.jpg" },
    { id: 21, src: "gallery/gallery-21.jpg" },
    { id: 22, src: "gallery/gallery-22.jpg" },
  ];

  const [selectedId, setSelectedId] = useState(location.state?.selectedId || galleryData[0].id);
  const selectedItem = galleryData.find(item => item.id === selectedId) || galleryData[0];
  const currentIndex = galleryData.findIndex(item => item.id === selectedId);

  const [scale, setScale] = useState(1);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isPinching, setIsPinching] = useState(false);
  
  const startPos = useRef({ x: 0, y: 0 });
  const initialTouchDistance = useRef(null);
  const initialScale = useRef(1);

  useEffect(() => {
    setScale(1);
    setPos({ x: 0, y: 0 });
  }, [selectedId]);

  const goNext = () => { if (currentIndex < galleryData.length - 1) setSelectedId(galleryData[currentIndex + 1].id); };
  const goPrev = () => { if (currentIndex > 0) setSelectedId(galleryData[currentIndex - 1].id); };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') goNext();
      else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedId]); 

  const handleWheelZoom = (e) => {
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

  return (
    <motion.div
      className={styles.galleryPage}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className={styles.pageTitle}>gallery</h2>

      <div 
        className={styles.mainViewer} 
        onWheel={handleWheelZoom}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleEnd}
        style={{ overflow: 'hidden', cursor: isDragging ? 'grabbing' : 'grab' }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            transform: `translate(${pos.x}px, ${pos.y}px) scale(${scale})`,
            transition: (isDragging || isPinching) ? 'none' : 'transform 0.1s ease-out'
          }}
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={selectedItem.id}
              src={`${import.meta.env.BASE_URL}${selectedItem.src.replace(/^\//, '')}`}
              alt=""
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={styles.mainImage}
              draggable="false"
            />
          </AnimatePresence>
        </div>
      </div>

      <div 
        className={styles.listContainer} 
        onWheel={(e) => e.stopPropagation()} 
      >
        {galleryData.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedId(item.id)}
            className={`${styles.listItem} ${selectedId === item.id ? styles.active : ''}`}
            data-cursortext="TAP"
          >
            <div className={styles.thumbnailWrapper}>
              <img 
                src={`${import.meta.env.BASE_URL}${item.src.replace(/^\//, '')}`} 
                alt="" 
                className={styles.thumbnail} 
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}