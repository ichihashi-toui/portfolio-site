import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // 1. ページ移動時にスクロール位置を一番上に戻す
    window.scrollTo(0, 0);

    // 2. ページ移動時に、強制的にスクロールロック（画面固定）を解除する
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
  }, [pathname]);

  return null;
}