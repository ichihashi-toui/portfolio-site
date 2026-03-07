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
                <div className={styles.tag}>target</div>
                <h2 className={styles.sectionTitle}>20代前半の男性</h2>
                <p className={styles.text}>
                  美容に関心はあるが、何から始めれば良いか分からない。
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
                      <h4>佐藤 蓮</h4>
                      <p>21歳 法学部大学生 東京都内で一人暮らし</p>
                      <p>公務員試験での合格を目指している。<br/>
                        バラエティ番組を視聴するのが趣味。<br/>
                        InstagramやTikTokを情報源にしている。</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
      
            <div className={`${styles.block} ${styles.snapSection}`}>
              <div className={styles.blockIndex}>03</div>
              <div className={styles.blockContent}>
                <div className={styles.tag}>Concept</div>
                <h2 className={styles.sectionTitle}>暮らしと肌を整える</h2>
                <p className={styles.text}>
                  機能美を追求し、ユーザーに信頼感と清潔感を与えるデザイン。
                </p>
              </div>
            </div>

            <div className={`${styles.block} ${styles.snapSection}`}>
              <div className={styles.blockIndex}>04</div>
              <div className={styles.blockContent}>
                <div className={styles.tag}>persona</div>
                <h2 className={styles.sectionTitle}>Clean Tone</h2>
                <p className={styles.text}>
                  安価で美容初心者から中級者向けの価格帯で、セット販売により美容初心者の顧客獲得を目指す。
                </p>
      
              
                <div className={styles.uiCards}>
                  <div className={styles.uiCard}>
                    <img 
                      src={`${import.meta.env.BASE_URL}contents/fomo02.png`} 
                      alt="UIの画像" 
                      className={styles.uiImage} 
                    />
                    <div className={styles.uiText}>
                      <h4>ロゴデザイン</h4>
                      <p>モチーフは「C」「T」と調律に使用する機械の「チューナー」をモチーフに制作。</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
      
            <div className={`${styles.block} ${styles.snapSection}`}>
              <div className={styles.blockIndex}>05</div>
              <div className={styles.blockContent}>
                <div className={styles.tag}>other</div>
                <h2 className={styles.sectionTitle}>他に制作したもの</h2>
                
                <div className={styles.uiCards}>
                  <div className={styles.uiCard}>
                    <div className={styles.uiImage}></div>
                    <div className={styles.uiText}>
                      <h4>パッケージ</h4>
                      <p>商品展開は化粧水、乳液、ヘアワックス、ヘアスプレーの4種類。インテリアの一部になるような機能的な美しさを目指しました。</p>
                    </div>
                  </div>
                  <div className={styles.uiCard}>
                    <div className={styles.uiImage}></div>
                    <div className={styles.uiText}>
                      <h4>ショップカード</h4>
                      <p>オンラインサイトへの導入を促す目的で制作しました。</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
  );
}