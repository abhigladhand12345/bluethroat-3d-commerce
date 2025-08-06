import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Sphere ref={meshRef} args={[1, 64, 64]} scale={2}>
      <MeshDistortMaterial
        color="#00BFFF"
        attach="material"
        distort={0.3}
        speed={1.5}
        roughness={0.1}
        metalness={0.8}
      />
    </Sphere>
  );
}

function FloatingCubes() {
  const cubesRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (cubesRef.current) {
      cubesRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      cubesRef.current.children.forEach((cube, index) => {
        cube.position.y = Math.sin(state.clock.elapsedTime + index) * 0.5;
      });
    }
  });

  return (
    <group ref={cubesRef}>
      {[...Array(8)].map((_, i) => (
        <mesh
          key={i}
          position={[
            Math.cos((i / 8) * Math.PI * 2) * 4,
            0,
            Math.sin((i / 8) * Math.PI * 2) * 4
          ]}
        >
          <boxGeometry args={[0.5, 0.5, 0.5]} />
          <meshStandardMaterial
            color="#1A1A40"
            transparent
            opacity={0.7}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
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
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00BFFF" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#1A1A40" />
        
        <AnimatedSphere />
        <FloatingCubes />
        
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