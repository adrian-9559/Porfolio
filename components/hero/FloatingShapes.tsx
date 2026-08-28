"use client";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ShapeProps {
  geometry: THREE.BufferGeometry;
  position: [number, number, number];
  color: string;
  speed: number;
  rotationSpeed: number;
  scale: number;
}

function Shape({ geometry, position, color, speed, rotationSpeed, scale }: ShapeProps) {
  const ref = useRef<THREE.Mesh>(null);
  const initialY = position[1];

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.x += rotationSpeed * 0.005;
    ref.current.rotation.y += rotationSpeed * 0.008;
    ref.current.position.y = initialY + Math.sin(t * speed) * 0.3;
    ref.current.position.x = position[0] + Math.sin(t * speed * 0.5) * 0.15;
  });

  return (
    <mesh ref={ref} position={position} scale={scale}>
      {geometry && <primitive object={geometry} attach="geometry" />}
      <meshStandardMaterial
        color={color}
        wireframe
        transparent
        opacity={0.15}
        emissive={color}
        emissiveIntensity={0.1}
      />
    </mesh>
  );
}

export function FloatingShapes() {
  const shapes = useMemo(() => {
    const geos = [
      new THREE.IcosahedronGeometry(1, 0),
      new THREE.OctahedronGeometry(1, 0),
      new THREE.TorusGeometry(0.8, 0.3, 8, 16),
      new THREE.DodecahedronGeometry(0.9, 0),
      new THREE.TetrahedronGeometry(1, 0),
    ];

    const colors = ["#8b5cf6", "#ec4899", "#06b6d4", "#10b981", "#f59e0b"];

    return Array.from({ length: 8 }, (_, i) => ({
      id: i,
      geometry: geos[i % geos.length],
      position: [
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 6 - 2,
      ] as [number, number, number],
      color: colors[i % colors.length],
      speed: 0.3 + Math.random() * 0.5,
      rotationSpeed: 0.2 + Math.random() * 0.4,
      scale: 0.3 + Math.random() * 0.5,
    }));
  }, []);

  return (
    <group>
      {shapes.map((s) => (
        <Shape key={s.id} {...s} />
      ))}
    </group>
  );
}
