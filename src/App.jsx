import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import ArsenalScene from "./scene/ArsenalScene";
import "./styles.css";

export default function App() {
  return (
    <div className="page">
      <div className="canvasWrap">
        <Canvas
          camera={{ position: [25, -8, 4], fov: 50 }}
          shadows
        >
          <Suspense fallback={null}>
            <ArsenalScene />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}