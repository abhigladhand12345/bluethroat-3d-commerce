import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import tshirtIcon from '@/assets/tshirt-icon.png';
import jeansIcon from '@/assets/jeans-icon.png';
import jacketIcon from '@/assets/jacket-icon.png';
import shoesIcon from '@/assets/shoes-icon.png';

function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} scale={2}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial
        color="#00BFFF"
        metalness={0.8}
        roughness={0.1}
        transparent
        opacity={0.8}
      />
    </mesh>
  );
}

function ClothingItem({ position, texture, text }: { position: [number, number, number], texture: string, text: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const textureObj = useLoader(THREE.TextureLoader, texture);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.3;
    }
  });

  return (
    <group position={position}>
      <mesh ref={meshRef}>
        <planeGeometry args={[1.2, 1.2]} />
        <meshStandardMaterial
          map={textureObj}
          transparent
          opacity={0.9}
          side={THREE.DoubleSide}
        />
      </mesh>
      <Text
        position={[0, -1, 0]}
        fontSize={0.2}
        color="#00BFFF"
        anchorX="center"
        anchorY="middle"
        font="/fonts/inter-medium.woff"
      >
        {text}
      </Text>
    </group>
  );
}

function FloatingClothingItems() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  const clothingItems = [
    { texture: tshirtIcon, text: "T-Shirts", position: [3, 0, 0] as [number, number, number] },
    { texture: jeansIcon, text: "Jeans", position: [0, 0, 3] as [number, number, number] },
    { texture: jacketIcon, text: "Jackets", position: [-3, 0, 0] as [number, number, number] },
    { texture: shoesIcon, text: "Shoes", position: [0, 0, -3] as [number, number, number] },
    { texture: tshirtIcon, text: "Hoodies", position: [2.1, 0, 2.1] as [number, number, number] },
    { texture: jeansIcon, text: "Shorts", position: [-2.1, 0, 2.1] as [number, number, number] },
    { texture: jacketIcon, text: "Blazers", position: [-2.1, 0, -2.1] as [number, number, number] },
    { texture: shoesIcon, text: "Sneakers", position: [2.1, 0, -2.1] as [number, number, number] },
  ];

  return (
    <group ref={groupRef}>
      {clothingItems.map((item, index) => (
        <ClothingItem
          key={index}
          position={item.position}
          texture={item.texture}
          text={item.text}
        />
      ))}
    </group>
  );
}

interface ThreeBackgroundProps {
  className?: string;
}

const ThreeBackground: React.FC<ThreeBackgroundProps> = ({ className = "" }) => {
  return (
    <div className={`absolute inset-0 ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        style={{ background: 'transparent' }}
        gl={{ antialias: true, alpha: true }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00BFFF" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#1A1A40" />
        
        <AnimatedSphere />
        <FloatingClothingItems />
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
};

export default ThreeBackground;