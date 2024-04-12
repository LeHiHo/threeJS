import * as THREE from 'three';
import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

const G = 6.67430e-11; // 중력 상수

function calculateGravityForce(m1, m2, distance) {
    if (distance === 0) return new THREE.Vector3(0, 0, 0);
    let force = G * (m1 * m2) / (distance * distance);
    return force;
}

function GravityObject({ position, mass, size, color, initialVelocity }) {
    const meshRef = useRef();
    const velocity = useRef(new THREE.Vector3(initialVelocity.x, initialVelocity.y, initialVelocity.z));

    useFrame((state, delta) => {
        if (!meshRef.current) return;
        const scene = state.scene;
        let acc = new THREE.Vector3(0, 0, 0); // 합력 초기화

        scene.children.forEach(child => {
            if (child !== meshRef.current && child.userData.mass && child.position) {
                const distVector = new THREE.Vector3().subVectors(child.position, meshRef.current.position);
                const dist = distVector.length();
                if (dist === 0) return;
                const forceMagnitude = calculateGravityForce(mass, child.userData.mass, dist);
                const forceDirection = distVector.normalize();
                const acceleration = forceDirection.multiplyScalar(forceMagnitude / mass);
                acc.add(acceleration); // 모든 중력을 합력에 더함
            }
        });

        velocity.current.add(acc.multiplyScalar(delta)); // 속도 업데이트
        meshRef.current.position.add(velocity.current.clone().multiplyScalar(delta)); // 위치 업데이트
    });

    useEffect(() => {
        if (meshRef.current) {
            meshRef.current.userData.mass = mass;
        }
    }, [mass]);

    return (
        <mesh ref={meshRef} position={position}>
            <sphereGeometry args={[size, 32, 32]} />
            <meshStandardMaterial color={color} />
        </mesh>
    );
}

function Two() {
    return (
        <Canvas
            camera={{ position: [0, 0, 3000], fov: 60 }}
        >
            <ambientLight intensity={0.5} />
            <GravityObject position={new THREE.Vector3(-500, 0, 0)} mass={1e6} size={100} color="blue" initialVelocity={{ x: 0, y: 2, z: 0 }} />
            <GravityObject position={new THREE.Vector3(500, 0, 0)} mass={1e6} size={100} color="red" initialVelocity={{ x: 0, y: -2, z: 0 }} />
        </Canvas>
    );
}

export default Two;
