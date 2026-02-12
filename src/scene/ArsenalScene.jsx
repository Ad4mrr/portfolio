import { useRef, useState, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import ArsenalItem from "./ArsenalItem";
import items from "../data/items";

/* =========================
   CONFIG
========================= */

// Statue center (Orbit target)
const STATUE_CENTER = [13, 1, -12];

// 🌍 World settings
const WORLD_POSITION = [13, -6.5, -12];
const WORLD_SCALE = 0.2;

// 🎯 Wheel settings
const WHEEL_CENTER = [11, 3, -8.5];
const WHEEL_RADIUS = 8;

// 🎥 CAMERA START POSITION (EDIT THIS)
const CAMERA_POSITION = [25, 8, 5]; 
// ↑ change these values to adjust angle

/* =========================
   WORLD
========================= */

function World() {
  const { scene } = useGLTF("/models/world.glb");

  return (
    <primitive
      object={scene}
      position={WORLD_POSITION}
      scale={WORLD_SCALE}
    />
  );
}

/* =========================
   SCENE
========================= */

export default function ArsenalScene() {
  const wheelRef = useRef();
  const controlsRef = useRef();
  const { camera } = useThree();

  const [activeIndex, setActiveIndex] = useState(0);

  /* =========================
     SET CAMERA POSITION
  ========================= */

  useEffect(() => {
    camera.position.set(...CAMERA_POSITION);
    camera.lookAt(...STATUE_CENTER);

    if (controlsRef.current) {
      controlsRef.current.target.set(...STATUE_CENTER);
      controlsRef.current.update();
    }
  }, [camera]);

  /* =========================
     WHEEL ROTATION
  ========================= */

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowRight") {
        setActiveIndex((prev) => (prev + 1) % items.length);
      }
      if (e.key === "ArrowLeft") {
        setActiveIndex((prev) =>
          prev === 0 ? items.length - 1 : prev - 1
        );
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  useFrame(() => {
    if (!wheelRef.current) return;

    const targetRotation =
      (-activeIndex / items.length) * Math.PI * 2;

    wheelRef.current.rotation.y = THREE.MathUtils.lerp(
      wheelRef.current.rotation.y,
      targetRotation,
      0.1
    );
  });

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.8} />

      <directionalLight
        position={[10, 20, 10]}
        intensity={1.5}
      />

      <pointLight
        position={[13, 10, -12]}
        intensity={20}
      />

      {/* World */}
      <World />

      {/* Weapon Wheel */}
      <group ref={wheelRef} position={WHEEL_CENTER}>
        {items.map((item, index) => {
          const angle = (index / items.length) * Math.PI * 2;

          const x = Math.cos(angle) * WHEEL_RADIUS;
          const z = Math.sin(angle) * WHEEL_RADIUS;

          return (
            <group key={item.id} position={[x, 0, z]}>
              <ArsenalItem item={item} />
            </group>
          );
        })}
      </group>

      {/* Orbit Controls */}
      <OrbitControls
  ref={controlsRef}
  target={STATUE_CENTER}
  enableRotate={true}
  enablePan={false}
  enableZoom={true}
  enableDamping
  dampingFactor={0.08}

  // 🔒 Lock horizontal freedom
  minAzimuthAngle={-Infinity}
  maxAzimuthAngle={Infinity}

  // 🎯 Slight vertical movement only
  minPolarAngle={Math.PI / 2 - 0.15}
  maxPolarAngle={Math.PI / 2 + 0.15}

  // 🔍 Zoom limits
  minDistance={15}
  maxDistance={40}
/>
    </>
  );
}