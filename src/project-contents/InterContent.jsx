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
              <button className={styles.playButton} onClick={() => setIsInteractive(true)}data-cursortext="TAP">
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

      <div className={styles.normalContentSection}>
            <div className={`${styles.block} ${styles.snapSection}`}>
                    <div className={styles.blockIndex}>01</div>
                    <div className={styles.blockContent}>
                      <div className={styles.tag}>target</div>
                      <h2 className={styles.sectionTitle}>1st：20代前半男性 求職者</h2>
                      <h2 className={styles.sectionTitle}>2st：30〜40代男性 企業</h2>
                    </div>
                  </div>
            
                
            
                  <div className={`${styles.block} ${styles.snapSection}`}>
                    <div className={styles.blockIndex}>02</div>
                    <div className={styles.blockContent}>
                      <div className={styles.tag}>Concept</div>
                      <h2 className={styles.sectionTitle}>専門性、誠実なブランドイメージを伝えるデザイン</h2>
                    </div>
                  </div>
      
                  <div className={`${styles.block} ${styles.snapSection}`}>
                    <div className={styles.blockIndex}>03</div>
                    <div className={styles.blockContent}>
                      <div className={styles.tag}> visual</div>
                      <h2 className={styles.sectionTitle}>ファーストビューループ動画</h2>
            
                    
                      <div className={styles.uiCards}>
                        <div className={styles.uiCard}>
                          <img 
                            src={`${import.meta.env.BASE_URL}contents/fomo02.png`} 
                            alt="UIの画像" 
                            className={styles.uiImage} 
                          />
                          <div className={styles.uiText}>
                            <p>写真素材が少なく、他社サイトのように写真をメインビジュアルに使用できない点から、3DCGでの制作を企画。企業ロゴマークから球体をモチーフにして「つながり」をテーマに10秒のループ動画を制作。</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
            
                  <div className={`${styles.block} ${styles.snapSection}`}>
                    <div className={styles.blockIndex}>04</div>
                    <div className={styles.blockContent}>
                      <div className={styles.tag}>point</div>
                      <h2 className={styles.sectionTitle}>レスポンシブ対応</h2>
                      <p className={styles.text}>
                        ターゲットが幅広く、ユーザーの閲覧するツールが絞れないことから、どのような端末でも見やすいようなレイアウトを心がけました。
                      </p>
                    </div>
                  </div>
                </div>
              </section>
  );
}