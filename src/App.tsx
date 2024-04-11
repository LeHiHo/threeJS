import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Star from "./star";
import * as THREE from 'three';
import { getRandomFloat, getRandomInt} from "@utils/utils";
import { OrbitingPlanet, Planet } from "@components/OrbitingPlanet";

function genBackgroundStars() {
  const stars = [];
  for (let i = 0; i < 500; i++) {
      const size = getRandomInt(15, 20);
      const pos = new THREE.Vector3(
          getRandomInt(-50000, 50000),
          getRandomInt(-50000, 50000),
          getRandomInt(-50000, 50000)
      );
      stars.push(<Star position={pos} size={size} />);
  }
  return stars;
}

function App() {
    return (
        <div style={{ width: "100vw", height: "100vh" }}>
            <Canvas
                camera={{
                    position: [10000, 10000, 10000],
                    rotation: [-0.5, 0, 0],
                    far: 100000,
                }}
            >
                <color attach="background" args={["#000"]} />
                <ambientLight color={"#fff"} intensity={5} />
                <axesHelper args={[20000]} />
                <OrbitControls />
                {/* <mesh position={[0, 0, 0]}>
                    <boxGeometry args={[100, 100, 100]} />
                    <meshStandardMaterial color={"#f00"} />
                </mesh> */}
                {/* <Star position={new THREE.Vector3(5000, 5000, 5000)} size={2000} /> */}
                {genBackgroundStars()}
                <Planet position={new THREE.Vector3(0, 0, 0)} size={500} color="blue" />
                <OrbitingPlanet radius={5000} speed={0.004} size={400} color="red" />
                <OrbitingPlanet radius={8000} speed={0.003} size={500} color="red" />
                <OrbitingPlanet radius={11000} speed={0.002} size={600} color="red" />
                {/* <OrbitingPlanet radius={14000} speed={0.001} size={700} color="yellow" /> */}
            </Canvas>
        </div>
    );
}

export default App;
