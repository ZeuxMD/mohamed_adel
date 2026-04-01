import { Suspense, lazy, useEffect, useRef, useState } from "react";
import {
  advanceHeroPointer,
  isHeroPointerSettled,
  normalizeHeroPointer,
} from "./heroScenePolicy";
import ShadowButton from "../ShadowButton/ShadowButton";
import styles from "./Header.module.css";

const neutralPointer = { x: 0, y: 0 };
const HeroScene = lazy(() => import("./HeroScene"));

function HeroSceneFallback() {
  return (
    <div
      aria-hidden="true"
      className={styles.heroSceneFallback}
      data-testid="hero-scene"
    />
  );
}

function Header({ refProps, projectsRef, handleNavigate }) {
  const [scenePointer, setScenePointer] = useState(neutralPointer);
  const animationFrameRef = useRef(0);
  const lastFrameTimeRef = useRef(null);
  const pointerTargetRef = useRef(neutralPointer);
  const scenePointerRef = useRef(neutralPointer);

  function commitScenePointer(pointer) {
    const nextPointer = { x: pointer.x, y: pointer.y };

    scenePointerRef.current = nextPointer;
    setScenePointer(nextPointer);
  }

  function stopPointerAnimation() {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    animationFrameRef.current = 0;
    lastFrameTimeRef.current = null;
  }

  function animatePointer(time) {
    if (lastFrameTimeRef.current == null) {
      lastFrameTimeRef.current = time;
    }

    const deltaSeconds = (time - lastFrameTimeRef.current) / 1000;
    lastFrameTimeRef.current = time;

    const nextPointer = advanceHeroPointer(
      scenePointerRef.current,
      pointerTargetRef.current,
      deltaSeconds,
    );

    if (isHeroPointerSettled(nextPointer, pointerTargetRef.current)) {
      commitScenePointer(pointerTargetRef.current);
      stopPointerAnimation();
      return;
    }

    commitScenePointer(nextPointer);
    animationFrameRef.current = requestAnimationFrame(animatePointer);
  }

  function ensurePointerAnimation() {
    if (typeof window === "undefined" || animationFrameRef.current) {
      return;
    }

    lastFrameTimeRef.current = null;
    animationFrameRef.current = requestAnimationFrame(animatePointer);
  }

  function updatePointerTarget(pointer) {
    pointerTargetRef.current = pointer;

    if (isHeroPointerSettled(scenePointerRef.current, pointer)) {
      commitScenePointer(pointer);
      stopPointerAnimation();
      return;
    }

    ensurePointerAnimation();
  }

  useEffect(() => () => stopPointerAnimation(), []);

  function handlePointerMove(event) {
    updatePointerTarget(
      normalizeHeroPointer(event, event.currentTarget.getBoundingClientRect()),
    );
  }

  function handlePointerLeave() {
    updatePointerTarget(neutralPointer);
  }

  return (
    <header
      ref={refProps}
      className={`${styles.header} breakout`}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <Suspense fallback={<HeroSceneFallback />}>
        <HeroScene pointer={scenePointer} />
      </Suspense>
      <article className={styles.introductionContainer}>
        <h1 className={styles.heroHeading}>I&apos;m Mohamed</h1>
        <p className={styles.heroSubtext}>
          a full-stack web developer, specializing in turning ideas into
          responsive, functional, and engaging websites.
        </p>
        <ShadowButton handleClick={() => handleNavigate(projectsRef)}>
          See my work
        </ShadowButton>
      </article>
      <picture className={styles.imageContainer}>
        <img
          src="https://4swr9auxnu.ufs.sh/f/qomDrNVG6cxzGzW5ic8Uubytx2pV9ZEgzwdO7q5nliB8HeSR"
          alt="my-photo"
        />
      </picture>
    </header>
  );
}

export default Header;
