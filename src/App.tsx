import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const ThreeScene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scene, Camera, Renderer 설정
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    // 큐브 생성
    const geometryCube = new THREE.BoxGeometry();
    const materialCube = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometryCube, materialCube);
    scene.add(cube);

    // 구 생성
    const geometrySphere = new THREE.SphereGeometry();
    const materialSphere = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
    const sphere = new THREE.Mesh(geometrySphere, materialSphere);
    sphere.position.x = 2; // 큐브와 구분하기 위해 위치 조정
    scene.add(sphere);

    camera.position.z = 5;

    // 렌더링 루프
    const animate = function () {
      requestAnimationFrame(animate);

      // 도형 회전
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      sphere.rotation.x += 0.01;
      sphere.rotation.y += 0.01;

      renderer.render(scene, camera);
    };

    animate();

    // 정리 코드
    return () => {
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef}></div>;
};

export default ThreeScene;
