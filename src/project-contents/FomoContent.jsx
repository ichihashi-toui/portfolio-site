import { useState, useEffect, useRef } from 'react';
import styles from '../pages/ProjectDetail.module.scss';

export default function FomoContent() {
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
          
          <div className={styles.mockupContainerGroup}>
            {!isInteractive && (
              <button 
                className={styles.playButton}
                onClick={() => setIsInteractive(true)}
                data-cursortext="TAP"
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
                  src="https://ichihashi-toui.github.io/fomo/" 
                  title="FOMO Live Preview Mobile"
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
          <div className={styles.tag}>target</div>
          <h2 className={styles.sectionTitle}>SNS疲れを自覚している10代</h2>
          <p className={styles.text}>自身のスマホ利用習慣を見直すきっかけとなるような没入感のあるWeb体験を設計する。</p>
        </div>
      </div>

      <div className={`${styles.block} ${styles.snapSection}`}>
        <div className={styles.blockIndex}>02</div>
        <div className={styles.blockContent}>
          <div className={styles.tag}>goal</div>
          <h2 className={styles.sectionTitle}>ユーザーがデジタルデトックスを決断する</h2>
          <p className={styles.text}>SNS疲れを感じている若年層をターゲットに、自身のスマホ利用習慣を見直すきっかけとなるような没入感のあるWeb体験を設計する。</p>
        </div>
      </div>

      <div className={`${styles.block} ${styles.snapSection}`}>
        <div className={styles.blockIndex}>03</div>
        <div className={styles.blockContent}>
          <div className={styles.tag}>point</div>
          <p className={styles.text}>ユーザーが情報を深く読み取ることができる構造を目指しました。</p>
          <div className={styles.uiCards}>
             <div className={styles.uiCard}>
                <img 
                    src={`${import.meta.env.BASE_URL}contents/fomo02.png`} 
                    alt="UIの画像" 
                    className={styles.uiImage} 
                />
                <div className={styles.uiText}>
                  <h4>Hold to Dive</h4>
                  <p>ボタンを長押しすることで次のセクションへ深く潜っていくようなトランジションを実装。</p>
                </div>
             </div>
             <div className={styles.uiCard}>
                <img 
                    src={`${import.meta.env.BASE_URL}contents/fomo03.png`} 
                    alt="UIの画像" 
                    className={styles.uiImage} 
                />
                <div className={styles.uiText}>
                  <h4>Narrative Scroll</h4>
                  <p>スクロールに合わせてテキストが浮かび上がり、ストーリーを読み進める体験を強化。</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}