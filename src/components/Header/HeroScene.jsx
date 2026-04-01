/* eslint react/no-unknown-property: "off" */
import { Canvas } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { getHeroSceneFlags } from "./heroSceneFlags";
import NextHeroObject from "./NextHeroObject";
import ReactHeroObject from "./ReactHeroObject";
import TailwindHeroObject from "./TailwindHeroObject";

import styles from "./HeroScene.module.css";

function canRenderScene() {
  return (
    typeof window !== "undefined" &&
    typeof window.ResizeObserver !== "undefined"
  );
}

function getInitialSceneFlags() {
  if (typeof window === "undefined") {
    return getHeroSceneFlags({
      width: 1280,
      prefersReducedMotion: false,
      pointerFine: true,
    });
  }

  return getHeroSceneFlags({
    width: window.innerWidth,
    prefersReducedMotion: window.matchMedia?.("(prefers-reduced-motion: reduce)")
      ?.matches ?? false,
    pointerFine:
      window.matchMedia?.("(hover: hover) and (pointer: fine)")?.matches ??
      true,
  });
}

function SceneContents({ pointer, sceneFlags }) {
  const { compactLayout, enabledObjects, motionScale } = sceneFlags;

  return (
    <>
      <ambientLight intensity={0.7} />
      <hemisphereLight
        args={["#f1fffb", "#1c2322", 0.9]}
        position={[0, 2.5, 0]}
      />
      <directionalLight position={[-2.5, 2.8, 5.4]} intensity={1.2} color="#f8fffd" />
      <pointLight position={[2.4, 1.8, 3.8]} intensity={1.8} color="#7deeff" />
      <pointLight position={[-1.8, 1.3, 2.6]} intensity={0.75} color="#ffffff" />
      <pointLight position={[0.4, -1.4, 2.8]} intensity={1.1} color="#4be8e7" />
      {enabledObjects.includes("next") ? (
        <NextHeroObject
          compactLayout={compactLayout}
          motionScale={motionScale}
          pointer={pointer}
        />
      ) : null}
      <ReactHeroObject
        compactLayout={compactLayout}
        motionScale={motionScale}
        pointer={pointer}
      />
      <TailwindHeroObject
        compactLayout={compactLayout}
        motionScale={motionScale}
        pointer={pointer}
      />
    </>
  );
}

function HeroScene({ pointer }) {
  const [sceneFlags, setSceneFlags] = useState(getInitialSceneFlags);

  useEffect(() => {
    if (!canRenderScene()) {
      return undefined;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateSceneFlags = () => {
      setSceneFlags(
        getHeroSceneFlags({
          width: window.innerWidth,
          prefersReducedMotion: mediaQuery.matches,
          pointerFine:
            window.matchMedia?.("(hover: hover) and (pointer: fine)")?.matches ??
            true,
        }),
      );
    };

    updateSceneFlags();
    window.addEventListener("resize", updateSceneFlags);

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", updateSceneFlags);
    } else {
      mediaQuery.addListener(updateSceneFlags);
    }

    return () => {
      window.removeEventListener("resize", updateSceneFlags);

      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", updateSceneFlags);
      } else {
        mediaQuery.removeListener(updateSceneFlags);
      }
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className={styles.heroScene}
      data-testid="hero-scene"
    >
      <div className={styles.sceneWash} />
      {canRenderScene() ? (
        <Canvas
          camera={{ fov: 32, position: [0, 0, 8] }}
          className={styles.canvas}
          dpr={[1, sceneFlags.dprMax]}
          gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        >
          <SceneContents pointer={pointer} sceneFlags={sceneFlags} />
        </Canvas>
      ) : null}
    </div>
  );
}

export default HeroScene;
