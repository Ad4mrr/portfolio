import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, Text } from "@react-three/drei";
import * as THREE from "three";

export default function ArsenalItem({ item }) {
  const groupRef = useRef();

  // load model based on id
  const { scene } = useGLTF(`/models/${item.id}.glb`);

  // subtle floating animation
  useFrame((state) => {
    if (!groupRef.current) return;

    groupRef.current.position.y =
      Math.sin(state.clock.elapsedTime * 2) * 0.2;

    groupRef.current.rotation.y += 0.005;
  });

  return (
    <group ref={groupRef}>
      
      {/* 3D MODEL */}
      <primitive object={scene} scale={1.2} />

      {/* TEXT BELOW MODEL */}
      <Text
        position={[0, -2, 0]}
        fontSize={0.8}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {item.title}
      </Text>

    </group>
  );
}