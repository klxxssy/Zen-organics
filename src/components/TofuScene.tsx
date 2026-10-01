"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer, RoundedBox, useGLTF } from "@react-three/drei";
import { Component, Suspense, useEffect, useMemo, useRef, type ReactNode } from "react";
import * as THREE from "three";

const MODEL_URL = "/models/tofu.glb";
const TARGET_SIZE = 2.1; // tamaño máximo del modelo en unidades de escena

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
    <RoundedBox args={[1.9, 0.95, 1.4]} radius={0.1} smoothness={6}>
      <meshStandardMaterial color={TOFU_RAW} roughness={0.85} />
    </RoundedBox>
  );
}

type Pointer = { x: number; y: number };

/** Mouse en NDC (Y invertido) escuchado en window: el hero completo reacciona. */
function usePointer() {
  const pointer = useRef<Pointer>({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);
  return pointer;
}

function Rig({
  children,
  reducedMotion,
  pointer,
}: {
  children: ReactNode;
  reducedMotion: boolean;
  pointer: React.RefObject<Pointer>;
}) {
  const spin = useRef<THREE.Group>(null);
  const tilt = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (reducedMotion) return;
    if (spin.current) spin.current.rotation.y += delta * 0.22; // giro lento
    if (tilt.current) {
      // Sigue un poco al mouse (máx. ~8°) con suavizado
      const k = 1 - Math.exp(-delta * 3);
      tilt.current.rotation.x += (0.35 - pointer.current.y * 0.14 - tilt.current.rotation.x) * k;
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

// Tonos naturales de comida (derivados de la paleta): tofu crudo, tofu dorado, edamame
const TOFU_RAW = "#EFE6D2";
const TOFU_TOASTED = "#D49A55";
const EDAMAME = "#7E9B4E";

type Floater = {
  kind: "cube" | "toasted" | "bean" | "pod";
  pos: [number, number, number];
  size: number;
  rot: [number, number, number];
};

// Factor de dispersión: mantiene las piezas dentro del canvas (sin cortes en los bordes)
const SPREAD = 0.7;

// z negativo = fondo (se mueve menos), z positivo = primer plano (se mueve más)
const FLOATERS: Floater[] = [
  { kind: "toasted", pos: [-1.55, 1.05, 0.6], size: 0.42, rot: [0.4, 0.6, 0.2] },
  { kind: "cube", pos: [1.6, 1.15, -0.8], size: 0.36, rot: [0.2, 0.9, 0.5] },
  { kind: "toasted", pos: [1.35, -1.05, 1.1], size: 0.34, rot: [0.7, 0.3, 0.1] },
  { kind: "cube", pos: [-1.7, -0.75, -1.2], size: 0.3, rot: [0.1, 0.4, 0.8] },
  { kind: "bean", pos: [-0.75, 1.45, 1.3], size: 0.13, rot: [0.3, 0.2, 1.1] },
  { kind: "bean", pos: [0.55, 1.5, -0.4], size: 0.12, rot: [1.2, 0.4, 0.2] },
  { kind: "bean", pos: [1.85, 0.1, 0.3], size: 0.14, rot: [0.5, 1.4, 0.3] },
  { kind: "bean", pos: [-1.2, -1.35, 0.9], size: 0.13, rot: [0.9, 0.2, 0.7] },
  { kind: "bean", pos: [0.2, -1.5, -1.0], size: 0.12, rot: [0.2, 0.8, 1.3] },
  { kind: "pod", pos: [-1.95, 0.25, 0.2], size: 0.13, rot: [0.2, 0.3, 1.1] },
  { kind: "pod", pos: [1.05, 1.55, 0.8], size: 0.11, rot: [0.6, 0.2, -0.6] },
];

function FloaterMesh({ kind, size }: Pick<Floater, "kind" | "size">) {
  if (kind === "cube" || kind === "toasted") {
    return (
      <RoundedBox args={[size, size, size]} radius={size * 0.14} smoothness={4}>
        <meshStandardMaterial color={kind === "toasted" ? TOFU_TOASTED : TOFU_RAW} roughness={kind === "toasted" ? 0.55 : 0.85} />
      </RoundedBox>
    );
  }
  if (kind === "bean") {
    return (
      <mesh scale={[size * 1.35, size, size]}>
        <sphereGeometry args={[1, 24, 16]} />
        <meshStandardMaterial color={EDAMAME} roughness={0.45} />
      </mesh>
    );
  }
  // Vaina: cápsula con 3 granos marcados
  return (
    <group>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <capsuleGeometry args={[size, size * 4.2, 8, 16]} />
        <meshStandardMaterial color={EDAMAME} roughness={0.6} />
      </mesh>
      {[-1.6, 0, 1.6].map((x) => (
        <mesh key={x} position={[x * size, 0, size * 0.35]} scale={[size * 1.05, size * 0.95, size * 0.8]}>
          <sphereGeometry args={[1, 16, 12]} />
          <meshStandardMaterial color={EDAMAME} roughness={0.5} />
        </mesh>
      ))}
    </group>
  );
}

/** Capa de parallax: cada pieza se desplaza según su profundidad y flota suavemente. */
function Floaters({ pointer, reducedMotion }: { pointer: React.RefObject<Pointer>; reducedMotion: boolean }) {
  const refs = useRef<(THREE.Group | null)[]>([]);

  useFrame((state, delta) => {
    if (reducedMotion) return;
    const t = state.clock.elapsedTime;
    const k = 1 - Math.exp(-delta * 2.5);
    FLOATERS.forEach((f, i) => {
      const g = refs.current[i];
      if (!g) return;
      const depth = 0.12 + (f.pos[2] + 1.5) * 0.1; // primer plano se mueve más
      const tx = f.pos[0] * SPREAD + pointer.current.x * depth;
      const ty = f.pos[1] * SPREAD + pointer.current.y * depth + Math.sin(t * 0.6 + i) * 0.06;
      g.position.x += (tx - g.position.x) * k;
      g.position.y += (ty - g.position.y) * k;
      g.rotation.x += delta * 0.12 * ((i % 3) - 1 || 0.6);
      g.rotation.y += delta * 0.15;
    });
  });

  return (
    <>
      {FLOATERS.map((f, i) => (
        <group
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          position={[f.pos[0] * SPREAD, f.pos[1] * SPREAD, f.pos[2]]}
          rotation={f.rot}
        >
          <FloaterMesh kind={f.kind} size={f.size} />
        </group>
      ))}
    </>
  );
}

export default function TofuScene({ active, reducedMotion, onReady }: SceneProps) {
  const pointer = usePointer();
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0.4, 5.6], fov: 35 }}
      frameloop={active ? "always" : "never"}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
    >
      <ambientLight intensity={0.75} />
      <directionalLight position={[3, 5, 4]} intensity={1.5} color="#FFF4E2" />
      <Suspense fallback={null}>
        <Rig reducedMotion={reducedMotion} pointer={pointer}>
          <ModelBoundary fallback={<ProceduralTofu onReady={onReady} />}>
            <GltfTofu onReady={onReady} />
          </ModelBoundary>
        </Rig>
        <Floaters pointer={pointer} reducedMotion={reducedMotion} />
        <ContactShadows position={[0, -1.2, 0]} opacity={0.2} scale={3.4} blur={2.8} far={2.2} color="#2F4030" />
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
