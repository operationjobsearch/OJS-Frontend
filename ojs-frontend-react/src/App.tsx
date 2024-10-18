import {
  GameObject,
  PlayerObject,
  CameraController,
  DebugPanel,
  World,
  GameProps,
} from ".";
import * as THREE from "three";
import { useMemo, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { KeyboardControls } from "@react-three/drei";

export const Controls = {
  jump: "jump",
};

export const App = () => {
  const game: GameObject = {
    keyboardLayout: "QWERTY",
  };

  const player: PlayerObject = {
    characterModel: useRef<THREE.Mesh>(null),
    moveSpeed: 1,
    health: 100,
  };

  const gameProps: GameProps = {
    game: game,
    player: player,
  };

  const map = useMemo(() => [{ name: Controls.jump, keys: ["Space"] }], []);

  return (
    <div className="canvas">
      <KeyboardControls map={map}>
        <Canvas resize={{ scroll: true, debounce: { scroll: 50, resize: 50 } }}>
          <CameraController characterModel={player.characterModel} />
          <DebugPanel {...gameProps} />
          <World {...gameProps} />
          <ambientLight />
        </Canvas>
      </KeyboardControls>
    </div>
  );
};
