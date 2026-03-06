import styles from './Hero.module.scss';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment, Center, useTexture, MeshDistortMaterial } from '@react-three/drei';
import { Suspense, useRef } from 'react';
import * as THREE from 'three';
import { Link } from 'react-router-dom';

function CustomEnvironment() {
  const texture = useTexture(`${import.meta.env.BASE_URL}environment.jpg`);
  texture.mapping = THREE.EquirectangularReflectionMapping;
  return <Environment map={texture} />;
}

function Model() {
  const groupRef = useRef();
  const materialRef = useRef();
  
  // .glbファイルからメッシュデータを抽出し、ジオメトリ（形状）を取り出す
  const { nodes } = useGLTF(`${import.meta.env.BASE_URL}model.glb`);
  const firstMesh = Object.values(nodes).find((node) => node.isMesh);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // 1. 不整脈の計算式（鼓動の強さ）
    const basePulse = Math.pow(Math.sin(time * 3 + Math.sin(time * 2.5)), 20) * 0.15;
    const secondaryPulse = Math.pow(Math.sin(time * 4.5), 10) * 0.08;
    const instability = Math.sin(time * 15) * 0.01;
    const pulseIntensity = basePulse + secondaryPulse + instability;
    
    // 全体のスケールを適用
    const scale = 1 + pulseIntensity;
    groupRef.current.scale.set(scale, scale, scale);

    // 2. 鼓動に合わせてトゲトゲ（Distort）を激しくする
    if (materialRef.current) {
      // 普段は0.3の歪み、鼓動の瞬間だけpulseIntensityの数倍の歪みを足す
      materialRef.current.distort = 0.3 + (pulseIntensity * 3.5); 
    }

    // 3. マウス追従回転
    const targetX = state.pointer.x * (Math.PI / 4);
    const targetY = state.pointer.y * (Math.PI / 4);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetX, 0.05);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -targetY, 0.05);
  });

  // メッシュが見つからない場合のエラー回避
  if (!firstMesh) return null;

  return (
    <group ref={groupRef}>
      <Center>
        {/* primitiveではなく、meshタグを使って形状と質感を再構築する */}
        <mesh geometry={firstMesh.geometry}>
          <MeshDistortMaterial
            ref={materialRef}
            color="#ffffff"
            metalness={1.0}
            roughness={0.05}
            envMapIntensity={1.5} // 環境テクスチャの反射強度
            speed={2} // 波打つベースのスピード
          />
        </mesh>
      </Center>
    </group>
  );
}

export default function Hero() {
  return (
    <section className={styles.hero}data-cursortext="↓">
      <div className={styles.canvasContainer}>
        <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
          <ambientLight intensity={1} />
          <directionalLight position={[2, 2, 2]} intensity={2} />
          
          <Suspense fallback={null}>
            <CustomEnvironment />
            <Model />
          </Suspense>
        </Canvas>
      </div>

      <div className={styles.contentWrapper}>
        <h1 className={styles.title}>portfolio</h1>
        
        {/* 下半分の要素をグループ化して横並びにする */}
        <div className={styles.lowerContent}>
          <div className={styles.infoArea}>
            <h3 className={styles.name}>ichihashi<br/>toui</h3>
            <p className={styles.year}>2023-</p>
            <p className={styles.genre}>Web design<br/>graphic design<br/>branding<br/>photography</p>
            <p className={styles.tools}>Illustrator / Photoshop / After Effects / Lightroom / <br/>Figma / Blender / HTML / CSS / JavaScript</p>
          </div>

          <div className={styles.rightArea}data-cursortext="TAP">
            <Link to="/contents" className={styles.navItem}>
              <span className={styles.navNum}>01</span>
              <span className={styles.navText}>contents</span>
            </Link>
            <Link to="/profile" className={styles.navItem}>
              <span className={styles.navNum}>02</span>
              <span className={styles.navText}>profile</span>
            </Link>
            <Link to="/gallery" className={styles.navItem}>
              <span className={styles.navNum}>03</span>
              <span className={styles.navText}>gallery</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}