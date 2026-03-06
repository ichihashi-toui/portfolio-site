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
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>FOMO (fear of missing out)</h3>
            <p>取り残されることへの恐れ。SNSの普及により、常に他人の動向を気にしてしまう現代の心理状態。</p>
          </div>
          <div className={styles.arrowDown}>↓</div>
          <div className={styles.card}>
            <div className={styles.tag}>concept</div>
            <p>無意識なスマホ依存を自覚し、内省する。</p>
            <p className={styles.subText}>デジタルデトックスのきっかけを提供し、情報との適切な距離感を考える。</p>
          </div>
          <div className={styles.arrowDown}>↓</div>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>JOMO (joy of missing out)</h3>
            <p>情報から距離を置く喜び。自分自身の時間に集中し、オフラインの価値を再発見する。</p>
          </div>
        </div>
      </div>

      <div className={`${styles.block} ${styles.snapSection}`}>
        <div className={styles.blockIndex}>02</div>
        <div className={styles.blockContent}>
          <div className={styles.tag}>goal</div>
          <h2 className={styles.sectionTitle}>FOMOを理解してもらい、ユーザーのデジタルデトックスの足がかりとなる。</h2>
          <p className={styles.text}>SNS疲れを感じている若年層をターゲットに、自身のスマホ利用習慣を見直すきっかけとなるような没入感のあるWeb体験を設計する。</p>
        </div>
      </div>

      <div className={`${styles.block} ${styles.snapSection}`}>
        <div className={styles.blockIndex}>03</div>
        <div className={styles.blockContent}>
          <div className={styles.tag}>UI</div>
          <h2 className={styles.sectionTitle}>没入感を高める長押しの採用。</h2>
          <p className={styles.text}>単なるクリックではなく、時間をかけて押し込む動作により、ユーザーの意識を画面に集中させる。</p>
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