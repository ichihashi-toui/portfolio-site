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
          <div className={styles.tag}>target</div>
          <h2 className={styles.sectionTitle}>20~30代の男性</h2>
          <p className={styles.text}>
            他とは違う自分の音を追求したい層。SNSでのインフルエンサーのレビューが購入につながる。
          </p>
        </div>
      </div>

      <div className={`${styles.block} ${styles.snapSection}`}>
        <div className={styles.blockIndex}>02</div>
        <div className={styles.blockContent}>
          <div className={styles.tag}>persona</div>

        
          <div className={styles.uiCards}>
            <div className={styles.uiCard}>
              <img 
                src={`${import.meta.env.BASE_URL}contents/fomo02.png`} 
                alt="UIの画像" 
                className={styles.uiImage} 
              />
              <div className={styles.uiText}>
                <h4>高橋 健太</h4>
                <p>26歳 IT系エンジニア 一人暮らし</p>
                <p>内向的で大人数よりも気の合う少人数の仲間といることを好む。<br/>
                    一度ハマると、とことん突き詰めないと気が済まない。<br/>
                    自分が使うものにこだわりがあり、機能性とデザインを両立したものを選ぶ。</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`${styles.block} ${styles.snapSection}`}>
        <div className={styles.blockIndex}>03</div>
        <div className={styles.blockContent}>
          <div className={styles.tag}>CONCEPT</div>
          <h2 className={styles.sectionTitle}>ブランドイメージが手に取るように分かる体験型のサイト</h2>
          <p className={styles.text}>
            EQDのもつ個性的な音のイメージを視覚的に表現し、購買意欲を高める。
          </p>
        </div>
      </div>

      <div className={`${styles.block} ${styles.snapSection}`}>
        <div className={styles.blockIndex}>04</div>
        <div className={styles.blockContent}>
          <div className={styles.tag}>point</div>
          <h2 className={styles.sectionTitle}>体験を重視した構造</h2>
          
          <div className={styles.uiCards}>
            <div className={styles.uiCard}>
              <div className={styles.uiImage}></div>
              <div className={styles.uiText}>
                <h4>触れるファーストビュー</h4>
                <p>製品ごとに異なるデモ音源を再生する情報パネルを展開。視覚的な面白さだけでなく、製品理解への導線として機能させました。</p>
              </div>
            </div>
            <div className={styles.uiCard}>
              <div className={styles.uiImage}></div>
              <div className={styles.uiText}>
                <h4>GSAPによるスクロール</h4>
                <p>特定セクションでは、スクロール量に応じて画像がコマ送りで切り替わる連番アニメーションを実装しました。</p>
              </div>
            </div>
            <div className={styles.uiCard}>
              <div className={styles.uiImage}></div>
              <div className={styles.uiText}>
                <h4>カルーセルスライダー</h4>
                <p>多数のアーティスト情報を効率的に見せるため、Swiper.jsを採用し、デバイスごとに最適な操作感を提供しました。</p>
              </div>
            </div>
            <div className={styles.uiCard}>
              <div className={styles.uiImage}></div>
              <div className={styles.uiText}>
                <h4>GSAPによる背景遷移</h4>
                <p>違和感なく背景色を変えることで、飽きないような設計をしました。</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}