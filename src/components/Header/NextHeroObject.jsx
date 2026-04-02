/* eslint react/no-unknown-property: "off" */
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { MathUtils } from "three";
import nextLogoSvg from "./logoAssets/next.svg?raw";

import {
  getHeroSceneLayout,
  resolveHeroObjectTransform,
} from "./heroSceneLayout";
import { createExtrudedLogo } from "./logoGeometry";
import { getNextHeroMotion } from "./nextHeroMotion";

function disableRaycast() {
  return null;
}

const nextLogo = createExtrudedLogo({
  curveSegments: 16,
  depth: 0.16,
  svg: nextLogoSvg,
  targetWidth: 1.84,
});

function NextHeroObject({ compactLayout = false, motionScale = 1, pointer }) {
  const groupRef = useRef(null);
  const haloRef = useRef(null);
  const logoRef = useRef(null);
  const shadowRef = useRef(null);
  const hoverMixRef = useRef(0);
  const [hovered, setHovered] = useState(false);

  const motion = getNextHeroMotion({ hovered });
  const baseLayout = getHeroSceneLayout({ compactLayout }).next;
  const targetLayout = resolveHeroObjectTransform({
    compactLayout,
    name: "next",
    pointer,
  });

  useFrame((state, delta) => {
    if (
      !groupRef.current ||
      !haloRef.current ||
      !logoRef.current ||
      !shadowRef.current
    ) {
      return;
    }

    const target = resolveHeroObjectTransform({
      compactLayout,
      name: "next",
      pointer,
    });
    hoverMixRef.current = MathUtils.damp(
      hoverMixRef.current,
      hovered ? 1 : 0,
      4.5,
      delta,
    );
    const hoverMix = hoverMixRef.current;
    const floatWave =
      Math.sin(state.clock.elapsedTime * motion.floatSpeed) *
      motion.floatAmplitude *
      motionScale;
    const swayWave =
      Math.cos(state.clock.elapsedTime * motion.floatSpeed * 0.58) *
      0.04 *
      motionScale;

    groupRef.current.position.x = MathUtils.damp(
      groupRef.current.position.x,
      target.position.x + swayWave,
      3.8,
      delta,
    );
    groupRef.current.position.y = MathUtils.damp(
      groupRef.current.position.y,
      target.position.y +
      floatWave +
      motion.hoverLift * hoverMix * motionScale,
      3.8,
      delta,
    );
    groupRef.current.rotation.x = MathUtils.damp(
      groupRef.current.rotation.x,
      -pointer.y * motion.tiltStrength * motionScale + floatWave * 0.05,
      4.2,
      delta,
    );
    groupRef.current.rotation.y = MathUtils.damp(
      groupRef.current.rotation.y,
      -pointer.x * (motion.tiltStrength + 0.004) * motionScale + swayWave * 0.08,
      4.2,
      delta,
    );

    const [faceMaterial, sideMaterial] = logoRef.current.material;

    faceMaterial.emissiveIntensity = MathUtils.damp(
      faceMaterial.emissiveIntensity,
      MathUtils.lerp(0.04, 0.14, hoverMix),
      4.5,
      delta,
    );
    sideMaterial.emissiveIntensity = MathUtils.damp(
      sideMaterial.emissiveIntensity,
      MathUtils.lerp(0.06, 0.18, hoverMix),
      4.5,
      delta,
    );
    haloRef.current.material.opacity = MathUtils.damp(
      haloRef.current.material.opacity,
      MathUtils.lerp(0.03, 0.06, hoverMix) + motion.glow * 0.04,
      4.5,
      delta,
    );
    shadowRef.current.material.opacity = MathUtils.damp(
      shadowRef.current.material.opacity,
      MathUtils.lerp(0.08, 0.14, hoverMix),
      4.5,
      delta,
    );
  });

  return (
    <>
      <group
        name="next-hero-hover-target"
        position={[
          targetLayout.position.x,
          targetLayout.position.y,
          targetLayout.position.z,
        ]}
        scale={baseLayout.scale}
      >
        <mesh
          onPointerEnter={(event) => {
            event.stopPropagation();
            setHovered(true);
          }}
          onPointerLeave={() => setHovered(false)}
        >
          <sphereGeometry args={[baseLayout.hoverRadius, 24, 24]} />
          <meshBasicMaterial
            depthTest={false}
            depthWrite={false}
            opacity={0}
            transparent
          />
        </mesh>
      </group>

      <group
        ref={groupRef}
        name="next-hero-visual"
        position={[
          baseLayout.position.x,
          baseLayout.position.y,
          baseLayout.position.z,
        ]}
        scale={baseLayout.scale}
      >
        <mesh
          ref={shadowRef}
          position={[0.02, -0.05, -0.18]}
          raycast={disableRaycast}
          scale={[1.18, 0.78, 1]}
        >
          <circleGeometry args={[0.82, 48]} />
          <meshBasicMaterial color="#0b0e12" opacity={0.05} transparent />
        </mesh>

        <mesh
          ref={haloRef}
          position={[0, 0, -0.12]}
          raycast={disableRaycast}
          scale={[1.08, 0.82, 1]}
        >
          <circleGeometry args={[0.74, 48]} />
          <meshBasicMaterial color="#ffffff" opacity={0.018} transparent />
        </mesh>

        <mesh
          ref={logoRef}
          geometry={nextLogo.geometries[0]}
          position={[0, 0, 0.08]}
          raycast={disableRaycast}
        >
          <meshStandardMaterial
            attach="material-0"
            color="#f5f7f8"
            emissive="#ffffff"
            emissiveIntensity={0.04}
            metalness={0.18}
            roughness={0.12}
          />
          <meshStandardMaterial
            attach="material-1"
            color="#ced5db"
            emissive="#ffffff"
            emissiveIntensity={0.06}
            metalness={0.42}
            roughness={0.24}
          />
        </mesh>
      </group>
    </>
  );
}

export default NextHeroObject;
