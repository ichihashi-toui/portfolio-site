import { useState, useEffect, useRef } from 'react';
import styles from '../pages/ProjectDetail.module.scss';

export default function InterContent() {
  const [isInteractive, setIsInteractive] = useState(false);
  const pcContainerRef = useRef(null);
  const spContainerRef = useRef(null);
  const [pcScale, setPcScale] = useState(1);
  const [spScale, setSpScale] = useState(1);

  useEffect(() => {
    const pcObserver = new ResizeObserver((entries) => {
      for (let entry of entries) setPcScale(entry.contentRect.width / 1440);
    });
    const spObserver = new ResizeObserver((entries) => {
      for (let entry of entries) setSpScale(entry.contentRect.width / 390);
    });
    if (pcContainerRef.current) pcObserver.observe(pcContainerRef.current);
    if (spContainerRef.current) spObserver.observe(spContainerRef.current);
    return () => { pcObserver.disconnect(); spObserver.disconnect(); };
  }, []);

  return (
    <section className={styles.contentSection}>
      <div className={`${styles.block} ${styles.snapSection} ${styles.darkBlock}`}>
        <div className={styles.fullWidthContent}>
          <div className={`${styles.tag} ${styles.darkTag}`}>LIVE PREVIEW</div>
          <h2 className={`${styles.sectionTitle} ${styles.darkText}`}>実際のWebサイトを操作する</h2>
          
          <div className={styles.mockupContainerGroup}>
            {!isInteractive && (
              <button className={styles.playButton} onClick={() => setIsInteractive(true)}>
                Tap to Play
              </button>
            )}
            <div className={`${styles.mockups} ${isInteractive ? styles.active : ''}`}>
              <div className={styles.pcMockup} ref={pcContainerRef}>
                <iframe src="https://it-a-net.co.jp/" title="Inter PC" className={styles.pcIframe} style={{ transform: `scale(${pcScale})` }} />
              </div>
              <div className={styles.spMockup} ref={spContainerRef}>
                <iframe src="https://it-a-net.co.jp/" title="Inter SP" className={styles.spIframe} style={{ transform: `scale(${spScale})` }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`${styles.block} ${styles.snapSection}`}>
        <div className={styles.blockIndex}>01</div>
        <div className={styles.blockContent}>
          <div className={styles.tag}>OVERVIEW</div>
          <h2 className={styles.sectionTitle}>コーポレートサイト改修</h2>
          <p className={styles.text}>ここにテキストを追加</p>
        </div>
      </div>
    </section>
  );
}