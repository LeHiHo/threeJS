import * as THREE from 'three';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export function OrbitingPlanet({ radius, speed, size, color }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const angleRef = useRef(0);  // angleRef의 선언과 초기화

  useFrame(() => {
    if (!meshRef.current) return;
    angleRef.current += speed;
    meshRef.current.position.x = Math.cos(angleRef.current) * radius;
    meshRef.current.position.z = Math.sin(angleRef.current) * radius;
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

export function Planet({ position, size, color }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += 0.01;  // 자전
  });

  return (
    <mesh ref={meshRef}>
    <sphereGeometry args={[size, 32, 32]} />
    <meshStandardMaterial color={color} />
  </mesh>
  );
}
