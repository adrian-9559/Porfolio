"use client";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { FloatingShapes } from "./FloatingShapes";
import { ParticleField } from "./ParticleField";

export function HeroScene() {
  return (
    <div className="hero-3d-canvas" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={0.5} color="#8b5cf6" />
          <pointLight position={[-10, -10, 5]} intensity={0.3} color="#06b6d4" />
          <FloatingShapes />
          <ParticleField count={120} />
        </Suspense>
      </Canvas>
    </div>
  );
}
