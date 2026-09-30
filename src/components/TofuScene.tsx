"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer, RoundedBox, useGLTF } from "@react-three/drei";
import { Component, Suspense, useEffect, useMemo, useRef, type ReactNode } from "react";
import * as THREE from "three";

const MODEL_URL = "/models/tofu.glb";
const TARGET_SIZE = 2.4; // tamaño máximo del modelo en unidades de escena

type SceneProps = { active: boolean; reducedMotion: boolean; onReady: () => void };

/** Si el .glb no existe o falla, se muestra un bloque de tofu procedural. */
class ModelBoundary extends Component<{ fallback: ReactNode; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

function GltfTofu({ onReady }: { onReady: () => void }) {
  const { scene } = useGLTF(MODEL_URL);

  // Centra y escala cualquier modelo al mismo tamaño visual
  const model = useMemo(() => {
    const root = scene.clone(true);
    const box = new THREE.Box3().setFromObject(root);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const scale = TARGET_SIZE / Math.max(size.x, size.y, size.z || 1);
    root.position.sub(center.multiplyScalar(scale));
    root.scale.setScalar(scale);
    return root;
  }, [scene]);

  useEffect(onReady, [onReady]);
  return <primitive object={model} />;
}

function ProceduralTofu({ onReady }: { onReady: () => void }) {
  useEffect(onReady, [onReady]);
  return (
    <RoundedBox args={[2.2, 1.1, 1.6]} radius={0.12} smoothness={6}>
      <meshStandardMaterial color="#EFE8D9" roughness={0.85} />
    </RoundedBox>
  );
}

function Rig({ children, reducedMotion }: { children: ReactNode; reducedMotion: boolean }) {
  const spin = useRef<THREE.Group>(null);
  const tilt = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Se escucha en window para que el modelo reaccione al mouse en todo el hero
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((_, delta) => {
    if (reducedMotion) return;
    if (spin.current) spin.current.rotation.y += delta * 0.25; // giro lento
    if (tilt.current) {
      // Sigue un poco al mouse (máx. ~8°) con suavizado
      const k = 1 - Math.exp(-delta * 3);
      tilt.current.rotation.x += (pointer.current.y * 0.14 - tilt.current.rotation.x) * k;
      tilt.current.rotation.z += (-pointer.current.x * 0.14 - tilt.current.rotation.z) * k;
    }
  });

  return (
    <group ref={tilt} rotation={[0.35, 0, 0]}>
      <group ref={spin} rotation={[0, -0.6, 0]}>
        {children}
      </group>
    </group>
  );
}

export default function TofuScene({ active, reducedMotion, onReady }: SceneProps) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0.6, 5.2], fov: 35 }}
      frameloop={active ? "always" : "never"}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 5, 4]} intensity={1.4} />
      <Suspense fallback={null}>
        <Rig reducedMotion={reducedMotion}>
          <ModelBoundary fallback={<ProceduralTofu onReady={onReady} />}>
            <GltfTofu onReady={onReady} />
          </ModelBoundary>
        </Rig>
        <ContactShadows position={[0, -1.35, 0]} opacity={0.25} scale={7} blur={2.6} far={3} color="#2B2B2B" />
        {/* Iluminación de estudio local: sin descargar HDRs externos */}
        <Environment resolution={128} environmentIntensity={0.6}>
          <Lightformer form="rect" intensity={2} position={[0, 4, 2]} scale={[6, 3, 1]} />
          <Lightformer form="rect" intensity={1} position={[-4, 1, 3]} scale={[3, 4, 1]} color="#FAF8F4" />
          <Lightformer form="rect" intensity={0.6} position={[4, 0, -2]} scale={[3, 4, 1]} color="#D9CFC1" />
        </Environment>
      </Suspense>
    </Canvas>
  );
}
