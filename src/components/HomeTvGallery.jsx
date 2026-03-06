// src/components/HomeTvGallery.jsx

import { useState, useEffect, useRef, useMemo } from 'react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import * as THREE from 'three';
// ★追加：以前作成したシェーダーファイルを読み込む
import sandstormFragment from '../shaders/sandstorm.frag?raw';

const images = [
    'gallery/gallery-01.jpg',
  'gallery/gallery-02.jpg',
  'gallery/gallery-03.jpg',
  'gallery/gallery-04.jpg',
  'gallery/gallery-05.jpg',
  'gallery/gallery-06.jpg',
  'gallery/gallery-07.jpg',
  'gallery/gallery-08.jpg',
  'gallery/gallery-09.jpg',
  'gallery/gallery-10.jpg',
  'gallery/gallery-14.jpg',
  'gallery/gallery-15.jpg',
  'gallery/gallery-17.jpg',
  'gallery/gallery-19.jpg',
  'gallery/gallery-20.jpg',
  'gallery/gallery-21.jpg',
  'gallery/gallery-22.jpg',
  'gallery/gallery-23.jpg'
];
const galleryImages = images.map(src => `${import.meta.env.BASE_URL}${src}`);

function TvNode({ textures, position, size }) {
  const materialRef = useRef();
  
  // 初期画像をランダムに決定
  const [currentIndex, setCurrentIndex] = useState(() => Math.floor(Math.random() * textures.length));
  const [noiseStrength, setNoiseStrength] = useState(0);

  // ★1. モニター（平面）のアスペクト比を計算
  const geometryAspectRatio = size[0] / size[1];

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uTexture: { value: textures[currentIndex] },
    uNoiseStrength: { value: 0 },
    // ★2. New uniforms for object-fit fix
    uGeometryAspectRatio: { value: geometryAspectRatio }, // モニターのアスペクト比
    uResolution: { value: new THREE.Vector2(1, 1) }, // テクスチャ解像度 (デフォルト)
  }), []); 

  // 毎フレームの更新処理
  useFrame((state) => {
    if (materialRef.current) {
      // 時間経過をシェーダーに伝える
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      // ★毎フレーム、シェーダー側の uniform を最新のテクスチャで更新
      const texture = textures[currentIndex];
      materialRef.current.uniforms.uTexture.value = texture;

      // ★3. 画像が切り替わったら、その画像の解像度を uniform に更新
      if(texture && texture.image) {
          materialRef.current.uniforms.uResolution.value.set(texture.image.width, texture.image.height);
      }

      // 親から渡された noiseStrength（ノイズ強度）を滑らかに反映（Lerp）
      materialRef.current.uniforms.uNoiseStrength.value = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uNoiseStrength.value,
        noiseStrength,
        0.1 // 滑らかさの度合い
      );
    }
  });

  useEffect(() => {
    let timeout1, timeout2, timeout3;
    let isMounted = true; // クリーンアップ用のフラグ

    // 次のノイズアクションを予約する関数
    const scheduleNext = () => {
      if (!isMounted) return;
      // 3秒〜8秒の間でランダムな時間を生成
      const nextInterval = Math.random() * (8000 - 3000) + 3000;

      timeout1 = setTimeout(() => {
        if (!isMounted) return;
        setNoiseStrength(1); // ノイズ開始

        timeout2 = setTimeout(() => {
          if (!isMounted) return;
          setCurrentIndex(prev => {
            let nextIdx;
            do {
              // 現在と同じ画像は避けて、ランダムな次の画像を選択
              nextIdx = Math.floor(Math.random() * textures.length);
            } while (nextIdx === prev);
            return nextIdx;
          });

          timeout3 = setTimeout(() => {
            if (!isMounted) return;
            setNoiseStrength(0); // ノイズ終了
            scheduleNext(); // 次のタイマーをセットしてループ
          }, 100);
        }, 300); // ノイズ持続時間
      }, nextInterval);
    };

    scheduleNext(); // 初回スタート

    return () => {
      isMounted = false;
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      clearTimeout(timeout3);
    };
  }, [textures]); // テクスチャ配列が変わったときだけ再実行

  return (
    <mesh position={position}>
      {/* 画面サイズを調整 (TvGridで計算されたsizeを使用) */}
      <planeGeometry args={[size[0], size[1], 32, 32]} />
      {/* カスタムシェーダーを適用 */}
      <shaderMaterial
        ref={materialRef}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={sandstormFragment} // 作成した砂嵐シェーダー
        uniforms={uniforms}
        transparent={true} // 透明度を有効に
      />
    </mesh>
  );
}

function TvGrid({ textures }) {
  const { viewport } = useThree();

  // 画面幅に基づいた計算
  const gap = viewport.width * 0.02; // 隙間 (幅の2%)
  const planeWidth = (viewport.width - gap * 2) / 3; // 1画面の幅 (幅を3等分 - 隙間)
  const planeHeight = planeWidth * (2 / 3); // 1画面の高さ (4:3のアスペクト比)

  // グリッド配置のための座標計算関数
  const getX = (col) => (col - 1) * (planeWidth + gap);
  const getY = (row) => (row === 0 ? 1 : -1) * (planeHeight / 2 + gap / 2);

  const positions = [
    [getX(0), getY(0), 0], [getX(1), getY(0), 0], [getX(2), getY(0), 0],
    [getX(0), getY(1), 0], [getX(1), getY(1), 0], [getX(2), getY(1), 0]
  ];

  return (
    <group>
      {/* 座標データをもとに6つのモニターを配置 */}
      {positions.map((pos, i) => (
        <TvNode 
          key={i} 
          textures={textures} 
          position={pos} 
          size={[planeWidth, planeHeight]} 
        />
      ))}
    </group>
  );
}

export default function HomeTvGallery() {
  const textures = useLoader(THREE.TextureLoader, galleryImages);

  if (!textures) return null; // ロード中

  return (
    // カメラの距離(z: 8)と視野角(fov: 45)を調整して6画面を画角に収める
    <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
      <color attach="background" args={['#e5e5e5']} />
      <ambientLight intensity={0.5} />
      <Environment preset="city" />
      
      {/* 6台のテレビを管理するコンポーネント */}
      <TvGrid textures={textures} />
    </Canvas>
  );
}