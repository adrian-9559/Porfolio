"use client";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";

import { FloatingShapes } from "./FloatingShapes";
import { ParticleField } from "./ParticleField";

export function HeroScene() {
  return (
    <div aria-hidden="true" className="hero-3d-canvas">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.3} />
          <pointLight color="#8b5cf6" intensity={0.5} position={[10, 10, 10]} />
          <pointLight
            color="#06b6d4"
            intensity={0.3}
            position={[-10, -10, 5]}
          />
          <FloatingShapes />
          <ParticleField count={120} />
        </Suspense>
      </Canvas>
    </div>
  );
}
