import { useState, useEffect, useRef } from 'react';
import styles from '../pages/ProjectDetail.module.scss';

export default function EqdContent() {
  const [isInteractive, setIsInteractive] = useState(false);
  const pcContainerRef = useRef(null);
  const spContainerRef = useRef(null);
  const [pcScale, setPcScale] = useState(1);
  const [spScale, setSpScale] = useState(1);

  useEffect(() => {
    const pcObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setPcScale(entry.contentRect.width / 1440);
      }
    });
    
    const spObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setSpScale(entry.contentRect.width / 390);
      }
    });

    if (pcContainerRef.current) pcObserver.observe(pcContainerRef.current);
    if (spContainerRef.current) spObserver.observe(spContainerRef.current);

    return () => {
      pcObserver.disconnect();
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
            PC・スマホのレスポンシブデザインに対応しています。クリックしてインタラクションを体験してください。
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
              <div className={styles.pcMockup} ref={pcContainerRef}>
                <iframe 
                  src="https://ichihashi-toui.github.io/redesign/" 
                  title="EQD Redesign Live Preview PC"
                  className={styles.pcIframe}
                  style={{ transform: `scale(${pcScale})` }}
                />
              </div>
              <div className={styles.spMockup} ref={spContainerRef}>
                <iframe 
                  src="https://ichihashi-toui.github.io/redesign/" 
                  title="EQD Redesign Live Preview Mobile"
                  className={styles.spIframe}
                  style={{ transform: `scale(${spScale})` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`${styles.block} ${styles.snapSection}`}>
        <div className={styles.blockIndex}>01</div>
        <div className={styles.blockContent}>
          <div className={styles.tag}>CONCEPT</div>
          <h2 className={styles.sectionTitle}>直感的な操作と3D表現でペダルの魅力を伝える</h2>
          <p className={styles.text}>
            EarthQuaker Devicesの持つ個性的でアナログな魅力を、デジタルのWebブラウザ上で表現するためのリデザイン案です。
          </p>
        </div>
      </div>

      <div className={`${styles.block} ${styles.snapSection}`}>
        <div className={styles.blockIndex}>02</div>
        <div className={styles.blockContent}>
          <div className={styles.tag}>3D MODELING</div>
          <h2 className={styles.sectionTitle}>BlenderによるPlumesの精密なモデリング</h2>
          <p className={styles.text}>
            メインビジュアルやインタラクションで使用するため、代表的なオーバードライブペダルであるPlumesをBlenderでモデリングしました。筐体の質感やノブのディテールにこだわっています。
          </p>
          <div className={styles.uiCards}>
            <div className={styles.uiCard}>
              <div className={styles.uiImage}></div>
              <div className={styles.uiText}>
                <h4>3D Model Viewer</h4>
                <p>細部のディテールまで自由に回転して確認できるUIを実装想定。</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}