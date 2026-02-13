import { useRef, useState, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF, Text } from "@react-three/drei";
import * as THREE from "three";
import ArsenalItem from "./ArsenalItem";
import items from "../data/items";

/* =========================
   CONFIG
========================= */

const STATUE_CENTER = [13, -1, -12];

const WORLD_POSITION = [13, -7.5, -12];
const WORLD_SCALE = 0.2;

const WHEEL_CENTER = [11, 3, -8.5];
const WHEEL_RADIUS = 8;

const AUTO_ROTATE_SPEED = 0.12;
const ROTATION_SMOOTHNESS = 0.08;

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
  const [autoRotate, setAutoRotate] = useState(true);

  /* ---------- CAMERA ALIGN ---------- */
  useEffect(() => {
    camera.position.set(
      STATUE_CENTER[0] + 12, 
      STATUE_CENTER[1] + 15,   // 🔥 Slightly higher now
      STATUE_CENTER[2] + 16 
    );

    camera.lookAt(...STATUE_CENTER);
  }, [camera]);

  /* ---------- KEYBOARD ---------- */
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowRight") {
        setAutoRotate(false);
        setActiveIndex((prev) => (prev + 1) % items.length);
      }
      if (e.key === "ArrowLeft") {
        setAutoRotate(false);
        setActiveIndex((prev) =>
          prev === 0 ? items.length - 1 : prev - 1
        );
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  /* ---------- WHEEL ROTATION ---------- */
  useFrame((state, delta) => {
    if (!wheelRef.current) return;

    if (autoRotate) {
      wheelRef.current.rotation.y += delta * AUTO_ROTATE_SPEED;
    } else {
      const target =
        (-activeIndex / items.length) * Math.PI * 2;

      wheelRef.current.rotation.y = THREE.MathUtils.lerp(
        wheelRef.current.rotation.y,
        target,
        ROTATION_SMOOTHNESS
      );
    }
  });

  return (
    <>
      {/* LIGHTING */}
      <ambientLight intensity={0.6} />
      <directionalLight
        position={[13, 15, -8]}
        intensity={2}
        castShadow
      />
      <spotLight
        position={[13, 20, -12]}
        angle={0.4}
        intensity={2}
        penumbra={1}
      />

      {/* WORLD */}
      <World />

      {/* WHEEL */}
      <group ref={wheelRef} position={WHEEL_CENTER}>
        {items.map((item, index) => {
          const angle =
            (index / items.length) * Math.PI * 2;

          const x = Math.cos(angle) * WHEEL_RADIUS;
          const z = Math.sin(angle) * WHEEL_RADIUS;

          return (
            <group key={item.id} position={[x, 0, z]}>
              <ArsenalItem item={item} />

              <Text
                position={[0, -1.8, 0]}
                fontSize={0.5}
                color="white"
                anchorX="center"
                anchorY="middle"
                outlineWidth={0.02}
                outlineColor="black"
              >
                {item.title}
              </Text>
            </group>
          );
        })}
      </group>

      {/* CAMERA CONTROLS */}
      <OrbitControls
        ref={controlsRef}
        target={STATUE_CENTER}
        enableRotate
        enablePan={false}
        enableZoom
        enableDamping
        dampingFactor={0.08}

        // 🔒 Very small vertical movement
        minPolarAngle={Math.PI / 2 - 0.12}
        maxPolarAngle={Math.PI / 2 + 0.12}

        // 🔥 Force zoom straight to center
        zoomToCursor={false}

        minDistance={10}
        maxDistance={30}
      />
    </>
  );
}