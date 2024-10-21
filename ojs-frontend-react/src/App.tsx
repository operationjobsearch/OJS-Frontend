import {
  GameObject,
  PlayerObject,
  CameraController,
  DebugPanel,
  World,
  GameProps,
  Reticle,
  Coordinate,
  handleMouseMove,
  handlePointerLockChange,
  handleWindowFocus,
  handleWindowBlur,
} from ".";
import * as THREE from "three";
import { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { RapierRigidBody } from "@react-three/rapier";

export const App = () => {
  const game: GameObject = {
    // State
    isPointerLocked: false,
    isWindowActive: true,

    // Settings
    keyboardLayout: "QWERTY",

    // Camera
    cameraAngleTheta: 0,
    cameraAnglePhi: Math.PI / 6,
    cameraRadius: 3,
    cameraVerticalOffset: 2.5,
    cameraLookAtOffset: 1,
  };

  const player: PlayerObject = {
    characterModel: useRef<THREE.Mesh>(null),
    characterRigidBody: useRef<RapierRigidBody>(null),
    mouseMovement: useRef<Coordinate>({ x: 0, y: 0 }),
    reticle: useRef<THREE.Mesh>(null),
    moveSpeed: 1,
    health: 100,
  };

  const gameProps: GameProps = {
    game: game,
    player: player,
  };

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => handleMouseMove(e, player);
    const onPointerLockChange = () => handlePointerLockChange(game);
    const onFocus = () => handleWindowFocus(game);
    const onBlur = () => handleWindowBlur(game);

    window.addEventListener("focus", onFocus);
    window.addEventListener("blur", onBlur);
    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("pointerlockchange", onPointerLockChange);

    return () => {
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("blur", onBlur);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("pointerlockchange", onPointerLockChange);
    };
  }, []);

  return (
    <div className="canvas" onClick={() => document.body.requestPointerLock()}>
      <Canvas>
        <DebugPanel {...gameProps} />
        <CameraController {...gameProps} />
        <Reticle {...gameProps} />
        <World {...gameProps} />
        <ambientLight />
      </Canvas>
    </div>
  );
};
