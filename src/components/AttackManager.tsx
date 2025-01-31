import { useFrame, useThree } from "@react-three/fiber";
import { useEffect } from "react";
import {
  Projectile,
  usePlayerStore,
  useAttackStore,
  canFirePrimaryAttack,
  useEnemyStore,
  AttackTypes,
  AttackConfig,
  getHitId,
  getChargedAttackDamage,
} from "..";

export const AttackManager = () => {
  // const { isPaused } = useGameStore();
  const { camera, scene } = useThree();
  const { damageEnemy } = useEnemyStore();
  const { projectiles, spawnProjectile, destroyProjectile } = useAttackStore();
  const {
    isFiringPrimary,
    isChargingSecondary,
    chargeStartTime,
    attackSpeed,
    lastAttack,
    shouldFireSecondary,
    setLastAttack,
    setShouldFireSecondary,
  } = usePlayerStore();
  ``;
  useEffect(() => {
    if (shouldFireSecondary) {
      const attackTargetId = getHitId(camera, scene);
      console.log("attack target", attackTargetId);
      const dmg = getChargedAttackDamage(chargeStartTime);
      console.log("secondary atk damage", dmg);
      damageEnemy(attackTargetId, dmg);
      setShouldFireSecondary(false);
    }
  }, [shouldFireSecondary, chargeStartTime]);

  useFrame((state, delta) => {
    if (
      canFirePrimaryAttack(
        isFiringPrimary,
        isChargingSecondary,
        lastAttack,
        attackSpeed
      )
    ) {
      setLastAttack(performance.now());
      const attackTargetId = getHitId(camera, scene);
      damageEnemy(attackTargetId, AttackConfig[AttackTypes.Primary].baseDamage);
    }
  });

  return projectiles.map((projectile) => (
    <Projectile
      {...projectile}
      key={projectile.id}
      onExpire={() => destroyProjectile(projectile.id)}
    />
  ));
};
