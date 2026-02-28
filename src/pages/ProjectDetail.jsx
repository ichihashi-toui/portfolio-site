import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from './ProjectDetail.module.scss';

export default function ProjectDetail() {
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (id === 'cosme') {
    return (
      <div className={styles.pageWrapper}>
        <Link to="/contents" className={styles.backButton}>
          contents
        </Link>

        <section className={styles.fvSection}>
          <img 
            src={`${import.meta.env.BASE_URL}moc/cosme.png`} 
            alt="ブランドサイトリデザイン" 
            className={styles.fvImage} 
          />
          <div className={styles.fvInfo}>
            <div className={styles.category}>Web design 02</div>
            <h1 className={styles.title}>ブランドサイトリデザイン</h1>
            <div className={styles.meta}>
              <p>担当: ブランディング / Webデザイン / フロントエンド実装</p>
              <p>2025.11</p>
              <p>個人制作</p>
              <p>Figma / Blender / React / Sass</p>
            </div>
          </div>
        </section>

        <section className={styles.contentSection}>
          
          <div className={styles.block}>
            <div className={styles.blockIndex}>01</div>
            <div className={styles.blockContent}>
              <div className={styles.tag}>persona</div>
              <h2 className={styles.sectionTitle}>ターゲット層</h2>
              <p className={styles.text}>
                楽器屋でエフェクターを試奏するような、音作りにこだわるギタリスト。
              </p>
              
              <div className={styles.uiCard} style={{ marginTop: '30px', width: '100%' }}>
                <div className={styles.uiImage}></div>
                <div className={styles.uiText}>
                  <h4>バンドマン (20代)</h4>
                  <p>趣味: バンド活動、ライブ鑑賞</p>
                  <p>悩み: 自分の理想の音が作れない。種類が多くてどれを買えばいいか迷う。</p>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.block}>
            <div className={styles.blockIndex}>02</div>
            <div className={styles.blockContent}>
              <div className={styles.tag}>concept</div>
              <h2 className={styles.sectionTitle}>
                ブランドイメージが手に取るように伝わる直感的なサイト
              </h2>
              <p className={styles.text}>
                ポップで独創的なデザインと直感的な操作性を両立させ、ユーザーのワクワク感を高めるUI体験を提供する。
              </p>
            </div>
          </div>

          <div className={styles.block}>
            <div className={styles.blockIndex}>03</div>
            <div className={styles.blockContent}>
              <div className={styles.tag}>UI</div>
              <h2 className={styles.sectionTitle}>エフェクターの魅力を伝えるインタラクション</h2>
              
              <div className={styles.uiCards}>
                 <div className={styles.uiCard}>
                    <div className={styles.uiImage}></div>
                    <div className={styles.uiText}>
                      <h4>TAP A PEDAL</h4>
                      <p>スクロールやタップで実際のエフェクターを踏む感覚を味わえるアニメーションを実装。</p>
                    </div>
                 </div>
                 <div className={styles.uiCard}>
                    <div className={styles.uiImage}></div>
                    <div className={styles.uiText}>
                      <h4>3D Model Viewer</h4>
                      <p>BlenderでモデリングしたPlumesを配置し、細部のディテールまで自由に回転して確認可能に。</p>
                    </div>
                 </div>
              </div>
            </div>
          </div>

        </section>
      </div>
    );
  }


  if (id === 'syobo') {
    return (
      <div className={styles.pageWrapper}>
        <Link to="/contents" className={styles.backButton}>
          contents
        </Link>

        <section className={styles.fvSection}>
          <img 
            src={`${import.meta.env.BASE_URL}moc/syobo.png`} 
            alt="ブランドサイトリデザイン" 
            className={styles.fvImage} 
          />
          <div className={styles.fvInfo}>
            <div className={styles.category}>Web design 02</div>
            <h1 className={styles.title}>ブランドサイトリデザイン</h1>
            <div className={styles.meta}>
              <p>担当: ブランディング / Webデザイン / フロントエンド実装</p>
              <p>2025.11</p>
              <p>個人制作</p>
              <p>Figma / Blender / React / Sass</p>
            </div>
          </div>
        </section>

        <section className={styles.contentSection}>
          
          <div className={styles.block}>
            <div className={styles.blockIndex}>01</div>
            <div className={styles.blockContent}>
              <div className={styles.tag}>persona</div>
              <h2 className={styles.sectionTitle}>ターゲット層</h2>
              <p className={styles.text}>
                楽器屋でエフェクターを試奏するような、音作りにこだわるギタリスト。
              </p>
              
              <div className={styles.uiCard} style={{ marginTop: '30px', width: '100%' }}>
                <div className={styles.uiImage}></div>
                <div className={styles.uiText}>
                  <h4>バンドマン (20代)</h4>
                  <p>趣味: バンド活動、ライブ鑑賞</p>
                  <p>悩み: 自分の理想の音が作れない。種類が多くてどれを買えばいいか迷う。</p>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.block}>
            <div className={styles.blockIndex}>02</div>
            <div className={styles.blockContent}>
              <div className={styles.tag}>concept</div>
              <h2 className={styles.sectionTitle}>
                ブランドイメージが手に取るように伝わる直感的なサイト
              </h2>
              <p className={styles.text}>
                ポップで独創的なデザインと直感的な操作性を両立させ、ユーザーのワクワク感を高めるUI体験を提供する。
              </p>
            </div>
          </div>

          <div className={styles.block}>
            <div className={styles.blockIndex}>03</div>
            <div className={styles.blockContent}>
              <div className={styles.tag}>UI</div>
              <h2 className={styles.sectionTitle}>エフェクターの魅力を伝えるインタラクション</h2>
              
              <div className={styles.uiCards}>
                 <div className={styles.uiCard}>
                    <div className={styles.uiImage}></div>
                    <div className={styles.uiText}>
                      <h4>TAP A PEDAL</h4>
                      <p>スクロールやタップで実際のエフェクターを踏む感覚を味わえるアニメーションを実装。</p>
                    </div>
                 </div>
                 <div className={styles.uiCard}>
                    <div className={styles.uiImage}></div>
                    <div className={styles.uiText}>
                      <h4>3D Model Viewer</h4>
                      <p>BlenderでモデリングしたPlumesを配置し、細部のディテールまで自由に回転して確認可能に。</p>
                    </div>
                 </div>
              </div>
            </div>
          </div>

        </section>
      </div>
    );
  }

  if (id === 'me') {
    return (
      <div className={styles.pageWrapper}>
        <Link to="/contents" className={styles.backButton}>
          contents
        </Link>

        <section className={styles.fvSection}>
          <img 
            src={`${import.meta.env.BASE_URL}moc/me.png`} 
            alt="ブランドサイトリデザイン" 
            className={styles.fvImage} 
          />
          <div className={styles.fvInfo}>
            <div className={styles.category}>Web design 02</div>
            <h1 className={styles.title}>ブランドサイトリデザイン</h1>
            <div className={styles.meta}>
              <p>担当: ブランディング / Webデザイン / フロントエンド実装</p>
              <p>2025.11</p>
              <p>個人制作</p>
              <p>Figma / Blender / React / Sass</p>
            </div>
          </div>
        </section>

        <section className={styles.contentSection}>
          
          <div className={styles.block}>
            <div className={styles.blockIndex}>01</div>
            <div className={styles.blockContent}>
              <div className={styles.tag}>persona</div>
              <h2 className={styles.sectionTitle}>ターゲット層</h2>
              <p className={styles.text}>
                楽器屋でエフェクターを試奏するような、音作りにこだわるギタリスト。
              </p>
              
              <div className={styles.uiCard} style={{ marginTop: '30px', width: '100%' }}>
                <div className={styles.uiImage}></div>
                <div className={styles.uiText}>
                  <h4>バンドマン (20代)</h4>
                  <p>趣味: バンド活動、ライブ鑑賞</p>
                  <p>悩み: 自分の理想の音が作れない。種類が多くてどれを買えばいいか迷う。</p>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.block}>
            <div className={styles.blockIndex}>02</div>
            <div className={styles.blockContent}>
              <div className={styles.tag}>concept</div>
              <h2 className={styles.sectionTitle}>
                ブランドイメージが手に取るように伝わる直感的なサイト
              </h2>
              <p className={styles.text}>
                ポップで独創的なデザインと直感的な操作性を両立させ、ユーザーのワクワク感を高めるUI体験を提供する。
              </p>
            </div>
          </div>

          <div className={styles.block}>
            <div className={styles.blockIndex}>03</div>
            <div className={styles.blockContent}>
              <div className={styles.tag}>UI</div>
              <h2 className={styles.sectionTitle}>エフェクターの魅力を伝えるインタラクション</h2>
              
              <div className={styles.uiCards}>
                 <div className={styles.uiCard}>
                    <div className={styles.uiImage}></div>
                    <div className={styles.uiText}>
                      <h4>TAP A PEDAL</h4>
                      <p>スクロールやタップで実際のエフェクターを踏む感覚を味わえるアニメーションを実装。</p>
                    </div>
                 </div>
                 <div className={styles.uiCard}>
                    <div className={styles.uiImage}></div>
                    <div className={styles.uiText}>
                      <h4>3D Model Viewer</h4>
                      <p>BlenderでモデリングしたPlumesを配置し、細部のディテールまで自由に回転して確認可能に。</p>
                    </div>
                 </div>
              </div>
            </div>
          </div>

        </section>
      </div>
    );
  }

  if (id === 'typo') {
    return (
      <div className={styles.pageWrapper}>
        <Link to="/contents" className={styles.backButton}>
          contents
        </Link>

        <section className={styles.fvSection}>
          <img 
            src={`${import.meta.env.BASE_URL}moc/typo.png`} 
            alt="ブランドサイトリデザイン" 
            className={styles.fvImage} 
          />
          <div className={styles.fvInfo}>
            <div className={styles.category}>Web design 02</div>
            <h1 className={styles.title}>ブランドサイトリデザイン</h1>
            <div className={styles.meta}>
              <p>担当: ブランディング / Webデザイン / フロントエンド実装</p>
              <p>2025.11</p>
              <p>個人制作</p>
              <p>Figma / Blender / React / Sass</p>
            </div>
          </div>
        </section>

        <section className={styles.contentSection}>
          
          <div className={styles.block}>
            <div className={styles.blockIndex}>01</div>
            <div className={styles.blockContent}>
              <div className={styles.tag}>persona</div>
              <h2 className={styles.sectionTitle}>ターゲット層</h2>
              <p className={styles.text}>
                楽器屋でエフェクターを試奏するような、音作りにこだわるギタリスト。
              </p>
              
              <div className={styles.uiCard} style={{ marginTop: '30px', width: '100%' }}>
                <div className={styles.uiImage}></div>
                <div className={styles.uiText}>
                  <h4>バンドマン (20代)</h4>
                  <p>趣味: バンド活動、ライブ鑑賞</p>
                  <p>悩み: 自分の理想の音が作れない。種類が多くてどれを買えばいいか迷う。</p>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.block}>
            <div className={styles.blockIndex}>02</div>
            <div className={styles.blockContent}>
              <div className={styles.tag}>concept</div>
              <h2 className={styles.sectionTitle}>
                ブランドイメージが手に取るように伝わる直感的なサイト
              </h2>
              <p className={styles.text}>
                ポップで独創的なデザインと直感的な操作性を両立させ、ユーザーのワクワク感を高めるUI体験を提供する。
              </p>
            </div>
          </div>

          <div className={styles.block}>
            <div className={styles.blockIndex}>03</div>
            <div className={styles.blockContent}>
              <div className={styles.tag}>UI</div>
              <h2 className={styles.sectionTitle}>エフェクターの魅力を伝えるインタラクション</h2>
              
              <div className={styles.uiCards}>
                 <div className={styles.uiCard}>
                    <div className={styles.uiImage}></div>
                    <div className={styles.uiText}>
                      <h4>TAP A PEDAL</h4>
                      <p>スクロールやタップで実際のエフェクターを踏む感覚を味わえるアニメーションを実装。</p>
                    </div>
                 </div>
                 <div className={styles.uiCard}>
                    <div className={styles.uiImage}></div>
                    <div className={styles.uiText}>
                      <h4>3D Model Viewer</h4>
                      <p>BlenderでモデリングしたPlumesを配置し、細部のディテールまで自由に回転して確認可能に。</p>
                    </div>
                 </div>
              </div>
            </div>
          </div>

        </section>
      </div>
    );
  }

  if (id === 'fukuda') {
    return (
      <div className={styles.pageWrapper}>
        <Link to="/contents" className={styles.backButton}>
          contents
        </Link>

        <section className={styles.fvSection}>
          <img 
            src={`${import.meta.env.BASE_URL}moc/fukuda.png`} 
            alt="ブランドサイトリデザイン" 
            className={styles.fvImage} 
          />
          <div className={styles.fvInfo}>
            <div className={styles.category}>Web design 02</div>
            <h1 className={styles.title}>ブランドサイトリデザイン</h1>
            <div className={styles.meta}>
              <p>担当: ブランディング / Webデザイン / フロントエンド実装</p>
              <p>2025.11</p>
              <p>個人制作</p>
              <p>Figma / Blender / React / Sass</p>
            </div>
          </div>
        </section>

        <section className={styles.contentSection}>
          
          <div className={styles.block}>
            <div className={styles.blockIndex}>01</div>
            <div className={styles.blockContent}>
              <div className={styles.tag}>persona</div>
              <h2 className={styles.sectionTitle}>ターゲット層</h2>
              <p className={styles.text}>
                楽器屋でエフェクターを試奏するような、音作りにこだわるギタリスト。
              </p>
              
              <div className={styles.uiCard} style={{ marginTop: '30px', width: '100%' }}>
                <div className={styles.uiImage}></div>
                <div className={styles.uiText}>
                  <h4>バンドマン (20代)</h4>
                  <p>趣味: バンド活動、ライブ鑑賞</p>
                  <p>悩み: 自分の理想の音が作れない。種類が多くてどれを買えばいいか迷う。</p>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.block}>
            <div className={styles.blockIndex}>02</div>
            <div className={styles.blockContent}>
              <div className={styles.tag}>concept</div>
              <h2 className={styles.sectionTitle}>
                ブランドイメージが手に取るように伝わる直感的なサイト
              </h2>
              <p className={styles.text}>
                ポップで独創的なデザインと直感的な操作性を両立させ、ユーザーのワクワク感を高めるUI体験を提供する。
              </p>
            </div>
          </div>

          <div className={styles.block}>
            <div className={styles.blockIndex}>03</div>
            <div className={styles.blockContent}>
              <div className={styles.tag}>UI</div>
              <h2 className={styles.sectionTitle}>エフェクターの魅力を伝えるインタラクション</h2>
              
              <div className={styles.uiCards}>
                 <div className={styles.uiCard}>
                    <div className={styles.uiImage}></div>
                    <div className={styles.uiText}>
                      <h4>TAP A PEDAL</h4>
                      <p>スクロールやタップで実際のエフェクターを踏む感覚を味わえるアニメーションを実装。</p>
                    </div>
                 </div>
                 <div className={styles.uiCard}>
                    <div className={styles.uiImage}></div>
                    <div className={styles.uiText}>
                      <h4>3D Model Viewer</h4>
                      <p>BlenderでモデリングしたPlumesを配置し、細部のディテールまで自由に回転して確認可能に。</p>
                    </div>
                 </div>
              </div>
            </div>
          </div>

        </section>
      </div>
    );
  }

  if (id === 'inter') {
    return (
      <div className={styles.pageWrapper}>
        <Link to="/contents" className={styles.backButton}>
          contents
        </Link>

        <section className={styles.fvSection}>
          <img 
            src={`${import.meta.env.BASE_URL}moc/inter.png`} 
            alt="ブランドサイトリデザイン" 
            className={styles.fvImage} 
          />
          <div className={styles.fvInfo}>
            <div className={styles.category}>Web design 02</div>
            <h1 className={styles.title}>ブランドサイトリデザイン</h1>
            <div className={styles.meta}>
              <p>担当: ブランディング / Webデザイン / フロントエンド実装</p>
              <p>2025.11</p>
              <p>個人制作</p>
              <p>Figma / Blender / React / Sass</p>
            </div>
          </div>
        </section>

        <section className={styles.contentSection}>
          
          <div className={styles.block}>
            <div className={styles.blockIndex}>01</div>
            <div className={styles.blockContent}>
              <div className={styles.tag}>persona</div>
              <h2 className={styles.sectionTitle}>ターゲット層</h2>
              <p className={styles.text}>
                楽器屋でエフェクターを試奏するような、音作りにこだわるギタリスト。
              </p>
              
              <div className={styles.uiCard} style={{ marginTop: '30px', width: '100%' }}>
                <div className={styles.uiImage}></div>
                <div className={styles.uiText}>
                  <h4>バンドマン (20代)</h4>
                  <p>趣味: バンド活動、ライブ鑑賞</p>
                  <p>悩み: 自分の理想の音が作れない。種類が多くてどれを買えばいいか迷う。</p>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.block}>
            <div className={styles.blockIndex}>02</div>
            <div className={styles.blockContent}>
              <div className={styles.tag}>concept</div>
              <h2 className={styles.sectionTitle}>
                ブランドイメージが手に取るように伝わる直感的なサイト
              </h2>
              <p className={styles.text}>
                ポップで独創的なデザインと直感的な操作性を両立させ、ユーザーのワクワク感を高めるUI体験を提供する。
              </p>
            </div>
          </div>

          <div className={styles.block}>
            <div className={styles.blockIndex}>03</div>
            <div className={styles.blockContent}>
              <div className={styles.tag}>UI</div>
              <h2 className={styles.sectionTitle}>エフェクターの魅力を伝えるインタラクション</h2>
              
              <div className={styles.uiCards}>
                 <div className={styles.uiCard}>
                    <div className={styles.uiImage}></div>
                    <div className={styles.uiText}>
                      <h4>TAP A PEDAL</h4>
                      <p>スクロールやタップで実際のエフェクターを踏む感覚を味わえるアニメーションを実装。</p>
                    </div>
                 </div>
                 <div className={styles.uiCard}>
                    <div className={styles.uiImage}></div>
                    <div className={styles.uiText}>
                      <h4>3D Model Viewer</h4>
                      <p>BlenderでモデリングしたPlumesを配置し、細部のディテールまで自由に回転して確認可能に。</p>
                    </div>
                 </div>
              </div>
            </div>
          </div>

        </section>
      </div>
    );
  }

  if (id === 'eqd') {
    return (
      <div className={styles.pageWrapper}>
        <Link to="/contents" className={styles.backButton}>
          contents
        </Link>

        <section className={styles.fvSection}>
          <img 
            src={`${import.meta.env.BASE_URL}moc/eqd.png`} 
            alt="ブランドサイトリデザイン" 
            className={styles.fvImage} 
          />
          <div className={styles.fvInfo}>
            <div className={styles.category}>Web design 02</div>
            <h1 className={styles.title}>ブランドサイトリデザイン</h1>
            <div className={styles.meta}>
              <p>担当: ブランディング / Webデザイン / フロントエンド実装</p>
              <p>2025.11</p>
              <p>個人制作</p>
              <p>Figma / Blender / React / Sass</p>
            </div>
          </div>
        </section>

        <section className={styles.contentSection}>
          
          <div className={styles.block}>
            <div className={styles.blockIndex}>01</div>
            <div className={styles.blockContent}>
              <div className={styles.tag}>persona</div>
              <h2 className={styles.sectionTitle}>ターゲット層</h2>
              <p className={styles.text}>
                楽器屋でエフェクターを試奏するような、音作りにこだわるギタリスト。
              </p>
              
              <div className={styles.uiCard} style={{ marginTop: '30px', width: '100%' }}>
                <div className={styles.uiImage}></div>
                <div className={styles.uiText}>
                  <h4>バンドマン (20代)</h4>
                  <p>趣味: バンド活動、ライブ鑑賞</p>
                  <p>悩み: 自分の理想の音が作れない。種類が多くてどれを買えばいいか迷う。</p>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.block}>
            <div className={styles.blockIndex}>02</div>
            <div className={styles.blockContent}>
              <div className={styles.tag}>concept</div>
              <h2 className={styles.sectionTitle}>
                ブランドイメージが手に取るように伝わる直感的なサイト
              </h2>
              <p className={styles.text}>
                ポップで独創的なデザインと直感的な操作性を両立させ、ユーザーのワクワク感を高めるUI体験を提供する。
              </p>
            </div>
          </div>

          <div className={styles.block}>
            <div className={styles.blockIndex}>03</div>
            <div className={styles.blockContent}>
              <div className={styles.tag}>UI</div>
              <h2 className={styles.sectionTitle}>エフェクターの魅力を伝えるインタラクション</h2>
              
              <div className={styles.uiCards}>
                 <div className={styles.uiCard}>
                    <div className={styles.uiImage}></div>
                    <div className={styles.uiText}>
                      <h4>TAP A PEDAL</h4>
                      <p>スクロールやタップで実際のエフェクターを踏む感覚を味わえるアニメーションを実装。</p>
                    </div>
                 </div>
                 <div className={styles.uiCard}>
                    <div className={styles.uiImage}></div>
                    <div className={styles.uiText}>
                      <h4>3D Model Viewer</h4>
                      <p>BlenderでモデリングしたPlumesを配置し、細部のディテールまで自由に回転して確認可能に。</p>
                    </div>
                 </div>
              </div>
            </div>
          </div>

        </section>
      </div>
    );
  }

  return (
    <div className={styles.pageWrapper}>
      <Link to="/contents" className={styles.backButton}>
        contents
      </Link>

      <section className={styles.fvSection}>
        <img 
          src={`${import.meta.env.BASE_URL}moc/fomo.png`} 
          alt="FOMO啓発サイト" 
          className={styles.fvImage} 
        />
        <div className={styles.fvInfo}>
          <div className={styles.category}>Web design 01</div>
          <h1 className={styles.title}>FOMO啓発サイト</h1>
          <div className={styles.meta}>
            <p>担当: 企画・デザイン・実装</p>
            <p>2026.02</p>
            <p>個人制作</p>
            <p>Figma / HTML / CSS / JavaScript</p>
          </div>
        </div>
      </section>

      <section className={styles.contentSection}>
        
        <div className={styles.block}>
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

        <div className={styles.block}>
          <div className={styles.blockIndex}>02</div>
          <div className={styles.blockContent}>
            <div className={styles.tag}>goal</div>
            <h2 className={styles.sectionTitle}>
              FOMOを理解してもらい、ユーザーのデジタルデトックスの足がかりとなる。
            </h2>
            <p className={styles.text}>
              SNS疲れを感じている若年層をターゲットに、自身のスマホ利用習慣を見直すきっかけとなるような没入感のあるWeb体験を設計する。
            </p>
          </div>
        </div>

        <div className={styles.block}>
          <div className={styles.blockIndex}>03</div>
          <div className={styles.blockContent}>
            <div className={styles.tag}>UI</div>
            <h2 className={styles.sectionTitle}>没入感を高める長押しの採用。</h2>
            <p className={styles.text}>
              単なるクリックではなく、時間をかけて押し込む動作により、ユーザーの意識を画面に集中させる。
            </p>
            <div className={styles.uiCards}>
               <div className={styles.uiCard}>
                  <div className={styles.uiImage}></div>
                  <div className={styles.uiText}>
                    <h4>Hold to Dive</h4>
                    <p>ボタンを長押しすることで次のセクションへ深く潜っていくようなトランジションを実装。</p>
                  </div>
               </div>
               <div className={styles.uiCard}>
                  <div className={styles.uiImage}></div>
                  <div className={styles.uiText}>
                    <h4>Narrative Scroll</h4>
                    <p>スクロールに合わせてテキストが浮かび上がり、ストーリーを読み進める体験を強化。</p>
                  </div>
               </div>
            </div>
          </div>
        </div>

      </section>
    </div>
  );
}