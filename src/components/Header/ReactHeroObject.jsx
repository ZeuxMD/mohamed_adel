/* eslint react/no-unknown-property: "off" */
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { MathUtils } from "three";

import { resolveHeroObjectTransform } from "./heroSceneLayout";
import { getReactHeroMotion } from "./reactHeroMotion";

const ringRotations = [
  [0, 0, 0],
  [Math.PI / 3.2, 0, 0],
  [0, Math.PI / 3.2, 0],
];

function ReactHeroObject({ compactLayout = false, motionScale = 1, pointer }) {
  const groupRef = useRef(null);
  const atomRef = useRef(null);
  const coreRef = useRef(null);
  const ringRefs = useRef([]);
  const [hovered, setHovered] = useState(false);

  const motion = getReactHeroMotion({ hovered });
  const layout = resolveHeroObjectTransform({
    compactLayout,
    name: "react",
    pointer,
  });

  useFrame((state, delta) => {
    if (!groupRef.current || !atomRef.current || !coreRef.current) {
      return;
    }

    const target = resolveHeroObjectTransform({
      compactLayout,
      name: "react",
      pointer,
    });

    groupRef.current.position.x = MathUtils.damp(
      groupRef.current.position.x,
      target.position.x,
      3.6,
      delta,
    );
    groupRef.current.position.y = MathUtils.damp(
      groupRef.current.position.y,
      target.position.y,
      3.6,
      delta,
    );
    groupRef.current.rotation.x = MathUtils.damp(
      groupRef.current.rotation.x,
      pointer.y * (hovered ? 0.18 : 0.08) * motionScale,
      3.8,
      delta,
    );
    groupRef.current.rotation.y = MathUtils.damp(
      groupRef.current.rotation.y,
      pointer.x * (hovered ? 0.22 : 0.1) * motionScale,
      3.8,
      delta,
    );

    atomRef.current.rotation.y += delta * 0.08 * motionScale;
    atomRef.current.rotation.z += delta * 0.04 * motionScale;

    ringRefs.current.forEach((ring, index) => {
      if (!ring) {
        return;
      }

      const direction = index === 1 ? -1 : 1;

      ring.rotation.z +=
        delta * motion.orbitSpeed * direction * (0.8 + index * 0.16) * motionScale;
      ring.children[0].material.emissiveIntensity = MathUtils.damp(
        ring.children[0].material.emissiveIntensity,
        hovered ? 0.44 : 0.24,
        4.5,
        delta,
      );
    });

    coreRef.current.material.emissiveIntensity = MathUtils.damp(
      coreRef.current.material.emissiveIntensity,
      0.18 + motion.coreGlow * 0.42,
      5,
      delta,
    );
  });

  return (
    <group
      ref={groupRef}
      position={[layout.position.x, layout.position.y, layout.position.z]}
      scale={layout.scale}
    >
      <mesh
        onPointerOut={() => setHovered(false)}
        onPointerOver={(event) => {
          event.stopPropagation();
          setHovered(true);
        }}
      >
        <sphereGeometry args={[layout.hoverRadius, 24, 24]} />
        <meshBasicMaterial opacity={0} transparent />
      </mesh>

      <group ref={atomRef}>
        {ringRotations.map((rotation, index) => (
          <group
            key={rotation.join("-")}
            ref={(node) => {
              ringRefs.current[index] = node;
            }}
            rotation={rotation}
            scale={[1.45, 0.56, 1]}
          >
            <mesh>
              <torusGeometry args={[0.82, 0.05, 24, 120]} />
              <meshStandardMaterial
                color="#087ea4"
                emissive="#8af2ff"
                emissiveIntensity={0.24}
                metalness={0.32}
                roughness={0.22}
              />
            </mesh>
          </group>
        ))}

        <mesh ref={coreRef}>
          <sphereGeometry args={[0.18, 32, 32]} />
          <meshStandardMaterial
            color="#7be8ff"
            emissive="#61dafb"
            emissiveIntensity={0.28}
            metalness={0.14}
            roughness={0.18}
          />
        </mesh>
      </group>
    </group>
  );
}

export default ReactHeroObject;
