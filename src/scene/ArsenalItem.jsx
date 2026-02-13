import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { useNavigate } from "react-router-dom";
import * as THREE from "three";

/* =========================
   MODEL LOADER
========================= */

function GLBModel({ path }) {
  const groupRef = useRef();

  try {
    const { scene } = useGLTF(path);

    return (
      <primitive
        ref={groupRef}
        object={scene}
        scale={1}
      />
    );
  } catch (err) {
    return null;
  }
}

/* =========================
   FALLBACK GEOMETRY
========================= */

function FallbackModel() {
  return (
    <mesh>
      <boxGeometry args={[1.5, 1.5, 1.5]} />
      <meshStandardMaterial
        color="#999"
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  );
}

/* =========================
   MAIN COMPONENT
========================= */

export default function ArsenalItem({ item }) {
  const groupRef = useRef();
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);

  const modelPath = `/models/${item.id}.glb`;

  /* ---------- HOVER ANIMATION ---------- */
  useFrame(() => {
    if (!groupRef.current) return;

    const targetScale = hovered ? 1.15 : 1;

    groupRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      0.1
    );
  });

  return (
    <group
      ref={groupRef}
      onClick={() => navigate(`/${item.id}`)}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Try loading GLB */}
      <GLBModel path={modelPath} />

      {/* If no GLB found, fallback */}
      {!modelPath && <FallbackModel />}
    </group>
  );
}