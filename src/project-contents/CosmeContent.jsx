import { useState, useEffect, useRef } from 'react';
import styles from '../pages/ProjectDetail.module.scss';

export default function CosmeContent() {
  const [isInteractive, setIsInteractive] = useState(false);
  const spContainerRef = useRef(null);
  const [spScale, setSpScale] = useState(1);

  useEffect(() => {
    const spObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setSpScale(entry.contentRect.width / 390);
      }
    });

    if (spContainerRef.current) spObserver.observe(spContainerRef.current);

    return () => {
      spObserver.disconnect();
    };
  }, []);

  return (
    <section className={styles.contentSection}>
      
      <div className={`${styles.block} ${styles.snapSection} ${styles.darkBlock}`}>
        <div className={styles.fullWidthContent}>
          <div className={`${styles.tag} ${styles.darkTag}`}>LIVE PREVIEW</div>
          <h2 className={`${styles.sectionTitle} ${styles.darkText}`}>実際のWebサイトを操作する</h2>
          <p className={`${styles.text} ${styles.darkText}`}>
            スマートフォン専用のWebサイトです。クリックしてインタラクションを体験してください。
          </p>
          
          <div className={styles.mockupContainerGroup}>
            {!isInteractive && (
              <button 
                className={styles.playButton}
                onClick={() => setIsInteractive(true)}
              >
                Tap to Play
              </button>
            )}
            <div className={`${styles.mockups} ${isInteractive ? styles.active : ''}`}>
              <div 
                className={styles.spMockup} 
                ref={spContainerRef}
              >
                <iframe 
                  src="https://ichihashi-toui.github.io/clean-tone/" 
                  title="Cosme Live Preview Mobile"
                  className={styles.spIframe}
                  style={{ transform: `scale(${spScale})` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
<div className={styles.normalContentSection}>
      <div className={`${styles.block} ${styles.snapSection}`}>
        <div className={styles.blockIndex}>01</div>

        <div className={styles.blockContent}>
          <div className={styles.tag}>CONCEPT</div>
          <h2 className={styles.sectionTitle}>メンズコスメブランドのコンセプト</h2>
          <p className={styles.text}>
            ここに後からテキストを追加してください。
          </p>
        </div>
      </div>
      </div>

      <div className={`${styles.block} ${styles.snapSection}`}>
        <div className={styles.blockIndex}>02</div>
        <div className={styles.blockContent}>
          <div className={styles.tag}>DESIGN</div>
          <h2 className={styles.sectionTitle}>デザインのポイント</h2>
          <p className={styles.text}>
            ここに後からテキストを追加してください。
          </p>
        </div>
      </div>

    </section>
  );
}