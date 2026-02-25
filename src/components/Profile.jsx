import { useNavigate } from 'react-router-dom';
import styles from './Profile.module.scss';

export default function Profile() {
  const navigate = useNavigate();

  return (
    <section className={styles.profileSection} onClick={() => navigate('/profile')} data-cursortext="TAP">
      <div className={styles.card}>
        
        {/* 左側の情報エリア */}
        <div className={styles.infoArea}>
          <h4 className={styles.section}>profile</h4>
          <p className={styles.kana}>イチハシ トウイ</p>
          <h2 className={styles.nameJa}>市橋 冬翔</h2>
          <p className={styles.email}>ichihashi.toui@gmail.com</p>

          <dl className={styles.details}>
            <dt>Birth</dt><dd>2004.12.22</dd>
            <dt>Location</dt><dd>Aichi, Japan</dd>
          </dl>

          <p className={styles.bio}>
            人の心に響くデザインを心がけています。
            平面でのデザインだけでなく、Blenderを
            使用した3DCGでのビジュアル表現にも積
            極的に取り組んでいます。
          </p>
        </div>

        {/* 右側の画像エリア */}
        <div className={styles.imageArea}>
          <img src={`${import.meta.env.BASE_URL}star.jpg`} alt="市橋 冬翔" />
        </div>
        
      </div>
    </section>
  );
}