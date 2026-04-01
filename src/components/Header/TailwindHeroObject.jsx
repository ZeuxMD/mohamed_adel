/* eslint react/no-unknown-property: "off" */
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { MathUtils } from "three";
import tailwindLogoSvg from "./logoAssets/tailwind.svg?raw";

import { resolveHeroObjectTransform } from "./heroSceneLayout";
import { createExtrudedLogo } from "./logoGeometry";
import { getTailwindHeroMotion } from "./tailwindHeroMotion";

const tailwindLogo = createExtrudedLogo({
  depth: 0.18,
  svg: tailwindLogoSvg,
  targetWidth: 2.9,
});

const tailwindParts = [...tailwindLogo.geometries].sort((left, right) => {
  left.computeBoundingBox();
  right.computeBoundingBox();

  const leftCenter = (left.boundingBox.min.y + left.boundingBox.max.y) / 2;
  const rightCenter = (right.boundingBox.min.y + right.boundingBox.max.y) / 2;

  return rightCenter - leftCenter;
});

function TailwindHeroObject({ compactLayout = false, motionScale = 1, pointer }) {
  const groupRef = useRef(null);
  const topWaveRef = useRef(null);
  const bottomWaveRef = useRef(null);
  const glowRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  const motion = getTailwindHeroMotion({ hovered });
  const layout = resolveHeroObjectTransform({
    compactLayout,
    name: "tailwind",
    pointer,
  });

  useFrame((state, delta) => {
    if (!groupRef.current || !topWaveRef.current || !bottomWaveRef.current) {
      return;
    }

    const target = resolveHeroObjectTransform({
      compactLayout,
      name: "tailwind",
      pointer,
    });
    const spread = motion.ribbonSpread * 0.18 * motionScale;

    groupRef.current.position.x = MathUtils.damp(
      groupRef.current.position.x,
      target.position.x,
      3.5,
      delta,
    );
    groupRef.current.position.y = MathUtils.damp(
      groupRef.current.position.y,
      target.position.y,
      3.5,
      delta,
    );
    groupRef.current.rotation.x = MathUtils.damp(
      groupRef.current.rotation.x,
      pointer.y * 0.08 * motionScale,
      4,
      delta,
    );
    groupRef.current.rotation.y = MathUtils.damp(
      groupRef.current.rotation.y,
      pointer.x * 0.14 * motionScale,
      4,
      delta,
    );

    topWaveRef.current.position.y = MathUtils.damp(
      topWaveRef.current.position.y,
      spread,
      5,
      delta,
    );
    bottomWaveRef.current.position.y = MathUtils.damp(
      bottomWaveRef.current.position.y,
      -spread,
      5,
      delta,
    );

    topWaveRef.current.rotation.z = MathUtils.damp(
      topWaveRef.current.rotation.z,
      0.06 + motion.sweepSpeed * 0.08,
      4.5,
      delta,
    );
    bottomWaveRef.current.rotation.z = MathUtils.damp(
      bottomWaveRef.current.rotation.z,
      -0.06 - motion.sweepSpeed * 0.08,
      4.5,
      delta,
    );
    glowRef.current.material.opacity = MathUtils.damp(
      glowRef.current.material.opacity,
      hovered ? 0.14 : 0.07,
      4.5,
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

      <group ref={topWaveRef}>
        <mesh geometry={tailwindParts[0]}>
          <meshStandardMaterial
            attach="material-0"
            color="#5eead4"
            emissive="#62f4ea"
            emissiveIntensity={hovered ? 0.28 : 0.14}
            metalness={0.2}
            roughness={0.24}
          />
          <meshStandardMaterial
            attach="material-1"
            color="#0f717f"
            emissive="#41d6eb"
            emissiveIntensity={hovered ? 0.2 : 0.08}
            metalness={0.48}
            roughness={0.3}
          />
        </mesh>
      </group>

      <group ref={bottomWaveRef}>
        <mesh geometry={tailwindParts[1]}>
          <meshStandardMaterial
            attach="material-0"
            color="#48d5e9"
            emissive="#62f4ea"
            emissiveIntensity={hovered ? 0.26 : 0.12}
            metalness={0.2}
            roughness={0.24}
          />
          <meshStandardMaterial
            attach="material-1"
            color="#105f70"
            emissive="#3fd8f2"
            emissiveIntensity={hovered ? 0.18 : 0.08}
            metalness={0.48}
            roughness={0.3}
          />
        </mesh>
      </group>

      <mesh ref={glowRef} position={[0, 0, -0.22]} scale={[0.9, 0.5, 1]}>
        <circleGeometry args={[1.38, 48]} />
        <meshBasicMaterial color="#4be8e7" opacity={0.035} transparent />
      </mesh>
    </group>
  );
}

export default TailwindHeroObject;
