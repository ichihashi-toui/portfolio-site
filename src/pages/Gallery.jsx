import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import styles from './Gallery.module.scss';

export default function Gallery() {
  const location = useLocation();

  // ★画像のパスはご自身の環境（publicフォルダ内の構成）に合わせて修正してください
  const galleryData = [
    { id: 1, src: "gallery/gallery-14.jpg" },
    { id: 2, src: "gallery/gallery-10.jpg" },
    { id: 3, src: "gallery/gallery-23.jpg" },
    { id: 4, src: "gallery/kotomi-6.jpg" },
    { id: 5, src: "gallery/gallery-17.jpg" },
    { id: 6, src: "gallery/kotomi-2.jpg" },
    { id: 7, src: "gallery/gallery-12.jpg" },
    { id: 8, src: "gallery/kotomi-3.jpg" },
    { id: 9, src: "gallery/gallery-19.jpg" },
    { id: 10, src: "gallery/gallery-05.jpg" },
    { id: 11, src: "gallery/gallery-01.jpg" },
    { id: 12, src: "gallery/gallery-02.jpg" },
    { id: 13, src: "gallery/gallery-03.jpg" },
    { id: 14, src: "gallery/gallery-04.jpg" },
    { id: 15, src: "gallery/gallery-06.jpg" },
    { id: 16, src: "gallery/gallery-07.jpg" },
    { id: 17, src: "gallery/gallery-08.jpg" },
    { id: 18, src: "gallery/gallery-09.jpg" },
    { id: 19, src: "gallery/gallery-11.jpg" },
    { id: 20, src: "gallery/gallery-13.jpg" },
    { id: 21, src: "gallery/gallery-15.jpg" },
    { id: 22, src: "gallery/gallery-16.jpg" },
    { id: 23, src: "gallery/gallery-18.jpg" },
    { id: 24, src: "gallery/gallery-20.jpg" },
    { id: 25, src: "gallery/gallery-21.jpg" },
    { id: 26, src: "gallery/gallery-22.jpg" },
    { id: 27, src: "gallery/kotomi-1.jpg" },
    { id: 28, src: "gallery/kotomi-4.jpg" },
    { id: 29, src: "gallery/kotomi-5.jpg" },
  ];

  const [selectedId, setSelectedId] = useState(location.state?.selectedId || galleryData[0].id);
  const selectedItem = galleryData.find(item => item.id === selectedId) || galleryData[0];
  const currentIndex = galleryData.findIndex(item => item.id === selectedId);
  const lastWheelTime = useRef(0);

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

  const handleWheel = (e) => {
    const now = Date.now();
    if (now - lastWheelTime.current < 600) return;
    if (Math.abs(e.deltaY) < 50) return;
    if (e.deltaY > 0) goNext(); else goPrev();
    lastWheelTime.current = now;
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

      {/* 1. MAIN VIEWER */}
      <div className={styles.mainViewer} onWheel={handleWheel}>
        <AnimatePresence mode="wait">
          <motion.img
            key={selectedItem.id}
            src={`${import.meta.env.BASE_URL}${selectedItem.src.replace(/^\//, '')}`}
            alt=""
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={styles.mainImage}
          />
        </AnimatePresence>
      </div>

      {/* 2. SELECTION LIST */}
      <div 
        className={styles.listContainer} 
        onWheel={(e) => e.stopPropagation()} 
      >
        {galleryData.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedId(item.id)}
            className={`${styles.listItem} ${selectedId === item.id ? styles.active : ''}`}
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