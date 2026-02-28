import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import styles from './Profile.module.scss';

export default function Profile() {
  const profileData = {
    nameEn: "ICHIHASHI TOUI",
    nameJa: "市橋 冬翔",
    role: "Graphic / Web Designer",
    birth: "2004.12.22",
    location: "Aichi, Japan",
    email: "ichihashi.toui@gmail.com",
    bio: `初めまして。市橋冬翔と申します。目標に向かって着実に歩みを進めることを大切にしています。\n学生生活では、Webデザインやグラフィックデザインといった平面でのデザインだけでなく、Blenderを使用した3DCGでのビジュアル表現にも積極的に取り組んでいます。\nプライベートでは、バンドでベースを弾くことや音楽鑑賞、スポーツ観戦を楽しんでいます。特に毛皮のマリーズやDAVID BOWIEなど、ジャンルに縛られず表現するアーティストの姿勢が、クリエイティブな発想の刺激になっています。`,
    skills: [
      { category: "Design", items: ["Illustrator", "Photoshop", "Indesign", "Lightroom", "Figma"] },
      { category: "3D / Motion", items: ["Blender", "After Effects"] },
      { category: "Development", items: ["HTML / CSS", "JavaScript", "React", "Three.js (R3F)", "VS Code"] },
    ],
    history: [
      { year: "2023.03", title: "愛知県立丹羽高校卒業" },
      { year: "2023.04", title: "HAL名古屋グラフィック専攻入学" },
      { year: "2025.10", title: "株式会社ITアドバイザーインターンシップ", desc: "1ヶ月間、Webサイトリニューアルプロジェクトに参加。リーダーとして進行管理を担当。" },
      { year: "2026.現在", title: "在学中", desc: "" },
    ]
  };

  return (
    <>
      <h2 className={styles.pageTitle}>profile</h2>

      <motion.div 
        className={styles.container}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* 1. HERO AREA */}
        <div className={styles.heroArea}>
          <motion.div
            className={styles.heroImageWrapper}
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "backOut" }}
          >
            {/* ★ご自身の画像パスに合わせて適宜変更してください */}
            <img src={`${import.meta.env.BASE_URL}ichihashi-1.png`} alt="Profile" className={styles.heroImage} />
          </motion.div>

          <div className={styles.heroText}>
            <p className={styles.role}>{profileData.role}</p>
            <h1 className={styles.nameEn}>
              {profileData.nameEn.split(' ').map((word, i) => (
                <span key={i}>{word}</span>
              ))}
            </h1>
            <p className={styles.nameJa}>{profileData.nameJa}</p>
          </div>
        </div>

        {/* 2. BASIC INFO */}
        <section className={styles.section}>
          <div className={styles.label}>Information</div>
          <div className={styles.content}>
            <div className={styles.infoGrid}>
              <strong>Birth</strong> <span>{profileData.birth}</span>
              <strong>Location</strong> <span>{profileData.location}</span>
              <strong>Contact</strong> <span>{profileData.email}</span>
            </div>
          </div>
        </section>

        {/* 3. BIOGRAPHY */}
        <section className={styles.section}>
          <div className={styles.label}>Biography</div>
          <div className={styles.content}>
            <p className={styles.bio}>{profileData.bio}</p>
          </div>
        </section>

        {/* 4. SKILLS */}
        <section className={styles.section}>
          <div className={styles.label}>Skills & Tools</div>
          <div className={styles.content}>
            {profileData.skills.map((skill, index) => (
              <div key={index} className={styles.skillBlock}>
                <h4>{skill.category}</h4>
                <p>{skill.items.join(" / ")}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 5. HISTORY */}
        <section className={styles.section}>
          <div className={styles.label}>History</div>
          <div className={styles.content}>
            {profileData.history.map((item, index) => (
              <div key={index} className={styles.historyBlock}>
                <div className={styles.historyYear}>{item.year}</div>
                <div>
                  <h4>{item.title}</h4>
                  {item.desc && <p>{item.desc}</p>}
                </div>
              </div>
            ))}
          </div>
        </section>
      </motion.div>
    </>
  );
}