import { Link } from 'react-router-dom';
import styles from './Contents.module.scss';

const projects = [
  { id: 'fomo', cat: 'Web design', title: 'FOMO啓発サイト', stack: 'Figma / HTML / CSS / JavaScript' },
  { id: 'redesign', cat: 'Web design', title: 'ブランドサイト リデザイン', stack: 'Figma / Blender / React / Sass' },
  { id: 'mens-cosme', cat: 'Web design', title: 'メンズ美容ブランド', stack: 'Illustrator/ Figma / Blender / HTML/ CSS /JavaScript' },
  { id: 'corporate', cat: 'Web design', title: 'コーポレートサイト改修', stack: 'Figma / Blender / After Effects / HTML / CSS / JavaScript' },
  { id: 'poster', cat: 'graphic design', title: '展示会リーフレット', stack: 'Illustrator / Photoshop / Blender' },
  { id: 'poster', cat: 'graphic design', title: 'タイポグラフィアートワーク', stack: 'Illustrator / Photoshop' },
  { id: 'poster', cat: 'graphic design', title: '自己表現コラージュ', stack: 'Illustrator / Photoshop / Blender' },
  { id: 'poster', cat: 'graphic design', title: '危険物事故防止ポスター', stack: 'Illustrator / Photoshop / Blender' },
];

export default function Contents() {
  return (
    <section className={styles.contentsSection}>
      <div className={styles.leftArea}>
        <Link to="/contents" className={styles.sectionTitle}data-cursortext="TAP">contents</Link>
      </div>

      <div className={styles.rightArea}>
        {projects.map((project) => (
          <Link to={`/contents/${project.id}`} key={project.id} className={styles.projectItem}data-cursortext="TAP">
            <div className={styles.projectInfo}>
              <p className={styles.projectMeta}>{project.cat}</p>
              <h3 className={styles.projectTitle}>{project.title}</h3>
              <p className={styles.projectMeta}>{project.stack}</p>
            </div>
            
            <img 
              src={`${import.meta.env.BASE_URL}placeholder.jpg`} 
              alt={project.title} 
              className={styles.mockup} 
            />
          </Link>
        ))}
      </div>
    </section>
  );
}