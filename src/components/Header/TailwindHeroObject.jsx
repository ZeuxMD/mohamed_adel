/* eslint react/no-unknown-property: "off" */
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { MathUtils } from "three";
import tailwindLogoSvg from "./logoAssets/tailwind.svg?raw";

import {
  getHeroSceneLayout,
  resolveHeroObjectTransform,
} from "./heroSceneLayout";
import { createExtrudedLogo } from "./logoGeometry";
import {
  getTailwindHeroMotion,
  getTailwindRibbonOffsets,
} from "./tailwindHeroMotion";

function disableRaycast() {
  return null;
}

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
  const topWaveMeshRef = useRef(null);
  const bottomWaveMeshRef = useRef(null);
  const glowRef = useRef(null);
  const hoverMixRef = useRef(0);
  const [hovered, setHovered] = useState(false);

  const idleMotion = getTailwindHeroMotion({ hovered: false });
  const hoveredMotion = getTailwindHeroMotion({ hovered: true });
  const baseLayout = getHeroSceneLayout({ compactLayout }).tailwind;

  useFrame((state, delta) => {
    if (
      !groupRef.current ||
      !topWaveRef.current ||
      !bottomWaveRef.current ||
      !topWaveMeshRef.current ||
      !bottomWaveMeshRef.current ||
      !glowRef.current
    ) {
      return;
    }

    const target = resolveHeroObjectTransform({
      compactLayout,
      name: "tailwind",
      pointer,
    });
    hoverMixRef.current = MathUtils.damp(
      hoverMixRef.current,
      hovered ? 1 : 0,
      4.5,
      delta,
    );
    const hoverMix = hoverMixRef.current;
    const sweepSpeed = MathUtils.lerp(
      idleMotion.sweepSpeed,
      hoveredMotion.sweepSpeed,
      hoverMix,
    );
    const floatAmplitude = MathUtils.lerp(
      idleMotion.floatAmplitude,
      hoveredMotion.floatAmplitude,
      hoverMix,
    );
    const floatSpeed = MathUtils.lerp(
      idleMotion.floatSpeed,
      hoveredMotion.floatSpeed,
      hoverMix,
    );
    const floatWave =
      Math.sin(state.clock.elapsedTime * floatSpeed) *
      floatAmplitude *
      motionScale;
    const swayWave =
      Math.cos(state.clock.elapsedTime * floatSpeed * 0.6) *
      0.026 *
      motionScale;
    const ribbonSweepPhase = state.clock.elapsedTime * (0.76 + sweepSpeed * 5.8);
    const ribbonSweepAmplitude = MathUtils.lerp(0.012, 0.026, hoverMix) * motionScale;
    const ribbonOffsets = getTailwindRibbonOffsets({
      elapsedTime: state.clock.elapsedTime,
      hoverMix,
      motionScale,
    });

    groupRef.current.position.x = MathUtils.damp(
      groupRef.current.position.x,
      target.position.x + swayWave,
      3.5,
      delta,
    );
    groupRef.current.position.y = MathUtils.damp(
      groupRef.current.position.y,
      target.position.y + floatWave,
      3.5,
      delta,
    );
    groupRef.current.rotation.x = MathUtils.damp(
      groupRef.current.rotation.x,
      pointer.y * MathUtils.lerp(0.009, 0.017, hoverMix) * motionScale +
        floatWave * 0.05,
      4,
      delta,
    );
    groupRef.current.rotation.y = MathUtils.damp(
      groupRef.current.rotation.y,
      pointer.x * MathUtils.lerp(0.012, 0.022, hoverMix) * motionScale +
        swayWave * 0.08,
      4,
      delta,
    );

    topWaveRef.current.position.x = MathUtils.damp(
      topWaveRef.current.position.x,
      ribbonOffsets.top.x,
      5,
      delta,
    );
    bottomWaveRef.current.position.x = MathUtils.damp(
      bottomWaveRef.current.position.x,
      ribbonOffsets.bottom.x,
      5,
      delta,
    );
    topWaveRef.current.position.y = MathUtils.damp(
      topWaveRef.current.position.y,
      ribbonOffsets.top.y,
      5,
      delta,
    );
    bottomWaveRef.current.position.y = MathUtils.damp(
      bottomWaveRef.current.position.y,
      ribbonOffsets.bottom.y,
      5,
      delta,
    );

    topWaveRef.current.rotation.z = MathUtils.damp(
      topWaveRef.current.rotation.z,
      ribbonOffsets.top.rotationZ + Math.sin(ribbonSweepPhase) * ribbonSweepAmplitude,
      4.5,
      delta,
    );
    bottomWaveRef.current.rotation.z = MathUtils.damp(
      bottomWaveRef.current.rotation.z,
      ribbonOffsets.bottom.rotationZ - Math.sin(ribbonSweepPhase) * ribbonSweepAmplitude,
      4.5,
      delta,
    );
    glowRef.current.material.opacity = MathUtils.damp(
      glowRef.current.material.opacity,
      MathUtils.lerp(0.08, 0.11, hoverMix),
      4.5,
      delta,
    );

    const topFaceMaterial = topWaveMeshRef.current.material[0];
    const topSideMaterial = topWaveMeshRef.current.material[1];
    const bottomFaceMaterial = bottomWaveMeshRef.current.material[0];
    const bottomSideMaterial = bottomWaveMeshRef.current.material[1];

    topFaceMaterial.emissiveIntensity = MathUtils.damp(
      topFaceMaterial.emissiveIntensity,
      MathUtils.lerp(0.14, 0.28, hoverMix),
      4.5,
      delta,
    );
    topSideMaterial.emissiveIntensity = MathUtils.damp(
      topSideMaterial.emissiveIntensity,
      MathUtils.lerp(0.08, 0.2, hoverMix),
      4.5,
      delta,
    );
    bottomFaceMaterial.emissiveIntensity = MathUtils.damp(
      bottomFaceMaterial.emissiveIntensity,
      MathUtils.lerp(0.12, 0.26, hoverMix),
      4.5,
      delta,
    );
    bottomSideMaterial.emissiveIntensity = MathUtils.damp(
      bottomSideMaterial.emissiveIntensity,
      MathUtils.lerp(0.08, 0.18, hoverMix),
      4.5,
      delta,
    );
  });

  return (
    <>
      <group
        name="tailwind-hero-hover-target"
        position={[
          baseLayout.position.x,
          baseLayout.position.y,
          baseLayout.position.z,
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
        name="tailwind-hero-visual"
        position={[
          baseLayout.position.x,
          baseLayout.position.y,
          baseLayout.position.z,
        ]}
        scale={baseLayout.scale}
      >
        <group ref={topWaveRef}>
          <mesh
            geometry={tailwindParts[0]}
            raycast={disableRaycast}
            ref={topWaveMeshRef}
          >
            <meshStandardMaterial
              attach="material-0"
              color="#5eead4"
              emissive="#62f4ea"
              emissiveIntensity={0.14}
              metalness={0.2}
              roughness={0.24}
            />
            <meshStandardMaterial
              attach="material-1"
              color="#0f717f"
              emissive="#41d6eb"
              emissiveIntensity={0.08}
              metalness={0.48}
              roughness={0.3}
            />
          </mesh>
        </group>

        <group ref={bottomWaveRef}>
          <mesh
            geometry={tailwindParts[1]}
            raycast={disableRaycast}
            ref={bottomWaveMeshRef}
          >
            <meshStandardMaterial
              attach="material-0"
              color="#48d5e9"
              emissive="#62f4ea"
              emissiveIntensity={0.12}
              metalness={0.2}
              roughness={0.24}
            />
            <meshStandardMaterial
              attach="material-1"
              color="#105f70"
              emissive="#3fd8f2"
              emissiveIntensity={0.08}
              metalness={0.48}
              roughness={0.3}
            />
          </mesh>
        </group>

        <mesh
          ref={glowRef}
          position={[0, 0, -0.22]}
          raycast={disableRaycast}
          scale={[0.9, 0.5, 1]}
        >
          <circleGeometry args={[1.38, 48]} />
          <meshBasicMaterial color="#4be8e7" opacity={0.035} transparent />
        </mesh>
      </group>
    </>
  );
}

export default TailwindHeroObject;
