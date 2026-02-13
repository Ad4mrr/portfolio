import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import ArsenalScene from "../scene/ArsenalScene";

export default function Home() {
  return (
    <Canvas shadows camera={{ position: [20, 5, 10], fov: 50 }}>
      <Suspense fallback={null}>
        <ArsenalScene />
      </Suspense>
    </Canvas>
  );
}