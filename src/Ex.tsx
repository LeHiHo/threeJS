import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const Ex: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scene, Camera, and Renderer setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Append renderer to the ref element instead of document.body
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    // Camera position adjustment
    camera.position.z = 5;

    // Rendering the scene and camera
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    animate();

    // Cleanup function to remove the renderer's domElement from the DOM
    return () => {
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []); // Empty array means this effect runs once on mount

  return <div ref={mountRef} />; // Use a div as the mount point for the Three.js renderer
};

export default Ex;
