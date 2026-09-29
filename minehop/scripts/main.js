import { system, world } from "@minecraft/server";
import { SETTINGS } from "../settings.js";

const {
  MAX_SPEED,
  GROUND_ACCEL,
  AIR_ACCEL,
  AIR_SPEED,
  GROUND_FRICTION,
  JUMP_VELOCITY,
  MIN_MOVE,
  AUTO_BHOP
} = SETTINGS;

function horizontalSpeed(v) {
  return Math.sqrt(v.x * v.x + v.z * v.z);
}

function normalize(x, z) {
  const len = Math.sqrt(x * x + z * z);
  if (len < 0.0001) return { x: 0, z: 0 };
  return { x: x / len, z: z / len };
}

function wishDirection(player) {
  const input = player.inputInfo.getMovementVector();
  const forward = input.y;
  const side = input.x;
  const yaw = player.getRotation().y * Math.PI / 180;

  const fx = -Math.sin(yaw);
  const fz = Math.cos(yaw);
  const rx = Math.cos(yaw);
  const rz = Math.sin(yaw);

  return normalize(
    fx * forward + rx * side,
    fz * forward + rz * side
  );
}

function isGrounded(player) {
  try {
    return player.getBlockStandingOn() !== undefined;
  } catch {
    return false;
  }
}

function accelerate(player, dir, targetSpeed, acceleration) {
  if (dir.x === 0 && dir.z === 0) return;

  const v = player.getVelocity();
  const currentAlongWish = v.x * dir.x + v.z * dir.z;
  const addSpeed = targetSpeed - currentAlongWish;

  if (addSpeed <= 0) return;

  const amount = Math.min(acceleration, addSpeed);

  player.applyImpulse({
    x: dir.x * amount,
    y: 0,
    z: dir.z * amount
  });
}

function limitSpeed(player) {
  const v = player.getVelocity();
  const speed = horizontalSpeed(v);

  if (speed <= MAX_SPEED) return;

  const scale = MAX_SPEED / speed;

  player.applyImpulse({
    x: v.x * (scale - 1),
    y: 0,
    z: v.z * (scale - 1)
  });
}

function tickPlayer(player) {
  if (!player.isValid) return;

  const grounded = isGrounded(player);
  const jumping = player.inputInfo.getButtonState("Jump");
  const dir = wishDirection(player);
  const moving =
    Math.abs(dir.x) > MIN_MOVE ||
    Math.abs(dir.z) > MIN_MOVE;

  if (grounded && !moving) {
    const v = player.getVelocity();

    player.applyImpulse({
      x: -v.x * (1 - GROUND_FRICTION),
      y: 0,
      z: -v.z * (1 - GROUND_FRICTION)
    });
  }

  if (grounded) {
    if (moving) {
      accelerate(player, dir, MAX_SPEED, GROUND_ACCEL);
    }

    if (AUTO_BHOP && jumping) {
      player.applyImpulse({
        x: 0,
        y: JUMP_VELOCITY,
        z: 0
      });
    }
  } else if (moving) {
    accelerate(player, dir, AIR_SPEED, AIR_ACCEL);
  }

  limitSpeed(player);
}

system.runInterval(() => {
  for (const player of world.getAllPlayers()) {
    try {
      tickPlayer(player);
    } catch {
      // Ignore players that become invalid between ticks.
    }
  }
}, 1);
