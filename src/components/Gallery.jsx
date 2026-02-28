import { useState, useEffect, useRef, useMemo } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import * as THREE from 'three';
import sandstormFragment from '../shaders/sandstorm.frag?raw'; 

const galleryImages = [
  "gallery/kotomi-6.jpg",
  "gallery-10.jpg", // ← / を取りました
  "gallery-23.jpg", // ← / を取りました
  "gallery-14.jpg", // ← / を取りました
  "gallery-17.jpg", // ← / を取りました
  "gallery/kotomi-2.jpg",
  "gallery-12.jpg", // ← / を取りました
  "gallery/kotomi-3.jpg",
  "gallery/gallery-19.jpg",
  "gallery/gallery-05.jpg",
].map(src => `${import.meta.env.BASE_URL}${src}`);

function TvScreen({ texture, noiseStrength }) {
  const materialRef = useRef();

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uTexture: { value: texture },
    uNoiseStrength: { value: noiseStrength },
  }), [texture]);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      materialRef.current.uniforms.uNoiseStrength.value = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uNoiseStrength.value,
        noiseStrength,
        0.1
      );
    }
  });

  return (
    <mesh>
      <planeGeometry args={[10, 7.5, 32, 32]} /> 
      <shaderMaterial
        ref={materialRef}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={sandstormFragment}
        uniforms={uniforms}
        transparent={true}
      />
    </mesh>
  );
}

export default function HomeTvGallery() {
  const textures = useLoader(THREE.TextureLoader, galleryImages);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [noiseStrength, setNoiseStrength] = useState(0);
  const isSwitching = useRef(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isSwitching.current) return;
      isSwitching.current = true;

      setNoiseStrength(1);

      setTimeout(() => {
        setCurrentIndex(prevIndex => {
          let randomIndex;
          do {
            randomIndex = Math.floor(Math.random() * galleryImages.length);
          } while (randomIndex === prevIndex);
          return randomIndex;
        });
        
        setTimeout(() => {
          setNoiseStrength(0);
          isSwitching.current = false;
        }, 100);

      }, 300);

    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  if (!textures) return null;

  return (
    <Canvas camera={{ position: [0, 0, 15], fov: 40 }}>
      <color attach="background" args={['#e5e5e5']} />
      <ambientLight intensity={0.5} />
      <Environment preset="city" />
      <TvScreen texture={textures[currentIndex]} noiseStrength={noiseStrength} />
    </Canvas>
  );
}