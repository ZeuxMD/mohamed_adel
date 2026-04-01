/* eslint react/no-unknown-property: "off" */
import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  AdditiveBlending,
  CanvasTexture,
  ClampToEdgeWrapping,
  LinearFilter,
  MathUtils,
} from "three";
import nextLogoSvg from "./logoAssets/next.svg?raw";

import { resolveHeroObjectTransform } from "./heroSceneLayout";
import { createExtrudedLogo } from "./logoGeometry";
import { getNextHeroMotion } from "./nextHeroMotion";

const nextLogo = createExtrudedLogo({
  depth: 0.16,
  svg: nextLogoSvg,
  targetWidth: 2.3,
});

function createShineTexture() {
  if (typeof document === "undefined") {
    return null;
  }

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  if (!context) {
    return null;
  }

  canvas.width = 256;
  canvas.height = 256;

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.translate(canvas.width / 2, canvas.height / 2);
  context.rotate(0.42);

  const gradient = context.createLinearGradient(-40, 0, 40, 0);

  gradient.addColorStop(0, "rgba(255, 255, 255, 0)");
  gradient.addColorStop(0.28, "rgba(255, 255, 255, 0.06)");
  gradient.addColorStop(0.5, "rgba(255, 255, 255, 0.72)");
  gradient.addColorStop(0.72, "rgba(255, 255, 255, 0.08)");
  gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

  context.fillStyle = gradient;
  context.fillRect(-32, -220, 64, 440);

  const texture = new CanvasTexture(canvas);

  texture.wrapS = ClampToEdgeWrapping;
  texture.wrapT = ClampToEdgeWrapping;
  texture.minFilter = LinearFilter;
  texture.magFilter = LinearFilter;
  texture.needsUpdate = true;

  return texture;
}

function NextHeroObject({ compactLayout = false, motionScale = 1, pointer }) {
  const groupRef = useRef(null);
  const auraRef = useRef(null);
  const shineMaterialRef = useRef(null);
  const shineProgressRef = useRef(0);
  const faceMaterialRefs = useRef([]);
  const edgeMaterialRefs = useRef([]);
  const [hovered, setHovered] = useState(false);
  const shineTexture = useMemo(createShineTexture, []);

  const motion = getNextHeroMotion({ hovered });
  const layout = resolveHeroObjectTransform({
    compactLayout,
    name: "next",
    pointer,
  });

  useEffect(
    () => () => {
      shineTexture?.dispose();
    },
    [shineTexture],
  );

  useFrame((state, delta) => {
    if (!groupRef.current || !auraRef.current || !shineMaterialRef.current) {
      return;
    }

    const target = resolveHeroObjectTransform({
      compactLayout,
      name: "next",
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
      -pointer.y * motion.tiltStrength * motionScale,
      4,
      delta,
    );
    groupRef.current.rotation.y = MathUtils.damp(
      groupRef.current.rotation.y,
      -pointer.x * motion.tiltStrength * motionScale,
      4,
      delta,
    );

    if (hovered) {
      shineProgressRef.current = Math.min(
        shineProgressRef.current + delta * 1.6,
        motion.shineTravel,
      );
    } else {
      shineProgressRef.current = MathUtils.damp(
        shineProgressRef.current,
        0,
        5,
        delta,
      );
    }

    const shineProgress = shineProgressRef.current;
    const shineSweep = Math.sin(Math.min(shineProgress, 1) * Math.PI);
    const shineLinger = hovered && shineProgress >= motion.shineTravel ? 0.18 : 0;
    const shineMaterial = shineMaterialRef.current;

    if (shineMaterial.map) {
      shineMaterial.map.offset.x = MathUtils.lerp(-0.38, 0.38, shineProgress);
    }

    shineMaterial.opacity = MathUtils.damp(
      shineMaterial.opacity,
      motion.shineOpacity * (shineSweep + shineLinger),
      6,
      delta,
    );

    auraRef.current.scale.x = MathUtils.damp(
      auraRef.current.scale.x,
      hovered ? 1.06 : 1.02,
      4.5,
      delta,
    );
    auraRef.current.scale.y = auraRef.current.scale.x;
    auraRef.current.material.opacity = MathUtils.damp(
      auraRef.current.material.opacity,
      hovered ? 0.1 : 0.05,
      4.5,
      delta,
    );

    faceMaterialRefs.current.forEach((material) => {
      if (!material) {
        return;
      }

      material.emissiveIntensity = MathUtils.damp(
        material.emissiveIntensity,
        0.06 + motion.innerGlow * 0.45,
        4.5,
        delta,
      );
    });

    edgeMaterialRefs.current.forEach((material) => {
      if (!material) {
        return;
      }

      material.emissiveIntensity = MathUtils.damp(
        material.emissiveIntensity,
        0.06 + motion.innerGlow * 0.25,
        4.5,
        delta,
      );
    });
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
          shineProgressRef.current = 0;
          setHovered(true);
        }}
      >
        <sphereGeometry args={[layout.hoverRadius, 24, 24]} />
        <meshBasicMaterial opacity={0} transparent />
      </mesh>

      {nextLogo.geometries.map((geometry, index) => (
        <mesh geometry={geometry} key={index}>
          <meshStandardMaterial
            ref={(node) => {
              faceMaterialRefs.current[index] = node;
            }}
            attach="material-0"
            color="#fafafa"
            emissive="#ffffff"
            emissiveIntensity={0.1}
            metalness={0.2}
            roughness={0.18}
          />
          <meshStandardMaterial
            ref={(node) => {
              edgeMaterialRefs.current[index] = node;
            }}
            attach="material-1"
            color="#596460"
            emissive="#ffffff"
            emissiveIntensity={0.06}
            metalness={0.68}
            roughness={0.3}
          />
        </mesh>
      ))}

      {shineTexture ? (
        <mesh position={[0, 0, nextLogo.size.depth / 2 + 0.02]}>
          <circleGeometry args={[1.14, 64]} />
          <meshBasicMaterial
            ref={shineMaterialRef}
            blending={AdditiveBlending}
            color="#ffffff"
            depthWrite={false}
            map={shineTexture}
            opacity={0}
            toneMapped={false}
            transparent
          />
        </mesh>
      ) : null}

      <mesh ref={auraRef} scale={1.02}>
        <circleGeometry args={[1.34, 48]} />
        <meshBasicMaterial color="#ffffff" opacity={0.05} transparent />
      </mesh>
    </group>
  );
}

export default NextHeroObject;
