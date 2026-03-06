import { Link } from 'react-router-dom';
import styles from './Contents.module.scss';

// idを詳細ページのスラッグと統一し、imgプロパティを追加しました
const projects = [
  { id: 'fomo', cat: 'Web design', title: 'FOMO啓発サイト', stack: 'Figma / HTML / CSS / JavaScript', img: 'moc/fomo.png' },
  { id: 'eqd', cat: 'Web design', title: 'ブランドサイト リデザイン', stack: 'Figma / Blender / React / Sass', img: 'moc/eqd.png' },
  { id: 'cosme', cat: 'Web design', title: 'メンズ美容ブランド', stack: 'Illustrator/ Figma / Blender / HTML/ CSS /JavaScript', img: 'moc/cosme.png' },
  { id: 'inter', cat: 'Web design', title: 'コーポレートサイト改修', stack: 'Figma / Blender / After Effects / HTML / CSS / JavaScript', img: 'moc/inter.png' },
  { id: 'fukuda', cat: 'graphic design', title: '展示会リーフレット', stack: 'Illustrator / Photoshop / Blender', img: 'moc/fukuda.png' },
  { id: 'typo', cat: 'graphic design', title: 'タイポグラフィアートワーク', stack: 'Illustrator / Photoshop', img: 'moc/typo.png' },
  { id: 'me', cat: 'graphic design', title: '自己表現コラージュ', stack: 'Illustrator / Photoshop / Blender', img: 'moc/me.png' },
  { id: 'syobo', cat: 'graphic design', title: '危険物事故防止ポスター', stack: 'Illustrator / Photoshop / Blender', img: 'moc/syobo.png' },
];

export default function Contents() {
  return (
    <section className={styles.contentsSection}>
      <div className={styles.leftArea}>
        <Link to="/contents" className={styles.sectionTitle} data-cursortext="TAP">contents</Link>
      </div>

      <div className={styles.rightArea}>
        {projects.map((project) => (
          <Link to={`/contents/${project.id}`} key={project.id} className={styles.projectItem} data-cursortext="TAP">
            <div className={styles.projectInfo}>
              <p className={styles.projectMeta}>{project.cat}</p>
              <h3 className={styles.projectTitle}>{project.title}</h3>
              <p className={styles.projectMeta}>{project.stack}</p>
            </div>
            
            <img 
              src={`${import.meta.env.BASE_URL}${project.img}`} 
              alt={project.title} 
              className={styles.mockup} 
            />
          </Link>
        ))}
      </div>
    </section>
  );
}