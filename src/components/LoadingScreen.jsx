import { useProgress } from '@react-three/drei';
import styles from './LoadingScreen.module.scss';

export default function LoadingScreen() {
  // useProgressで3Dモデルや画像の読み込み状況を取得
  const { progress, active } = useProgress();

  // 読み込みが完了（activeがfalse）したら何も表示しない
  if (!active) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <div className={styles.glitchBox}>
          <h1 className={styles.title}>CONNECTING...</h1>
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill} 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className={styles.percent}>{Math.round(progress)}%</p>
        </div>
        <div className={styles.status}>
          <span>SIGNAL: WEAK</span>
          <span>MODE: ANALOG</span>
        </div>
      </div>
    </div>
  );
}