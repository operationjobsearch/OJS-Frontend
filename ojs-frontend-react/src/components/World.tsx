import { Player, GameProps } from "..";
import { Suspense, useEffect, useRef } from "react";
import { Physics, RapierRigidBody, RigidBody } from "@react-three/rapier";
import { Box, useKeyboardControls } from "@react-three/drei";

export const World = (gameProps: GameProps) => {
  const player = useRef<RapierRigidBody>(null);
  const isOnFloor = useRef(true);

  const jump = () => {
    if (player.current && isOnFloor.current) {
      player.current.applyImpulse({ x: 0, y: 5, z: 0 }, true);
      isOnFloor.current = false;
    }
  };

  const [spacePressed] = useKeyboardControls();

  useEffect(() => {
    spacePressed(
      (state) => {
        console.log("state.jump:", state.jump);
        return state.jump;
      },
      (value) => {
        console.log("value:", value);
        if (value) jump();
      }
    );
  }, []);

  return (
    <Suspense>
      <Physics>
        <RigidBody
          ref={player}
          colliders="cuboid"
          onCollisionEnter={({ other }) => {
            if (
              other.rigidBodyObject &&
              other.rigidBodyObject.name === "floor"
            ) {
              isOnFloor.current = true;
            }
          }}
          onCollisionExit={({ other }) => {
            if (
              other.rigidBodyObject &&
              other.rigidBodyObject.name === "floor"
            ) {
              isOnFloor.current = false;
            }
          }}
        >
          <Player ref={gameProps.player.characterModel} {...gameProps} />
        </RigidBody>

        <RigidBody colliders="cuboid" type="fixed" name="floor">
          <Box position={[0, -1, 0]} args={[10, 1, 10]}>
            <meshStandardMaterial color="hotpink" />
          </Box>
        </RigidBody>
      </Physics>
    </Suspense>
  );
};
