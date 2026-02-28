import { useEffect, useState, useRef } from 'react';
import styles from './CustomCursor.module.scss';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const positionRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 }); // 実際の座標
  const currentPosRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 }); // カーソルの座標
  const [text, setText] = useState('');

  useEffect(() => {
    // マウスの座標を更新
    const onMouseMove = (e) => {
      positionRef.current = { x: e.clientX, y: e.clientY };
    };

    // 要素にホバーした際にテキストを取得（通常のHTML用）
    const onMouseOver = (e) => {
      // data-cursortext属性を持つ一番近い親要素を探す
      const target = e.target.closest('[data-cursortext]');
      if (target) {
        setText(target.getAttribute('data-cursortext'));
      } else {
        setText('');
      }
    };

    // ★追加：3D空間（Canvas）からの強制テキスト変更指示を受け取る
    const onCustomUpdate = (e) => {
      setText(e.detail);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);
    window.addEventListener('updateCursorText', onCustomUpdate); // ★追加

    // アニメーションループで滑らかな遅延追従（リキッド感）を実現
    let animationFrameId;
    const render = () => {
      // 0.15の数値を小さくするとより遅れてヌルッと動き、大きくするとキビキビ動きます
      currentPosRef.current.x += (positionRef.current.x - currentPosRef.current.x) * 0.15;
      currentPosRef.current.y += (positionRef.current.y - currentPosRef.current.y) * 0.15;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${currentPosRef.current.x}px, ${currentPosRef.current.y}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      window.removeEventListener('updateCursorText', onCustomUpdate); // ★追加
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={`${styles.cursor} ${text ? styles.active : ''}`}
    >
      <span className={styles.text}>{text}</span>
    </div>
  );
}